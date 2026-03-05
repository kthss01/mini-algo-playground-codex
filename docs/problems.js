import { buildDummySteps } from './problemBuilders/p000.js';
import { buildTwoSumSteps } from './problemBuilders/p001.js';
import { buildMergeIntervalsSteps } from './problemBuilders/p002.js';
import { buildTopKFrequentSteps } from './problemBuilders/p003.js';
import { buildLRUSteps } from './problemBuilders/p004.js';

export const problems = [
  {
    id: 'P000',
    title: 'Dummy Walkthrough',
    defaultInput: { items: [1, 2, 3] },
    rendererType: 'array',
    buildSteps: buildDummySteps,
  },
  {
    id: 'P001',
    title: 'Two Sum',
    defaultInput: { nums: [2, 7, 11, 15], target: 9 },
    rendererType: 'array',
    buildSteps: buildTwoSumSteps,
  },
  {
    id: 'P002',
    title: 'Merge Intervals',
    defaultInput: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
    rendererType: 'array',
    buildSteps: buildMergeIntervalsSteps,
  },
  {
    id: 'P003',
    title: 'Top K Frequent',
    defaultInput: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
    rendererType: 'array',
    buildSteps: buildTopKFrequentSteps,
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
  },
];
