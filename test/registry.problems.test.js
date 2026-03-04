const { registry, getProblemById } = require('../src/registry/problems.registry');

describe('problems registry', () => {
  test('기본 더미 문제가 존재한다', () => {
    const dummy = getProblemById('P000');

    expect(dummy).not.toBeNull();
    expect(dummy).toMatchObject({
      id: 'P000',
      rendererType: 'array',
    });
  });

  test('존재하지 않는 문제 id는 null을 반환한다', () => {
    expect(getProblemById('P999')).toBeNull();
  });

  test('buildSteps는 Step 배열을 반환한다', () => {
    const [problem] = registry;
    const steps = problem.buildSteps(problem.defaultInput);

    expect(Array.isArray(steps)).toBe(true);
    expect(steps[0]).toHaveProperty('kind');
    expect(steps[0]).toHaveProperty('payload');
  });
});
