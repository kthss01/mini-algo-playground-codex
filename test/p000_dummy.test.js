const { solveDummy } = require('../src/answer/p000_dummy.answer');
const { buildDummySteps } = require('../src/visualizers/p000_dummy.steps');

describe('P000 dummy', () => {
  test('solveDummy는 합계와 개수를 반환한다', () => {
    expect(solveDummy({ items: [1, 3, 2] })).toEqual({ sum: 6, count: 3 });
  });

  test('입력이 비정상이면 빈 배열로 처리한다', () => {
    expect(solveDummy(null)).toEqual({ sum: 0, count: 0 });
  });

  test('buildDummySteps는 init/visit/done 단계를 포함한다', () => {
    const steps = buildDummySteps({ items: [4, 5] });

    expect(steps[0]).toMatchObject({ kind: 'state', meta: { label: 'init' } });
    expect(steps[1]).toMatchObject({ kind: 'visit' });
    expect(steps.at(-1)).toMatchObject({
      kind: 'state',
      meta: { label: 'done' },
      payload: { result: { sum: 9, count: 2 } },
    });
  });
});
