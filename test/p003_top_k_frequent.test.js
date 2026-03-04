const { topKFrequent } = require('../src/algorithms/p003_top_k_frequent');
const { buildTopKFrequentSteps } = require('../src/visualizers/p003_top_k_frequent.steps');

describe('P003 top k frequent', () => {
  test('기본 케이스를 처리한다', () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2]);
  });

  test('k가 0이면 빈 배열을 반환한다', () => {
    expect(topKFrequent([1, 2, 3], 0)).toEqual([]);
  });

  test('단일 원소 배열을 처리한다', () => {
    expect(topKFrequent([9], 1)).toEqual([9]);
  });

  test('steps는 init과 done을 포함한다', () => {
    const steps = buildTopKFrequentSteps({ nums: [1, 1, 2, 3], k: 2 });

    expect(steps[0]).toMatchObject({ kind: 'state', meta: { label: 'init' } });
    expect(steps.at(-1)).toMatchObject({ kind: 'state', meta: { label: 'done' } });
  });
});
