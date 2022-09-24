// import { IQuickie, RecommenderResponse } from '~/features/quickies/types';
// import qs from 'qs';

// export const getRecommendedQuickies = async (params: Record<string, any>): Promise<RecommenderResponse<IQuickie>> => {
//   const parsedParams = {
//     ...params,
//     source: params?.source,
//   };

//   const res = await fetchWithXsrf(`/api/quickies/fakelist?${qs.stringify(parsedParams)}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (res.status !== 200) {
//     return { recommended: [] };
//   }

//   const data = (await res.json()) as RecommenderResponse<IQuickie>;

//   return {
//     recommended: data.recommended.map((x) => ({ ...x, source: params.source })),
//     pageToken: data.pageToken,
//   };
// };

export {};
