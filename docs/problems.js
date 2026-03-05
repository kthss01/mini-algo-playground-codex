import { buildDummySteps } from './problemBuilders/p000.js';
import { buildTwoSumSteps } from './problemBuilders/p001.js';
import { buildMergeIntervalsSteps } from './problemBuilders/p002.js';
import { buildTopKFrequentSteps } from './problemBuilders/p003.js';
import { buildLRUSteps } from './problemBuilders/p004.js';

const twoSumTemplate = `function solve(input) {
  const nums = Array.isArray(input?.nums) ? input.nums : [];
  const target = Number(input?.target ?? 0);
  const seen = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    const current = Number(nums[i]);
    const complement = target - current;
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(current, i);
  }

  return [];
}`;

const mergeIntervalsTemplate = `function solve(input) {
  const intervals = Array.isArray(input?.intervals) ? input.intervals.map((x) => [...x]) : [];
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [[...intervals[0]]];

  for (let i = 1; i < intervals.length; i += 1) {
    const current = intervals[i];
    const last = merged[merged.length - 1];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push([...current]);
    }
  }

  return merged;
}`;

const topKTemplate = `function solve(input) {
  const nums = Array.isArray(input?.nums) ? input.nums : [];
  const k = Math.max(0, Number(input?.k) || 0);
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => Number(num));
}`;

const lruTemplate = `function solve(input) {
  const capacity = Math.max(1, Number(input?.capacity) || 1);
  const ops = Array.isArray(input?.ops) ? input.ops : [];
  const map = new Map();
  const order = [];
  const outputs = [];

  function touch(key) {
    const idx = order.indexOf(key);
    if (idx >= 0) order.splice(idx, 1);
    order.unshift(key);
  }

  for (const op of ops) {
    if (op?.type === 'put') {
      const key = Number(op.key);
      const value = Number(op.value);
      map.set(key, value);
      touch(key);
      if (map.size > capacity) {
        const removed = order.pop();
        map.delete(removed);
      }
    }

    if (op?.type === 'get') {
      const key = Number(op.key);
      if (map.has(key)) {
        const value = map.get(key);
        touch(key);
        outputs.push(value);
      } else {
        outputs.push(-1);
      }
    }
  }

  return outputs;
}`;

export const problems = [
  {
    id: 'P000',
    title: 'Dummy Walkthrough',
    defaultInput: { items: [1, 2, 3] },
    rendererType: 'array',
    buildSteps: buildDummySteps,
    codeTemplate: `function solve(input) {
  const items = Array.isArray(input?.items) ? input.items : [];
  return {
    sum: items.reduce((acc, value) => acc + Number(value || 0), 0),
    count: items.length,
  };
}`,
  },
  {
    id: 'P001',
    title: 'Two Sum',
    defaultInput: { nums: [2, 7, 11, 15], target: 9 },
    rendererType: 'array',
    buildSteps: buildTwoSumSteps,
    codeTemplate: twoSumTemplate,
  },
  {
    id: 'P002',
    title: 'Merge Intervals',
    defaultInput: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
    rendererType: 'array',
    buildSteps: buildMergeIntervalsSteps,
    codeTemplate: mergeIntervalsTemplate,
  },
  {
    id: 'P003',
    title: 'Top K Frequent',
    defaultInput: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
    rendererType: 'array',
    buildSteps: buildTopKFrequentSteps,
    codeTemplate: topKTemplate,
  },
  {
    id: 'P004',
    title: 'LRU Cache',
    defaultInput: {
      capacity: 2,
      ops: [
        { type: 'put', key: 1, value: 1 },
        { type: 'put', key: 2, value: 2 },
        { type: 'get', key: 1 },
        { type: 'put', key: 3, value: 3 },
        { type: 'get', key: 2 },
      ],
    },
    rendererType: 'array',
    buildSteps: buildLRUSteps,
    codeTemplate: lruTemplate,
  },
];
