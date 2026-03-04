# P004 LRU Cache

## 문제 설명
용량 `capacity`를 가지는 LRU 캐시를 구현한다. 연산은 `put(key, value)`와 `get(key)`이며,
캐시가 가득 찼을 때는 가장 최근에 사용되지 않은 항목을 제거한다.

- 입력: `{ "capacity": number, "ops": Array<{ type: "put"|"get", key: number, value?: number }> }`
- 출력: `number[]` (`get` 연산의 반환값 목록)

## 제약
- `get`은 key가 없으면 `-1` 반환
- `put`은 기존 key면 값 갱신 + 최근 사용 처리
- 시간복잡도 목표: `get/put` 평균 O(1)

## 예시
- 입력:
  `{ "capacity": 2, "ops": [{"type":"put","key":1,"value":1},{"type":"put","key":2,"value":2},{"type":"get","key":1},{"type":"put","key":3,"value":3},{"type":"get","key":2}] }`
- 출력: `[1, -1]`
