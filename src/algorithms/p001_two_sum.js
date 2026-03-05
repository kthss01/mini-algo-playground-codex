// TODO(학습): twoSum 문제를 직접 풀어보세요.
// - 1차: 브루트포스 O(n^2) 구현
// - 2차: 해시맵으로 O(n) 개선

function twoSum(nums, target) {
  const safeNums = Array.isArray(nums) ? nums : [];
  const seen = new Map();

  for (let i = 0; i < safeNums.length; i += 1) {
    const current = Number(safeNums[i]);
    const complement = Number(target) - current;

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(current, i);
  }

  return [];
}

module.exports = {
  twoSum,
};
