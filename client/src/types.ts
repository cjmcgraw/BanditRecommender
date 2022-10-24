export interface RecommenderResponse<T extends IRecommendation> {
  recommended: T[];
  pageToken?: string;
}

export interface IRecommendation {
  id: string;
  recommender: string;
  listRank?: number;
  globalRank?: number;
}

export interface Content {
  id: string,
  source: string,
  creatorId: string
}

// HOC response
export interface RecommendedContent extends IRecommendation, Content {
  onImpression: () => void;
  onViewed: () => void;
  onCTA: () => void;
}
export interface IRecommenderConfig {
  source: string;
  params: number[];
  pageSize?: number;
  pageTokenKey?: string;
}

export interface ISmartList<T> {
  getNext: () => Promise<T|null>;
}

export interface IRecommender<T extends IRecommendation> {
  hasNext(): boolean;
  getNext(): Promise<T|null>;
}

