// TODO(학습): solveDummy 로직을 직접 구현해보세요.
// - items 순회로 sum/count 계산
// - 엣지 케이스(빈 배열, 숫자 변환) 점검

function solveDummy(input) {
  const items = Array.isArray(input?.items) ? input.items : [];
  const sum = items.reduce((acc, value) => acc + Number(value || 0), 0);

  return {
    sum,
    count: items.length,
  };
}

module.exports = {
  solveDummy,
};
