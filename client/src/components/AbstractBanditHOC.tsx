import type { ISmartList, IRecommenderConfig, RecommenderResponse, IRecommendation } from '../types';
import { BetaBanditList } from '../BanditLists';
import React from 'react';
import axios from 'axios';
import { buildConsoleLogFn } from '../utils';
import { RecommenderWeights } from '../pages/api/recommender/weights';

const log = buildConsoleLogFn("AbstractBanditHOC");

export type HOCProps<T extends IRecommendation> = {
  getNext: () => Promise<T|null>;
};

interface HOCConfig<T extends IRecommendation> {
  loadDataFn: (param: {source: string, pageSize?: number, pageToken?: string}) =>  Promise<RecommenderResponse<T>>;
}

interface HOCInputProps {
  recommenderWeights: RecommenderWeights
}


const withAbstractBanditHOC = <P extends Record<string, unknown>, T extends IRecommendation>(
  WrappedComponent: React.FunctionComponent<P & HOCProps<T>>,
  config: HOCConfig<T>
): React.FunctionComponent<P & HOCInputProps> => {
  log("HELLO , wORLD");
  console.log("HELLO WORLD");
  async function sendEvent(type: string, record: T) {
    await axios.post("/api/event", { type, record, })
  }

  const HOC = (props: P & HOCInputProps) => {
    log(`props=${JSON.stringify(props)}`);
    /**
     * SmartList wraps all the functionality of choosing/rolling against an outcome
     * so that we can simply treat it as an iterator and call getNext.
     *
     * All deduping, rerolling/etc will be handled internally in this reference.
     */
    const smartList = React.useRef<ISmartList<T>>(
      new BetaBanditList(
        config.loadDataFn,
        "fallback",
        props.recommenderWeights.configs
      )
    );

    /**
     * Retrieve the next quickie from the smartlist. Managing the
     * deduping process/etc
     *
     * @returns
     */
    async function getNext(): Promise<T|null> {
      const current = await smartList.current.getNext();
      if (!current) {
        return null;
      }

      return {
        ...current,
        onImpression: () => sendEvent("impression", current),
        onClick: () => sendEvent('click', current),
        onViewed: () => sendEvent('viewed', current),
        onCTA: () => sendEvent('cta', current),
      };
    }
    return !smartList.current 
      ? <div /> 
      : <WrappedComponent 
          getNext={getNext} 
          {...props} 
        />;
  };

  return HOC;
};

export default withAbstractBanditHOC;