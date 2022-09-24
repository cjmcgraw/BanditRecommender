import withBandit, { HOCProps as GenericBanditHOCProps } from './AbstractBanditHOC';
import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { Content, RecommenderResponse } from '../types';
import { buildConsoleLogFn } from '../utils';
import { getRecommenderConfig } from '../pages/api/recommender/weights';

const log = buildConsoleLogFn('ContentBanditHOC');

export type HOCProps = GenericBanditHOCProps<Content>;

async function getRecommendedContent(param: {source: string, pageSize?: number, pageToken?: string}): Promise<RecommenderResponse<Content>> {
  log(`requesting content: source=${param.source}`);
  const querystring = qs.stringify(param)
  const response = await axios.get(`/api/recommender/content?${querystring}`)
  if (response.status !== 200) {
    log(`failed request for more content http_code=${response.status} source=${param.source}`)
    return {
      recommended: [],
    }
  }
  const data = response.data as RecommenderResponse<Content>;
  log(`found content source=${param.source} records=${data.recommended.length}`);
  return data;
}

/**
 * This function is a bit tricky. Ideally we'd just have the higher order
 * component load this before first render, but it doesn't seem like it really
 * works.
 * 
 * So instead we are providing it here as a helper function for the page implementing
 * to extends and then push into the parameters so it can be used
 */
export function getServerSidePropsHelper() {
  const recommenderWeights = getRecommenderConfig();
  return { props: { recommenderWeights } };
}

const withContentBanditHOC = <P extends Record<string, unknown>>(
  wrappedComponent: React.FunctionComponent<P & HOCProps>
) => withBandit(
  wrappedComponent,
  {loadDataFn: getRecommendedContent}
);

export default withContentBanditHOC;