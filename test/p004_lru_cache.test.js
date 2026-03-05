const { LRUCache, runLRUScenario } = require('../src/algorithms/p004_lru_cache');
const { buildLRUSteps } = require('../src/visualizers/p004_lru_cache.steps');

describe('P004 LRU cache', () => {
  test('시나리오 기본 동작', () => {
    const outputs = runLRUScenario({
      capacity: 2,
      ops: [
        { type: 'put', key: 1, value: 1 },
        { type: 'put', key: 2, value: 2 },
        { type: 'get', key: 1 },
        { type: 'put', key: 3, value: 3 },
        { type: 'get', key: 2 },
      ],
    });

    expect(outputs).toEqual([1, -1]);
  });

  test('기존 key put 시 최신화된다', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(1, 10);

    expect(cache.get(1)).toBe(10);
  });

  test('steps는 init과 done을 포함한다', () => {
    const steps = buildLRUSteps({
      capacity: 2,
      ops: [
        { type: 'put', key: 1, value: 1 },
        { type: 'get', key: 1 },
      ],
    });

    expect(steps[0]).toMatchObject({ meta: { label: 'init' } });
    expect(steps.at(-1)).toMatchObject({ meta: { label: 'done' } });
  });
});
