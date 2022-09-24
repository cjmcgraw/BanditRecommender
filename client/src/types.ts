export interface RecommenderResponse<T extends IRecommendation> {
  recommended: T[];
  pageToken?: string;
}

export interface IRecommendation {
  id: string;
  source: string;
  listRank?: number;
  globalRank?: number;
}

// HOC response
export interface Content extends IRecommendation {
  creatorId: number;
  onImpression?: () => void;
  onViewed?: () => void;
  onCTA?: () => void;
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

