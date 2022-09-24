// import { fetchWithXsrf } from '~/utils/xsrf-tools';
// import { getRecommendedQuickies } from './quickieAPI';

// jest.mock('~/utils/xsrf-tools', () => ({
//   fetchWithXsrf: jest.fn(),
// }));

// function setMockResponse(status: number, data: Record<string, any>) {
//   const mock = fetchWithXsrf as jest.Mock;
//   mock.mockReturnValue({
//     status,
//     json: async () => data,
//   });
// }

// describe('check quickiesAPI functionality', () => {
//   afterEach(jest.clearAllMocks);

//   it('works when 200 with good response', async () => {
//     const expected = [{ hello: 'world!' }];
//     setMockResponse(200, expected);
//     const data = await getRecommendedQuickies({ source: 'abc-123' });
//     expect(data).toBe(expected);
//   });

//   it('returns empty when 400', async () => {
//     setMockResponse(400, undefined);
//     const data = await getRecommendedQuickies({ source: 'abc-123' });
//     expect(data).toMatchObject({ recommended: [] });
//   });

//   it('returns empty when 500', async () => {
//     setMockResponse(500, undefined);
//     const data = await getRecommendedQuickies({ source: 'abc-123' });
//     expect(data).toMatchObject({ recommended: [] });
//   });
// });

export {};