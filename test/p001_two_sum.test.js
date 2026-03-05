const { twoSum } = require('../src/answer/p001_two_sum.answer');
const { buildTwoSumSteps } = require('../src/visualizers/p001_two_sum.steps');

describe('P001 two sum', () => {
  test('기본 케이스를 해결한다', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test('답이 없으면 빈 배열을 반환한다', () => {
    expect(twoSum([1, 2, 3], 100)).toEqual([]);
  });

  test('중복 숫자 케이스를 처리한다', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  test('steps는 init과 done을 포함한다', () => {
    const steps = buildTwoSumSteps({ nums: [2, 7], target: 9 });

    expect(steps[0]).toMatchObject({ kind: 'state', meta: { label: 'init' } });
    expect(steps.at(-1)).toMatchObject({ kind: 'state', meta: { label: 'done' } });
  });
});
