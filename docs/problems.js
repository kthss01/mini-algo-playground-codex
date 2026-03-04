function buildDummySteps(input) {
  const items = Array.isArray(input?.items) ? [...input.items] : [];
  const steps = [
    {
      kind: 'state',
      payload: {
        items,
        pointer: 0,
        visited: [],
      },
      meta: { label: 'init' },
    },
  ];

  const visited = [];

  items.forEach((value, pointer) => {
    visited.push(value);
    steps.push({
      kind: 'visit',
      payload: {
        items,
        pointer,
        visited: [...visited],
      },
      meta: { label: `visit index ${pointer}` },
    });
  });

  const result = {
    sum: items.reduce((acc, value) => acc + Number(value || 0), 0),
    count: items.length,
  };

  steps.push({
    kind: 'state',
    payload: {
      items,
      pointer: items.length - 1,
      visited,
      result,
    },
    meta: { label: 'done' },
  });

  return steps;
}

function buildTwoSumSteps(input) {
  const nums = Array.isArray(input?.nums) ? [...input.nums] : [];
  const target = Number(input?.target ?? 0);
  const seen = new Map();
  const steps = [
    {
      kind: 'state',
      payload: {
        nums,
        target,
        i: null,
        complement: null,
        seen: Object.fromEntries(seen.entries()),
      },
      meta: { label: 'init' },
    },
  ];

  for (let i = 0; i < nums.length; i += 1) {
    const current = Number(nums[i]);
    const complement = target - current;

    steps.push({
      kind: 'compare',
      payload: {
        nums,
        i,
        current,
        complement,
        target,
        seen: Object.fromEntries(seen.entries()),
      },
      meta: { label: `compare i=${i}` },
    });

    if (seen.has(complement)) {
      const pair = [seen.get(complement), i];
      steps.push({
        kind: 'state',
        payload: {
          nums,
          i,
          pair,
          target,
          complement,
          seen: Object.fromEntries(seen.entries()),
        },
        meta: { label: 'done' },
      });
      return steps;
    }

    seen.set(current, i);
    steps.push({
      kind: 'visit',
      payload: {
        nums,
        i,
        inserted: { value: current, index: i },
        target,
        seen: Object.fromEntries(seen.entries()),
      },
      meta: { label: `store i=${i}` },
    });
  }

  steps.push({
    kind: 'state',
    payload: {
      nums,
      target,
      pair: [],
      seen: Object.fromEntries(seen.entries()),
    },
    meta: { label: 'done' },
  });

  return steps;
}

function buildMergeIntervalsSteps(input) {
  const intervals = Array.isArray(input?.intervals)
    ? input.intervals
        .filter((it) => Array.isArray(it) && it.length >= 2)
        .map((it) => [Number(it[0]), Number(it[1])])
    : [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const steps = [
    {
      kind: 'state',
      payload: {
        intervals,
        sorted,
        merged: [],
        index: null,
      },
      meta: { label: 'init' },
    },
  ];

  if (sorted.length === 0) {
    steps.push({
      kind: 'state',
      payload: { intervals, sorted, merged: [] },
      meta: { label: 'done' },
    });
    return steps;
  }

  const merged = [[...sorted[0]]];
  steps.push({
    kind: 'visit',
    payload: { sorted, merged: merged.map((x) => [...x]), index: 0 },
    meta: { label: 'seed first interval' },
  });

  for (let i = 1; i < sorted.length; i += 1) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    steps.push({
      kind: 'compare',
      payload: {
        sorted,
        merged: merged.map((x) => [...x]),
        index: i,
        current,
        last,
      },
      meta: { label: `compare i=${i}` },
    });

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
      steps.push({
        kind: 'state',
        payload: {
          sorted,
          merged: merged.map((x) => [...x]),
          index: i,
          action: 'merge',
        },
        meta: { label: `merge i=${i}` },
      });
    } else {
      merged.push([...current]);
      steps.push({
        kind: 'visit',
        payload: {
          sorted,
          merged: merged.map((x) => [...x]),
          index: i,
          action: 'append',
        },
        meta: { label: `append i=${i}` },
      });
    }
  }

  steps.push({
    kind: 'state',
    payload: {
      sorted,
      merged,
    },
    meta: { label: 'done' },
  });

  return steps;
}


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

  const result = heap
    .slice()
    .sort((a, b) => b.count - a.count)
    .map((item) => item.num);

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

export const problems = [
  {
    id: 'P000',
    title: 'Dummy Walkthrough',
    defaultInput: {
      items: [1, 2, 3],
    },
    rendererType: 'array',
    buildSteps: buildDummySteps,
  },
  {
    id: 'P001',
    title: 'Two Sum',
    defaultInput: {
      nums: [2, 7, 11, 15],
      target: 9,
    },
    rendererType: 'array',
    buildSteps: buildTwoSumSteps,
  },
  {
    id: 'P002',
    title: 'Merge Intervals',
    defaultInput: {
      intervals: [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
    },
    rendererType: 'array',
    buildSteps: buildMergeIntervalsSteps,
  },

  {
    id: 'P003',
    title: 'Top K Frequent',
    defaultInput: {
      nums: [1, 1, 1, 2, 2, 3],
      k: 2,
    },
    rendererType: 'array',
    buildSteps: buildTopKFrequentSteps,
  },
];
