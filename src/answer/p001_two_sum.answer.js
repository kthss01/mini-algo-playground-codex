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
