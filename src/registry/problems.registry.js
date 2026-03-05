const { buildDummySteps } = require('../visualizers/p000_dummy.steps');
const { buildTwoSumSteps } = require('../visualizers/p001_two_sum.steps');
const { buildMergeIntervalsSteps } = require('../visualizers/p002_merge_intervals.steps');
const { buildTopKFrequentSteps } = require('../visualizers/p003_top_k_frequent.steps');
const { buildLRUSteps } = require('../visualizers/p004_lru_cache.steps');

const registry = [
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

function getProblemById(id) {
  return registry.find((problem) => problem.id === id) || null;
}

module.exports = {
  registry,
  getProblemById,
};
