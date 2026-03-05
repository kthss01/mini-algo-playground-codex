# P000 Dummy Walkthrough

## 문제 설명
주어진 숫자 배열 `items`를 순회하면서 각 원소를 방문하고, 마지막에 합계를 계산한다.

- 입력: `{ "items": number[] }`
- 출력: `{ "sum": number, "count": number }`

## 학습 목표
- 알고리즘 함수와 Step 생성기를 분리하는 구조를 연습한다.
- 시각화 플레이어에서 `state`/`visit` Step을 재생하는 흐름을 검증한다.


## 학습 TODO
- [ ] 입력 배열을 한 칸씩 순회하면서 `sum`/`count` 상태를 손으로 추적해보기.
- [ ] 각 순회 시점에서 어떤 `visit` Step이 찍혀야 하는지 예측해보기.
- [ ] 마지막 `done` Step의 payload가 반환값과 일치하는지 확인하기.

## 예시
- 입력: `{ "items": [1, 3, 2] }`
- 출력: `{ "sum": 6, "count": 3 }`
