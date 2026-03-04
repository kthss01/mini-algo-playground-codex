const { registry, getProblemById } = require('../src/registry/problems.registry');

describe('problems registry', () => {
  test('P000 더미 문제가 존재한다', () => {
    const dummy = getProblemById('P000');

    expect(dummy).not.toBeNull();
    expect(dummy).toMatchObject({
      id: 'P000',
      title: 'Dummy Walkthrough',
      rendererType: 'array',
    });
  });

  test('P001 Two Sum 문제가 존재한다', () => {
    const p001 = getProblemById('P001');

    expect(p001).not.toBeNull();
    expect(p001).toMatchObject({
      id: 'P001',
      title: 'Two Sum',
      rendererType: 'array',
    });
  });

  test('존재하지 않는 문제 id는 null을 반환한다', () => {
    expect(getProblemById('P999')).toBeNull();
  });

  test('buildSteps는 Step 배열을 반환하고 done step을 포함한다', () => {
    const problem = getProblemById('P001');
    const steps = problem.buildSteps(problem.defaultInput);

    expect(Array.isArray(steps)).toBe(true);
    expect(steps[0]).toHaveProperty('kind');
    expect(steps[0]).toHaveProperty('payload');
    expect(steps.at(-1)).toMatchObject({ meta: { label: 'done' } });
  });

  test('registry에는 최소 2개 문제가 등록되어 있다', () => {
    expect(registry.length).toBeGreaterThanOrEqual(2);
  });
});
