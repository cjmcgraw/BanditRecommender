import type { NextApiRequest, NextApiResponse } from 'next'
import type { IRecommendation, RecommenderResponse } from "../../../types";
import lodash from 'lodash';
import {v4 as uuidv4} from 'uuid';

export interface Content extends IRecommendation {
  source: string,
  media: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecommenderResponse<Content>>
) {
  const {source, pageSize} = {
    source: req.query?.source as string,
    pageSize: parseInt(req.query?.pageSize as string)
  }

  const content = lodash
    .range(pageSize)
    .map(i => ({
      id: uuidv4(),
      source,
      media: uuidv4(),
    }));

  res.status(200).json({
    recommended: content,
    pageToken: uuidv4()
  })
}
