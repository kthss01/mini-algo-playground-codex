# mini-algo-playground-codex

바닐라 JavaScript(Node.js) 기반 알고리즘 학습/시각화 실험 프로젝트입니다.

## 목표
- 문제 단위로 알고리즘을 구현하고 테스트한다.
- 알고리즘 내부 상태를 Step으로 기록해 정적 UI에서 재생한다.
- `구현 → 테스트 → 커밋 → Codex 리뷰` 루프를 반복한다.

## 기술 스택
- Node.js
- Vanilla JavaScript (CommonJS + Browser ESM)
- Jest (테스트 러너)
- 정적 UI (`docs/`)

## 빠른 시작
```bash
npm run dev
```
- 브라우저에서 `http://localhost:8080/docs/index.html` 접속

> 현재 환경에서는 npm registry 403으로 Jest 설치가 막혀 있어 `npm test`가 실패할 수 있습니다.

## 스크립트
- `npm test` : Jest 테스트 실행
- `npm run test:watch` : Jest watch 모드
- `npm run dev` : 정적 서버 실행 (`python3 -m http.server 8080`)
- `npm run build` : 빌드 스텁

## 학습 루프
1. `problems/Pxxx_*.md` 문제 읽기
2. `src/algorithms/pxxx_*.js` TODO 파일에 직접 풀이 구현
3. 필요 시 `src/answer/pxxx_*.answer.js` 정답 예시와 비교
4. `test/pxxx_*.test.js` 테스트 실행/보강
5. `src/visualizers/pxxx_*.steps.js` 시각화 step 생성기 구현
6. `src/registry/problems.registry.js` + `docs/problems.js` 등록
7. 커밋 후 Codex 리뷰 요청

## Step 포맷 규약
```js
{
  kind: "compare" | "swap" | "visit" | "state",
  payload: { ... },
  meta?: {
    label?: string
  }
}
```
- Step은 배열로 반환
- 첫 step은 `init`, 마지막 step은 `done` 권장

## 문제 추가 체크리스트
- [ ] `problems/P0NN_title.md`
- [ ] `src/algorithms/p0nn_title.js` (TODO 학습용)
- [ ] `src/answer/p0nn_title.answer.js` (정답 예시)
- [ ] `src/visualizers/p0nn_title.steps.js`
- [ ] `test/p0nn_title.test.js`
- [ ] `src/registry/problems.registry.js` 등록
- [ ] `docs/problems.js` 등록
- [ ] UI 렌더 확인 및 커밋

## 현재 포함 문제
- P000 Dummy Walkthrough
- P001 Two Sum
- P002 Merge Intervals
- P003 Top K Frequent
- P004 LRU Cache
