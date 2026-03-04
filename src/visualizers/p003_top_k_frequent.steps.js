const { topKFrequent } = require('../algorithms/p003_top_k_frequent');

function buildTopKFrequentSteps(input) {
  const nums = Array.isArray(input?.nums) ? input.nums.map((v) => Number(v)) : [];
  const k = Math.max(0, Number(input?.k) || 0);
  const freq = new Map();
  const heap = [];
  const steps = [
    {
      kind: 'state',
      payload: {
        nums,
        k,
        freq: {},
        heap: [],
      },
      meta: { label: 'init' },
    },
  ];

  nums.forEach((num, index) => {
    freq.set(num, (freq.get(num) || 0) + 1);
    steps.push({
      kind: 'visit',
      payload: {
        nums,
        index,
        num,
        freq: Object.fromEntries(freq.entries()),
        heap: [...heap],
      },
      meta: { label: `count index=${index}` },
    });
  });

  for (const [num, count] of freq.entries()) {
    heap.push({ num, count });
    heap.sort((a, b) => a.count - b.count);
    steps.push({
      kind: 'visit',
      payload: {
        nums,
        k,
        pushed: { num, count },
        freq: Object.fromEntries(freq.entries()),
        heap: heap.map((x) => ({ ...x })),
      },
      meta: { label: `heap push ${num}` },
    });

    if (heap.length > k) {
      const removed = heap.shift();
      steps.push({
        kind: 'state',
        payload: {
          nums,
          k,
          removed,
          freq: Object.fromEntries(freq.entries()),
          heap: heap.map((x) => ({ ...x })),
        },
        meta: { label: `heap pop ${removed.num}` },
      });
    }
  }

  const result = topKFrequent(nums, k);
  steps.push({
    kind: 'state',
    payload: {
      nums,
      k,
      freq: Object.fromEntries(freq.entries()),
      heap: heap.map((x) => ({ ...x })),
      result,
    },
    meta: { label: 'done' },
  });

  return steps;
}

module.exports = {
  buildTopKFrequentSteps,
};
