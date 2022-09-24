import lodash from 'lodash';
import { buildRecommender } from './Recommender';
import { IRecommendation } from './types';

class MyData implements IRecommendation {
  id: string;
  source: string;
  globalRank?: number;
  hello: string;
  listRank?: number;

  constructor() {
    this.id = Math.random().toString();
    this.hello = Math.random().toString();
  }
}

async function smallSleep() {
  await new Promise((r) => setTimeout(r, 5));
}

function randomRecords(count: number): MyData[] {
  return lodash.range(0, count).map((_i) => new MyData());
}

function sameRecord(expected: MyData, actual: MyData) {
  expect(expected.id).toStrictEqual(actual.id);
  expect(expected.hello).toStrictEqual(actual.hello);
}

describe('Recommendations works like we expect', () => {
  it('hasNext tells us when the promise has resolved', async () => {
    const rec = buildRecommender(async (p: any) => {
      await smallSleep();
      return {
        recommended: randomRecords(10),
        pageToken: 'hello-world',
      };
    });

    expect(rec.hasNext()).toBeFalsy();
    // wait for promise to resolve
    await smallSleep();
    expect(rec.hasNext()).toBeTruthy();
  });

  it('hasNext consistent with empty response', async () => {
    const rec = buildRecommender(async (p: any) => {
      await smallSleep();
      return {
        recommended: [] as MyData[],
        pageToken: '',
      };
    });

    await smallSleep();
    expect(rec.hasNext()).toBeFalsy();
    const actual = await rec.getNext();
    expect(actual).toBeNull();
  });

  it('has exact data as expected', async () => {
    const expectedRecords = randomRecords(100);
    const rec = buildRecommender<MyData>(async (p: any) => {
      await smallSleep();
      // if we have a page token, we know this isn't the first request
      if (p?.pageToken?.length > 0) {
        return {
          recommended: [],
          pageToken: 'done',
        };
      }

      return {
        recommended: expectedRecords,
        pageToken: 'forSecondRequest',
      };
    });

    // we expect the first moment to be falsy
    // because a record has not loaded yet
    expect(rec.hasNext()).toBeFalsy();

    for (const [i, expected] of expectedRecords.slice(0, -1).entries()) {
      // finally we await and a record should now be available
      const actual = await rec.getNext();
      expect(rec.hasNext()).toBeTruthy();
      sameRecord(expected, actual);
      expect(actual.listRank).toBe(i);
    }

    expect(rec.hasNext()).toBeTruthy();
    const expected = expectedRecords.slice(-1)[0];
    const actual = await rec.getNext();
    sameRecord(expected, actual);
    expect(actual.listRank).toBe(expectedRecords.length - 1);

    for (const _ in lodash.range(0, 10)) {
      expect(rec.hasNext()).toBeFalsy();
      const actual = await rec.getNext();
      expect(actual).toBeNull();
    }
  });

  it('should pre load on data on getNext calls', async () => {
    const pageSize = 25;
    const expectedGetNextToTriggerCall = Math.round(pageSize / 2) + 1;

    let lastCalledBatch = 0;
    const batchOfRecords = [
      randomRecords(pageSize),
      randomRecords(pageSize),
      randomRecords(pageSize),
      randomRecords(pageSize),
    ];

    const rec = buildRecommender<MyData>(async (p: any) => {
      await smallSleep();
      if (lastCalledBatch > batchOfRecords.length) {
        return {
          recommended: [],
          pageToken: 'again',
        };
      }
      const records = batchOfRecords[lastCalledBatch];
      lastCalledBatch += 1;
      return {
        recommended: records,
        pageToken: 'again',
      };
    }, pageSize);

    expect(lastCalledBatch).toBe(0);
    expect(rec.hasNext()).toBeFalsy();
    await smallSleep();

    expect(rec.hasNext()).toBeTruthy();

    for (const batch of batchOfRecords) {
      const startCallBatch = lastCalledBatch;
      for (const [idx, expected] of batch.entries()) {
        expect(rec.hasNext()).toBeTruthy();

        const actual = await rec.getNext();
        sameRecord(expected, actual);
        if (idx >= expectedGetNextToTriggerCall) {
          if (idx === expectedGetNextToTriggerCall) {
            await smallSleep();
          }
          expect(lastCalledBatch).toBe(startCallBatch + 1);
        } else {
          expect(lastCalledBatch).toBe(startCallBatch);
        }
      }
    }
    expect(rec.hasNext()).toBeFalsy();
  });

  it('pageToken passed as expected', async () => {
    const pageSize = 10;
    const expectedPageTokens = lodash.range(0, 30).map((x) => Math.random().toString());
    const pageTokens = Array.from(expectedPageTokens);
    const actualTokens: string[] = [];

    const rec = buildRecommender<MyData>(async (p: any) => {
      await smallSleep();

      if (p?.pageToken) {
        // if provided a token, push it on the list
        actualTokens.push(p?.pageToken);
      }
      const data = {
        recommended: randomRecords(pageSize),
        // take new token from expected
        pageToken: pageTokens.shift(),
      };
      return data;
    }, pageSize);

    const expectedItems = pageSize * expectedPageTokens.length;
    for (const _i of lodash.range(0, expectedItems + 1)) {
      await rec.getNext();
    }

    expect(actualTokens).toStrictEqual(expectedPageTokens);
  });
});
