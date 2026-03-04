# 작업 이력

## Phase A

### A1 프로젝트 초기화 및 기본 스크립트
- 수행 일시: 2026-03-04
- 결과: `package.json` 생성, 스크립트 설정, `.gitignore` 추가
- 이슈: npm 레지스트리 403으로 `jest`, `http-server` 설치 실패
- 대응: `dev` 스크립트를 `python3 -m http.server 8080`으로 설정

### A2 디렉터리 골격 생성
- 수행 일시: 2026-03-04
- 결과: `problems`, `src/*`, `test`, `docs` 구조 생성

### A3 Jest 설정 파일 작성
- 수행 일시: 2026-03-04
- 결과: `jest.config.js` 작성
- 이슈: Jest 패키지 미설치 상태라 실제 실행 검증은 제한됨

### A4 Step 규약/플레이어 인터페이스 정의
- 수행 일시: 2026-03-04
- 결과: `src/core/stepTypes.js`, `src/core/stepPlayer.js` 작성

### A5 문제 Registry 인터페이스 정의
- 수행 일시: 2026-03-04
- 결과: `src/registry/problems.registry.js` 작성

## Phase A 보완

### A-보완1 빌드 스크립트 오류 수정
- 수행 일시: 2026-03-04
- 결과: `npm run build` 실행 시 발생하던 따옴표 이스케이프 오류 수정

### A-보완2 코어/레지스트리 단위 테스트 추가
- 수행 일시: 2026-03-04
- 결과: `stepTypes`, `stepPlayer`, `registry` 대상 Jest 테스트 3종 추가
- 이슈: npm 레지스트리 403으로 Jest 설치가 여전히 불가하여 테스트 실행은 환경 제한

## Phase B

### B1 정적 UI 레이아웃 구성
- 수행 일시: 2026-03-04
- 결과: `docs/index.html`, `docs/style.css` 작성
- 포함: 문제 선택, 입력 JSON, 실행 버튼, 재생 컨트롤, Step/상태/메시지 패널

### B2 앱 로직 및 플레이어 연결
- 수행 일시: 2026-03-04
- 결과: `docs/app.js`, `docs/player.js`, `docs/problems.js` 작성
- 포함: 문제 선택/입력 초기화/실행/이전·다음/재생·일시정지/속도 반영

### B3 공통/문제별 렌더러 분리
- 수행 일시: 2026-03-04
- 결과: `docs/renderers/commonRenderer.js`, `arrayRenderer.js`, `mapListRenderer.js` 작성
- 포함: Step payload 타입별 렌더 분기 및 기본 시각화

## Phase C

### C1 더미 문제 아티팩트 추가
- 수행 일시: 2026-03-04
- 결과: `problems/P000_dummy.md`, `src/algorithms/p000_dummy.js`, `src/visualizers/p000_dummy.steps.js` 작성
- 포함: 문제 명세, 순수 함수, Step 배열 생성기

### C2 레지스트리/문서 UI/테스트 연결
- 수행 일시: 2026-03-04
- 결과: `src/registry/problems.registry.js`를 P000 steps 생성기와 연결
- 결과: `docs/problems.js`를 P000 더미 흐름(init/visit/done)으로 갱신
- 결과: `test/p000_dummy.test.js` 추가 및 `test/registry.problems.test.js` 강화

## Phase D

### D1 P001 문제 아티팩트 추가
- 수행 일시: 2026-03-04
- 결과: `problems/P001_two_sum.md`, `src/algorithms/p001_two_sum.js`, `src/visualizers/p001_two_sum.steps.js`, `test/p001_two_sum.test.js` 작성
- 포함: Two Sum 순수 함수, compare/visit/state 기반 Step 생성기, 기본/엣지 테스트

### D2 P001 레지스트리/UI 연결
- 수행 일시: 2026-03-04
- 결과: `src/registry/problems.registry.js`에 P001 등록
- 결과: `docs/problems.js`에 P001 Step 생성 흐름 추가
- 결과: 렌더러가 `nums`, `seen`, `pair` 상태를 표시하도록 개선
- 결과: 레지스트리 테스트에 P001 검증 추가

### D3 P002 문제 아티팩트 추가
- 수행 일시: 2026-03-04
- 결과: `problems/P002_merge_intervals.md`, `src/algorithms/p002_merge_intervals.js`, `src/visualizers/p002_merge_intervals.steps.js`, `test/p002_merge_intervals.test.js` 작성
- 포함: 정렬+sweep 병합 로직, compare/visit/state Step 생성, 엣지 테스트

### D4 P002 레지스트리/UI 연결
- 수행 일시: 2026-03-04
- 결과: `src/registry/problems.registry.js`에 P002 등록
- 결과: `docs/problems.js`에 P002 Step 생성 흐름 추가
- 결과: 배열 렌더러가 interval/merged 상태를 표시하도록 확장
- 결과: 레지스트리 테스트에 P002 검증 추가

### D5 P003 문제 아티팩트 추가
- 수행 일시: 2026-03-04
- 결과: `problems/P003_top_k_frequent.md`, `src/algorithms/p003_top_k_frequent.js`, `src/visualizers/p003_top_k_frequent.steps.js`, `test/p003_top_k_frequent.test.js` 작성
- 포함: Map+MinHeap 기반 상위 K 빈도 계산, 힙 push/pop Step 기록, 기본/엣지 테스트

### D6 P003 레지스트리/UI 연결
- 수행 일시: 2026-03-04
- 결과: `src/registry/problems.registry.js`에 P003 등록
- 결과: `docs/problems.js`에 P003 Step 생성 흐름 추가
- 결과: 렌더러가 `freq`, `heap`, `pushed/removed` 상태를 표시하도록 확장
- 결과: 레지스트리 테스트에 P003 검증 추가
