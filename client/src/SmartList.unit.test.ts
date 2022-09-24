import { SmartList } from './BanditLists';
import { buildRecommender } from './Recommender';
import { IRecommendation } from './types';
import lodash, { map } from 'lodash';

class MyData implements IRecommendation {
  id: string;
  source: string;
  listRank?: number;
  globalRank?: number;

  constructor(prefix?: string) {
    function randomValue() {
      return `${prefix}_t=${Date.now()}_rand=${Math.random().toString()}`;
    }
    this.id = randomValue();
    this.source = randomValue();
  }
}

function generateRandomRecords(prefix: string, count: number): MyData[] {
  return lodash.range(0, count).map((x) => new MyData(prefix));
}

function createMockRec(records: MyData[]) {
  const copyOfData = Array.from(records);

  return {
    hasNext: jest.fn().mockImplementation(() => copyOfData.length > 0),
    getNext: jest.fn().mockImplementation(async () => copyOfData.shift()),
  };
}

function getRecordSource(record: MyData) {
  const pieces = record?.id?.split('_');
  if (pieces?.length > 0) {
    return pieces[0];
  }
  return null;
}

jest.mock('./Recommender', () => ({
  buildRecommender: jest.fn(),
}));

describe('smart list tests', () => {
  const mockBuildRecommender = buildRecommender as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('check that it works with just fallback', async () => {
    const records = generateRandomRecords('fallback_test1', 50);
    const fallback = createMockRec(records);

    mockBuildRecommender.mockReturnValueOnce(fallback);

    const smartList = new SmartList(null, 'fallback', []);
    const expectedRecords = records.map((x, i) => ({
      ...x,
      globalRank: i,
    }));
    const actualRecords = [];

    for (const _e of expectedRecords) {
      const data = await smartList.getNext();
      actualRecords.push(data);
    }

    expect(actualRecords).toStrictEqual(expectedRecords);
  });

  it('check fallback is invoked when the recommender hasNext is false', async () => {
    const initialRecordCount = 1000;

    const [rec1Records, fallbackRecords] = [
      generateRandomRecords('rec1_test4', initialRecordCount),
      generateRandomRecords('fallback_test4', initialRecordCount),
    ];

    const [rec1, fallback] = [createMockRec(rec1Records), createMockRec(fallbackRecords)];

    mockBuildRecommender.mockReturnValueOnce(rec1).mockReturnValueOnce(fallback);

    const config = [{ source: 'rec1_test4', params: [1, 1] }];
    const smartList = new SmartList<MyData>(null, 'fallback_test4', config);

    // first we know there are records. hasNext is set to default true
    let record = await smartList.getNext();
    let source = getRecordSource(record);
    expect(source).toBe('rec1');

    // set hasNext to false, expect fallback instead
    rec1.hasNext.mockReturnValueOnce(false);
    record = await smartList.getNext();
    source = getRecordSource(record);
    expect(source).toBe('fallback');

    // next it should default to true again, and we
    // should get the record as expected
    record = await smartList.getNext();
    source = getRecordSource(record);
    expect(source).toBe('rec1');

    // finally lets exhaust the remaining records
    const allSources = new Set();
    for (var i = 0; i < initialRecordCount - 2; i++) {
      const current = await smartList.getNext();
      const currentSource = getRecordSource(current);
      allSources.add(currentSource);
    }

    expect(allSources).toContain('rec1');
    expect(allSources.size).toBe(1);

    // next call should be fallback
    record = await smartList.getNext();
    source = getRecordSource(record);
    expect(source).toBe('fallback');

    // finally lets exhaust the remaining records
    const allFallbackSources = new Set();
    for (var i = 0; i < initialRecordCount - 2; i++) {
      const current = await smartList.getNext();
      const currentSource = getRecordSource(current);
      allFallbackSources.add(currentSource);
    }

    expect(allFallbackSources).toContain('fallback');
    expect(allFallbackSources.size).toBe(1);
  });

  it('check that it dedupes as expected', async () => {
    const sharedRecords = generateRandomRecords('dupes', 50);

    const configs = lodash.range(0, 5).map((i) => ({
      source: `rec${i}_test5`,
      params: [1, 1],
    }));

    const recs = configs.map((x) =>
      createMockRec(lodash.shuffle([...generateRandomRecords(x.source, 100), ...sharedRecords])),
    );

    const fallback = createMockRec(lodash.shuffle([...generateRandomRecords('fallback', 500), ...sharedRecords]));

    recs.map(mockBuildRecommender.mockReturnValueOnce);
    mockBuildRecommender.mockReturnValueOnce(fallback);

    const smartList = new SmartList(null, 'fallback', configs);

    const totalExpectedRecords = configs.length * 100 + sharedRecords.length + 500;
    const seenRecords = new Set<string>();
    for (let i = 0; i < totalExpectedRecords; i++) {
      const record = await smartList.getNext();
      expect(seenRecords).not.toContain(record.id);
      seenRecords.add(record.id);
    }
    expect(seenRecords.size).toBe(totalExpectedRecords);
  });

  it('check that it works with one config, and fallback', async () => {
    const [rec1Records, fallbackRecords] = [
      generateRandomRecords('rec1_test2', 10),
      generateRandomRecords('fallback_test2', 10),
    ];

    const [rec1, fallback] = [createMockRec(rec1Records), createMockRec(fallbackRecords)];

    mockBuildRecommender.mockReturnValueOnce(rec1).mockReturnValueOnce(fallback);

    const config = [
      {
        source: 'rec1_test2',
        params: [1, 1],
      },
    ];

    const smartList = new SmartList(null, 'fallback', config);

    const expectedRecords = rec1Records.map((x, i) => ({
      ...x,
      globalRank: i,
    }));

    const actualRecords = [];

    for (const _e of expectedRecords) {
      const data = await smartList.getNext();
      actualRecords.push(data);
    }
    expect(actualRecords).toStrictEqual(expectedRecords);
  });

  it('check that the rolls work as expected', async () => {
    const config = lodash.range(0, 5).map((i) => ({
      source: `rec${i}_test3`,
      params: [20 - i * 2, 1000],
    }));

    const totalSamples = 1_000;

    const allRecords = config.map((x) => generateRandomRecords(x.source, totalSamples));

    const allMocks = allRecords.map(createMockRec);
    allMocks.map(mockBuildRecommender.mockReturnValueOnce);

    const fallbackRecords = generateRandomRecords('fallback_test3', totalSamples);
    const fallback = createMockRec(fallbackRecords);
    mockBuildRecommender.mockReturnValueOnce(fallback);

    const smartList = new SmartList<MyData>(null, 'fallback_test3', config);

    const counts: Record<string, number> = {};

    for (let i = 0; i < totalSamples; i++) {
      const record = await smartList.getNext();
      const source = getRecordSource(record);
      if (!counts[source]) {
        counts[source] = 0;
      }
      counts[source] += 1;
    }
    const expectedRates: Record<string, number> = {
      // theoretically derived
      rec0: 0.49,
      rec1: 0.28,
      rec2: 0.14,
      rec3: 0.06,
      rec4: 0.02,
    };

    for (const key in counts) {
      const actualRate = counts[key] / totalSamples;
      const expectedRate = expectedRates[key];
      const diff = Math.abs(expectedRate - actualRate);
      expect(diff).toBeLessThanOrEqual(0.05);
    }
  });
});
