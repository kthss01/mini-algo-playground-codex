export function createUIPlayer({ onStepChange }) {
  let steps = [];
  let index = 0;
  let timer = null;
  let speed = 1;

  function emit() {
    const current = steps[index] || null;
    onStepChange({ step: current, index, total: steps.length });
  }

  function setSteps(nextSteps) {
    steps = Array.isArray(nextSteps) ? nextSteps : [];
    index = 0;
    pause();
    emit();
  }

  function next() {
    if (steps.length === 0) return;
    index = Math.min(index + 1, steps.length - 1);
    emit();
  }

  function prev() {
    if (steps.length === 0) return;
    index = Math.max(index - 1, 0);
    emit();
  }

  function play() {
    if (timer || steps.length === 0) return;
    timer = setInterval(() => {
      if (index >= steps.length - 1) {
        pause();
        return;
      }
      next();
    }, 1000 / speed);
  }

  function pause() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  }

  function setSpeed(nextSpeed) {
    const parsed = Number(nextSpeed);
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    speed = parsed;
    if (timer) {
      pause();
      play();
    }
  }

  return {
    setSteps,
    next,
    prev,
    play,
    pause,
    setSpeed,
  };
}
