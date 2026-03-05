const { mergeIntervals } = require('../src/algorithms/p002_merge_intervals');
const { buildMergeIntervalsSteps } = require('../src/visualizers/p002_merge_intervals.steps');

describe('P002 merge intervals', () => {
  test('기본 병합 케이스를 처리한다', () => {
    expect(
      mergeIntervals([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ])
    ).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ]);
  });

  test('완전 포함 케이스를 처리한다', () => {
    expect(
      mergeIntervals([
        [1, 4],
        [2, 3],
      ])
    ).toEqual([[1, 4]]);
  });

  test('입력이 비어 있으면 빈 배열을 반환한다', () => {
    expect(mergeIntervals([])).toEqual([]);
  });

  test('steps는 init과 done을 포함한다', () => {
    const steps = buildMergeIntervalsSteps({ intervals: [[1, 3], [2, 4]] });

    expect(steps[0]).toMatchObject({ kind: 'state', meta: { label: 'init' } });
    expect(steps.at(-1)).toMatchObject({ kind: 'state', meta: { label: 'done' } });
  });
});
