function createStepPlayer(steps = []) {
  let index = 0;
  let isPlaying = false;
  let speed = 1;

  function setSteps(nextSteps) {
    if (!Array.isArray(nextSteps)) {
      throw new TypeError('steps는 배열이어야 합니다.');
    }
    steps = nextSteps;
    index = 0;
    isPlaying = false;
  }

  function getCurrentStep() {
    if (steps.length === 0) return null;
    return steps[index] || null;
  }

  function next() {
    if (steps.length === 0) return null;
    index = Math.min(index + 1, steps.length - 1);
    return getCurrentStep();
  }

  function prev() {
    if (steps.length === 0) return null;
    index = Math.max(index - 1, 0);
    return getCurrentStep();
  }

  function seek(nextIndex) {
    if (steps.length === 0) return null;
    if (!Number.isInteger(nextIndex)) {
      throw new TypeError('seek 인덱스는 정수여야 합니다.');
    }
    index = Math.max(0, Math.min(nextIndex, steps.length - 1));
    return getCurrentStep();
  }

  function play() {
    isPlaying = true;
  }

  function pause() {
    isPlaying = false;
  }

  function setSpeed(nextSpeed) {
    const parsed = Number(nextSpeed);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      throw new TypeError('재생 속도는 0보다 큰 숫자여야 합니다.');
    }
    speed = parsed;
  }

  function getState() {
    return {
      index,
      length: steps.length,
      isPlaying,
      speed,
    };
  }

  return {
    setSteps,
    getCurrentStep,
    next,
    prev,
    seek,
    play,
    pause,
    setSpeed,
    getState,
  };
}

module.exports = {
  createStepPlayer,
};
