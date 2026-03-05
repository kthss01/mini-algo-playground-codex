import { createUIPlayer } from './player.js';
import { problems } from './problems.js';
import { renderStepState } from './renderers/commonRenderer.js';

const problemSelect = document.getElementById('problem-select');
const inputJson = document.getElementById('input-json');
const runBtn = document.getElementById('run-btn');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const speedInput = document.getElementById('speed-input');
const currentStepEl = document.getElementById('current-step');
const stateViewEl = document.getElementById('state-view');
const messageEl = document.getElementById('message');

const player = createUIPlayer({
  onStepChange: ({ step, index, total }) => {
    currentStepEl.textContent = step ? JSON.stringify({ index, total, ...step }, null, 2) : '(step 없음)';
    renderStepState(stateViewEl, step);
  },
});

function setMessage(text) {
  messageEl.textContent = text;
}

function getSelectedProblem() {
  return problems.find((problem) => problem.id === problemSelect.value) || problems[0] || null;
}

function refreshInput(problem) {
  if (!problem) {
    inputJson.value = '{}';
    return;
  }
  inputJson.value = JSON.stringify(problem.defaultInput, null, 2);
}

function initProblemSelect() {
  if (!Array.isArray(problems) || problems.length === 0) {
    problemSelect.disabled = true;
    runBtn.disabled = true;
    setMessage('등록된 문제가 없습니다.');
    refreshInput(null);
    return;
  }

  problems.forEach((problem) => {
    const option = document.createElement('option');
    option.value = problem.id;
    option.textContent = `${problem.id} - ${problem.title}`;
    problemSelect.appendChild(option);
  });

  problemSelect.addEventListener('change', () => {
    const selected = getSelectedProblem();
    refreshInput(selected);
    setMessage(`${selected.id} 입력값으로 초기화했습니다.`);
  });

  refreshInput(problems[0]);
}

runBtn.addEventListener('click', () => {
  try {
    const selected = getSelectedProblem();
    if (!selected) {
      setMessage('실행할 문제가 없습니다.');
      return;
    }

    const parsed = JSON.parse(inputJson.value || '{}');
    const steps = selected.buildSteps(parsed);
    if (!Array.isArray(steps)) {
      throw new Error('Step 생성 결과가 배열이 아닙니다.');
    }

    player.setSteps(steps);
    setMessage(`${selected.id} 실행 완료 (총 ${steps.length} step)`);
  } catch (error) {
    setMessage(`실행 실패: ${error.message}`);
  }
});

prevBtn.addEventListener('click', () => player.prev());
nextBtn.addEventListener('click', () => player.next());
playBtn.addEventListener('click', () => player.play());
pauseBtn.addEventListener('click', () => player.pause());
speedInput.addEventListener('change', () => player.setSpeed(speedInput.value));

initProblemSelect();
setMessage('문제를 선택하고 실행해 주세요.');
