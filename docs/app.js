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
const sourceCodeEl = document.getElementById('source-code');
const runCodeBtn = document.getElementById('run-code-btn');
const codeResultEl = document.getElementById('code-result');
const submitHintEl = document.getElementById('submit-hint');

const player = createUIPlayer({
  onStepChange: ({ step, index, total }) => {
    currentStepEl.textContent = step ? JSON.stringify({ index, total, ...step }, null, 2) : '(step 없음)';
    renderStepState(stateViewEl, step);
  },
});

function setMessage(text) {
  messageEl.textContent = text;
}

function setCodeResult(text, level = 'info') {
  codeResultEl.textContent = text;
  codeResultEl.dataset.level = level;
}

function getSelectedProblem() {
  return problems.find((problem) => problem.id === problemSelect.value) || problems[0] || null;
}

function refreshInput(problem) {
  if (!problem) {
    inputJson.value = '{}';
    sourceCodeEl.value = 'function solve(input) {\n  return input;\n}';
    submitHintEl.textContent = '';
    return;
  }
  inputJson.value = JSON.stringify(problem.defaultInput, null, 2);
  sourceCodeEl.value = problem.codeTemplate || 'function solve(input) {\n  return input;\n}';
  submitHintEl.textContent = `정답으로 확인되면 src/algorithms/${problem.id.toLowerCase()}_*.js 파일에 소스를 반영하고 commit 하세요.`;
}

function getDonePayload(steps) {
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    if (steps[i]?.meta?.label === 'done') {
      return steps[i].payload;
    }
  }
  return null;
}

function getExpectedResult(problem, input) {
  const payload = getDonePayload(problem.buildSteps(input));
  if (!payload) {
    return null;
  }

  switch (problem.id) {
    case 'P000':
      return payload.result;
    case 'P001':
      return payload.pair || [];
    case 'P002':
      return payload.merged || [];
    case 'P003':
      return payload.result || [];
    case 'P004':
      return payload.outputs || [];
    default:
      return payload;
  }
}

function safeStringify(value) {
  return JSON.stringify(value, null, 2);
}

function initProblemSelect() {
  if (!Array.isArray(problems) || problems.length === 0) {
    problemSelect.disabled = true;
    runBtn.disabled = true;
    runCodeBtn.disabled = true;
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
    setCodeResult('코드를 수정하고 [코드 실행/채점] 버튼으로 결과를 확인하세요.');
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

runCodeBtn.addEventListener('click', () => {
  try {
    const selected = getSelectedProblem();
    if (!selected) {
      setCodeResult('실행할 문제가 없습니다.', 'error');
      return;
    }

    const parsed = JSON.parse(inputJson.value || '{}');
    const source = sourceCodeEl.value || '';

    const runner = new Function(`${source}\nif (typeof solve !== 'function') { throw new Error('solve(input) 함수를 정의해 주세요.'); }\nreturn solve;`);
    const solve = runner();

    const start = performance.now();
    const actual = solve(parsed);
    const elapsed = performance.now() - start;
    const expected = getExpectedResult(selected, parsed);
    const pass = safeStringify(actual) === safeStringify(expected);

    setCodeResult(
      `${pass ? '✅ 정답 일치' : '❌ 정답 불일치'}\n\n실행 시간: ${elapsed.toFixed(3)}ms\n\n실행 결과:\n${safeStringify(actual)}\n\n기대 결과:\n${safeStringify(expected)}`,
      pass ? 'success' : 'error',
    );
  } catch (error) {
    setCodeResult(`⚠️ 코드 실행 오류\n${error.message}`, 'error');
  }
});

prevBtn.addEventListener('click', () => player.prev());
nextBtn.addEventListener('click', () => player.next());
playBtn.addEventListener('click', () => player.play());
pauseBtn.addEventListener('click', () => player.pause());
speedInput.addEventListener('change', () => player.setSpeed(speedInput.value));

initProblemSelect();
setCodeResult('코드를 수정하고 [코드 실행/채점] 버튼으로 결과를 확인하세요.');
setMessage('문제를 선택하고 실행해 주세요.');
