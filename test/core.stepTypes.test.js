const { STEP_KINDS, isValidStep, assertValidSteps } = require('../src/core/stepTypes');

describe('stepTypes', () => {
  test('STEP_KINDS는 필수 kind를 포함한다', () => {
    expect(STEP_KINDS).toEqual({
      COMPARE: 'compare',
      SWAP: 'swap',
      VISIT: 'visit',
      STATE: 'state',
    });
  });

  test('isValidStep은 올바른 Step 형식에 true를 반환한다', () => {
    const step = {
      kind: 'state',
      payload: { nums: [1, 2, 3] },
      meta: { label: 'init' },
    };

    expect(isValidStep(step)).toBe(true);
  });

  test('isValidStep은 payload가 없으면 false를 반환한다', () => {
    const step = { kind: 'state' };

    expect(isValidStep(step)).toBe(false);
  });

  test('assertValidSteps는 유효하지 않은 Step에서 예외를 던진다', () => {
    const invalidSteps = [{ kind: 'unknown', payload: {} }];

    expect(() => assertValidSteps(invalidSteps)).toThrow('유효하지 않은 Step 형식입니다. index=0');
  });
});
