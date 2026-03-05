import { buildDummySteps } from './problemBuilders/p000.js';
import { buildTwoSumSteps } from './problemBuilders/p001.js';
import { buildMergeIntervalsSteps } from './problemBuilders/p002.js';
import { buildTopKFrequentSteps } from './problemBuilders/p003.js';
import { buildLRUSteps } from './problemBuilders/p004.js';

const twoSumTemplate = `function twoSum(nums, target) {
  // TODO: twoSum을 구현하세요.
  // 예: [2, 7, 11, 15], target=9 -> [0, 1]
  return [];
}

function solve(input) {
  const nums = Array.isArray(input?.nums) ? input.nums : [];
  const target = Number(input?.target ?? 0);
  return twoSum(nums, target);
}`;

const mergeIntervalsTemplate = `function mergeIntervals(intervals) {
  // TODO: mergeIntervals를 구현하세요.
  // 예: [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]
  return [];
}

function solve(input) {
  const intervals = Array.isArray(input?.intervals)
    ? input.intervals.map((x) => [...x])
    : [];
  return mergeIntervals(intervals);
}`;

const topKTemplate = `function topKFrequent(nums, k) {
  // TODO: topKFrequent를 구현하세요.
  // 예: [1,1,1,2,2,3], k=2 -> [1,2]
  return [];
}

function solve(input) {
  const nums = Array.isArray(input?.nums) ? input.nums : [];
  const k = Math.max(0, Number(input?.k) || 0);
  return topKFrequent(nums, k);
}`;

const lruTemplate = `class LRUCache {
  constructor(capacity) {
    // TODO: capacity를 저장하고 필요한 자료구조를 초기화하세요.
  }

  get(key) {
    // TODO: 값을 반환하고 최근 사용 상태를 갱신하세요. 없으면 -1 반환.
    return -1;
  }

  put(key, value) {
    // TODO: 값을 저장하고 capacity를 넘기면 가장 오래된 항목을 제거하세요.
  }
}

function runLRUScenario(capacity, ops) {
  // TODO: ops를 순회하면서 get 결과만 배열에 담아 반환하세요.
  return [];
}

function solve(input) {
  const capacity = Math.max(1, Number(input?.capacity) || 1);
  const ops = Array.isArray(input?.ops) ? input.ops : [];
  return runLRUScenario(capacity, ops);
}`;

export const problems = [
  {
    id: 'P000',
    title: 'Dummy Walkthrough',
    defaultInput: { items: [1, 2, 3] },
    rendererType: 'array',
    buildSteps: buildDummySteps,
    codeTemplate: `function solveDummy(items) {
  // TODO: items의 합계(sum)와 개수(count)를 반환하세요.
  return { sum: 0, count: 0 };
}

function solve(input) {
  const items = Array.isArray(input?.items) ? input.items : [];
  return solveDummy(items);
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
