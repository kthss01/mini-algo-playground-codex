const STEP_KINDS = Object.freeze({
  COMPARE: 'compare',
  SWAP: 'swap',
  VISIT: 'visit',
  STATE: 'state',
});

function isValidStep(step) {
  if (!step || typeof step !== 'object') return false;
  if (!Object.values(STEP_KINDS).includes(step.kind)) return false;
  if (!Object.prototype.hasOwnProperty.call(step, 'payload')) return false;
  if (step.meta !== undefined && typeof step.meta !== 'object') return false;
  return true;
}

function assertValidSteps(steps) {
  if (!Array.isArray(steps)) {
    throw new TypeError('steps는 배열이어야 합니다.');
  }

  steps.forEach((step, index) => {
    if (!isValidStep(step)) {
      throw new TypeError(`유효하지 않은 Step 형식입니다. index=${index}`);
    }
  });

  return true;
}

module.exports = {
  STEP_KINDS,
  isValidStep,
  assertValidSteps,
};
