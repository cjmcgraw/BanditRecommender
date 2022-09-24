import type { ISmartList, IRecommender, IRecommendation, IRecommenderConfig, RecommenderResponse } from './types';
import { buildRecommender } from './Recommender';
import jStat from 'jstat';

/**
 * SmartList is a wrapper around Recommendations. The idea is SmartList
 * combines the recommendations from multiple recommenders in a meaningful
 * trackable way.
 *
 * SmartList exists to hide away the complexity of managing multiple lists
 * of recommendations, and merging them in a sensible way.
 *
 * This class exists to solve the following problems:
 *
 * 1) How to choose between recommendations, given some configuration
 * 2) How to handle a fallback case when the recommendations chosen arent ready yet
 * 3) How to de-duplicate records that may potentially be shared between lists
 *
 * The purpose of SmartList is to provide a simple, clean interface to do all of this
 * in the easiest way possible.
 */
export class BetaBanditList<T extends IRecommendation> implements ISmartList<T> {
  /**
   * Dedupe list is a list for fast lookup on ids to allow for
   * removal and handling of previously returned/served data
   * from the list
   */
  private dedupeList: Set<string>;
  private recommenders: Record<string, IRecommender<T>>;
  private distributions: Record<string, () => number>;
  private fallback: IRecommender<T>;
  private currentRank: number;

  /**
   * @param loadMoreFn function that allows for loading of unknown data
   * @param fallbackSource the source to use for all fallbacks
   * @param config the configuration for each recommender
   */
  public constructor(
    loadMoreFn: (params: {source: string}) => Promise<RecommenderResponse<T>>,
    fallbackSource: string,
    config: IRecommenderConfig[],
  ) {
    this.dedupeList = new Set();
    this.currentRank = 0;
    this.recommenders = {};
    this.distributions = {};


    /**
     * build all of the recommenders, and attach them to keys
     */
    console.log(`x=${config}`)
    for (const x of config) {
      this.recommenders[x.source] = buildRecommender((p: any) => loadMoreFn({ source: x.source, ...p }));
      this.distributions[x.source] = () => jStat.beta(...x.params).sample();
    }

    /**
     * Handle the fallback source case, to ensure its available too
     */
    if (!this.recommenders[fallbackSource]) {
      this.recommenders[fallbackSource] = buildRecommender((p: any) => loadMoreFn({ source: fallbackSource, ...p }));
    }

    /**
     * Set the fallback into memory so its useable
     */
    this.fallback = this.recommenders[fallbackSource];
  }

  /**
   * getNext simply decides given our recommenders which
   * item to return next.
   *
   * Since getNext is async it may block for an unexpected
   * amount of time. Generally it only blocks heavily if
   * we are starting out on a recommendations with a lot of
   * potential duplicates in it.
   *
   * In practice this shouldn't be often.
   *
   * getNext will attempt to retrieve from the recommender
   * that was rolled, but if it doesn't find one, it will default
   * to the fallback.
   *
   * Finally, if the recommender isn't loaded it will also default
   * to the fallback and block on it. The purpose of this is that
   * the fallback is expected to be the most efficient/fastest list
   * to serve, and thus should block the least.
   *
   * @returns Promise<T>
   */
  public async getNext(): Promise<T|null> {
    // each time we serve a sample, we choose a recommender
    const chosen = this.chooseRecommender();

    // finally if the recommender isn't ready, we will
    // decide to choose the fallback
    const next = () => (chosen.hasNext() ? chosen.getNext() : this.fallback.getNext());

    let record = await next();
    let remainingAttempts = 50;
    while (record && this.dedupeList.has(record.id)) {
      // this could potentially await a long time
      remainingAttempts -= 1;
      record = await next();
      if (remainingAttempts <= 0) {
        return null;
      }
    }

    // it may be that we just don't have anything else
    if (!record) {
      return null;
    }

    this.dedupeList.add(record.id);
    const result = {
      ...record,
      globalRank: this.currentRank,
    };
    this.currentRank += 1;
    return result;
  }

  /**
   * Rolling algorithm is currently implemented as "Thompson Sampling",
   * that is roll a random variate from the distribution and choose the
   * highest. The idea being that as we learn more the distributions will
   * converge to the best being above the rest
   */
  private chooseRecommender(): IRecommender<T> {
    let highest = 0.0;
    let chosen = this.fallback;

    for (const key in this.distributions) {
      const roll = this.distributions[key]();
      if (roll > highest) {
        highest = roll;
        chosen = this.recommenders[key];
      }
    }

    return chosen;
  }
}
