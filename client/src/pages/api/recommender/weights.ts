import type { NextApiRequest, NextApiResponse } from 'next'

export type RecommenderConfig = {
  source: string,
  params: number[],
}

export type RecommenderWeights = {
  model: string,
  configs: RecommenderConfig[]
}

export function getRecommenderConfig(model?: string) {
  return {
    model: model || 'beta',
    configs: [
      {
        source: "source-1",
        params: [1, 1],
      },
      {
        source: "source-2",
        params: [1, 10],
      },
      {
        source: "source-3",
        params: [1, 100],
      },
    ]
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecommenderWeights>
) {
  const data = getRecommenderConfig();
  res.status(200).json(data);
}
