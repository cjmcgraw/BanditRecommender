import type { RecommenderResponse, IRecommender, IRecommendation } from "./types"

export function buildRecommender<T extends IRecommendation>(fn: any): IRecommender<T> {
  return new Recommender(fn);
}

/**
 * RecommendedIterator is an iterator interface that allows
 * the caller to retrieve recommendations from a specific
 * url.
 *
 * This class encapsulates all functionality of a single recommender
 * as a single list. The idea being that this list is buffered internally
 * to reduce the number of calls needed.
 *
 * Ideally this class is a baseline way to loop through recommendations
 * in a performant way.
 *
 * With this in mind the hasNext and getNext methods are staggered in such
 * a way that `hasNext` returns false if no items are immediately available.
 *
 * `getNext` is an async function, awaiting it will return a recommendation,
 * if `hasNext` was true then `getNext` will likely return immediately. However
 * if `hasNext` is false, there may be a delay on awaiting `getNext`. This means
 * either `getNext` will return null (the list is out, and will return immediately)
 * or it will block on the request to be fulfilled.
 *
 * The buffering strategy for blocking should result in a blocking `await getNext`
 * call only on the first request after initialization, or if multiple records
 * are parsed at a very fast speed.
 *
 * In the case of the first request, there is no avoiding this if you must have
 * a record from this class. In the case of a large batch of requests
 * (exceeding the current amount in memory) we should consider adjusting the
 * pageSize for more optimal performance.
 */
class Recommender<T extends IRecommendation> implements IRecommender<T> {
  /**
   * loadMoreFn allows the caller to define the object structure
   * that we will return. This we support arbitrary data <T>
   */
  private readonly loadMoreFn: (params: Record<string, any>) => Promise<RecommenderResponse<T>>;

  /**
   * In memory records. These are the number of records remaining
   * before `await getNext()` blocks or `hasNext()` returns false
   */
  private nextRecords: T[];
  private pageSize: number;
  private noMoreInApi: boolean;
  private currentRank: number;
  private inFlightRequest?: Promise<void>;
  private pageToken?: string;

  /**
   * Constructor (lol)
   *
   * @param loadMoreFn user defined function to load arbitrary data
   * @param pageSize pageSize for buffering. Should be optimized based on batchs user expects
   */
  constructor(loadMoreFn: (params: Record<string, any>) => Promise<RecommenderResponse<T>>, pageSize = 25) {
    this.loadMoreFn = loadMoreFn;
    this.currentRank = 0;
    this.nextRecords = [];
    this.pageSize = pageSize;
    this.noMoreInApi = false;
    this.loadMore();
  }

  /**
   * Retrieves the next value async.
   *
   * As stated above this function will block if
   * the `hasNext` function is false and there are
   * more records to load
   *
   * @returns T
   */
  public getNext = async (): Promise<T | null> => {
    if (this.shouldLoadMore()) {
      // loadMore is async and should happen in the background
      this.loadMore();
    }

    if (!this.hasNext() && this.inFlightRequest) {
      // if we don't have any, block on the current request
      await this.inFlightRequest;
    }

    if (!this.hasNext()) {
      // if after blocking we still don't have some, we know there are none
      return null;
    }

    const nextRecord = this.nextRecords.shift();
    if (!nextRecord) {
      return null;
    }

    // finally grab the next record and return it
    const record = {
      ...nextRecord,
      listRank: this.currentRank,
    };

    // this increment may be suspicious, consider class state and async
    this.currentRank += 1;
    return record;
  };

  /**
   * This function simply tells us if there is another
   * value ready to be served.
   *
   * This non-async function also tells us if `await getNext`
   * will block for any meaningful amount of time
   *
   * @returns boolean
   */
  public hasNext = (): boolean => {
    // only consider in memory values
    return this.nextRecords.length > 0;
  };

  /**
   * This function is utilized to, in the background, load
   * more values into memory. This is the buffering strategy
   * that should allow `await getNext` to only block for any
   * meaningful amount of time every pageSize batch.
   *
   * Ideally this function should prevent `await getNext` from
   * ever blocking, except for on the first request
   */
  private loadMore = () => {
    /**
     * notice data is pulled from user defined function, which
     * means it works on arbitrary data <T>
     */
    this.inFlightRequest = this.loadMoreFn({
      pageSize: this.pageSize,
      pageToken: this.pageToken,
    })
      .then((data: RecommenderResponse<T>) => {
        if (!data?.recommended || data?.recommended.length <= 0) {
          this.noMoreInApi = true;
          return;
        }

        if (data?.pageToken) {
          this.pageToken = data.pageToken;
        }
        const records = data.recommended as T[];
        this.nextRecords = this.nextRecords.concat(records);
      })
      .catch((error) => {
      })
      .finally(() => {
        this.inFlightRequest = undefined;
      });
  };

  /**
   * Gatekeep the calling of loadMore
   *
   * The intention is to check if we should load more each time someone
   * calls `getNext` and background the process.
   *
   * This function can be optimized for better load strategies dependent
   * on usage.
   *
   * @returns boolean
   */
  private shouldLoadMore = (): boolean => {
    return this.nextRecords.length * 2.0 <= this.pageSize && !this.inFlightRequest && !this.noMoreInApi;
  };
}
