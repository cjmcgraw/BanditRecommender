import type { RecommendedContent } from './types';
import * as uuid from 'uuid';
import * as lodash from 'lodash'

export function generateMockContentList(count: number, recommender?: string): RecommendedContent[] {
  const recommenderName = recommender || uuid.v4()
  return lodash.range(0, count)
    .map(idx => generateMockContent({
      recommender: recommenderName, 
      listRank: idx
    }));
}

export function generateMockRecommendations(recommendationCounts: Record<string, number>): RecommendedContent[] {
  const recommenderRecords: Map<string, RecommendedContent[]> = Object.entries(recommendationCounts)
    .reduce((lookup, [recommenderName, n]) => {
      lookup.set(
        recommenderName, 
        generateMockContentList(n, recommenderName)
      );
      return lookup;
    }, new Map());

  function getNonEmptyKeys() {
    return Array.from(recommenderRecords.keys())
      .filter(key => {
        const recordsRemaining = recommenderRecords.get(key)
        return recordsRemaining && recordsRemaining.length > 0
      });
  }

  function hasRemaining() {
    return getNonEmptyKeys().length > 0;
  }

  function getRecommendation() {
    const keys = getNonEmptyKeys();
    const key = lodash.sample(keys);
    const records = (key) ?  recommenderRecords.get(key) : null;
    return (records) ? records.shift() : null;
  }

  let recommendations: RecommendedContent[] = [];
  let globalRank = 0;
  while(hasRemaining()) {
    const record = getRecommendation();
    if (record) { 
      recommendations.push({
        ...record,
        globalRank: globalRank + 1
      })
      globalRank += 1;
    }
  }

  return recommendations;
}

export function generateMockContent(overrides?: Record<any, any>): RecommendedContent {
  return {
    id: uuid.v4(),
    creatorId: uuid.v4(),
    source: uuid.v4(),
    recommender: uuid.v4(),
    listRank: lodash.random(1, 1e9),
    globalRank: lodash.random(1, 1e9),
    onImpression: () => {},
    onViewed: () => {},
    onCTA: () => {},
    ...overrides,
  }
}