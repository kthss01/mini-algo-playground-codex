export function buildTwoSumSteps(input) {
  const nums = Array.isArray(input?.nums) ? [...input.nums] : [];
  const target = Number(input?.target ?? 0);
  const seen = new Map();
  const steps = [
    {
      kind: 'state',
      payload: { nums, target, i: null, complement: null, seen: Object.fromEntries(seen.entries()) },
      meta: { label: 'init' },
    },
  ];

  for (let i = 0; i < nums.length; i += 1) {
    const current = Number(nums[i]);
    const complement = target - current;

    steps.push({
      kind: 'compare',
      payload: { nums, i, current, complement, target, seen: Object.fromEntries(seen.entries()) },
      meta: { label: `compare i=${i}` },
    });

    if (seen.has(complement)) {
      const pair = [seen.get(complement), i];
      steps.push({
        kind: 'state',
        payload: { nums, i, pair, target, complement, seen: Object.fromEntries(seen.entries()) },
        meta: { label: 'done' },
      });
      return steps;
    }

    seen.set(current, i);
    steps.push({
      kind: 'visit',
      payload: { nums, i, inserted: { value: current, index: i }, target, seen: Object.fromEntries(seen.entries()) },
      meta: { label: `store i=${i}` },
    });
  }

  steps.push({
    kind: 'state',
    payload: { nums, target, pair: [], seen: Object.fromEntries(seen.entries()) },
    meta: { label: 'done' },
  });

  return steps;
}
