const { buildDummySteps } = require('../visualizers/p000_dummy.steps');
const { buildTwoSumSteps } = require('../visualizers/p001_two_sum.steps');
const { buildMergeIntervalsSteps } = require('../visualizers/p002_merge_intervals.steps');
const { buildTopKFrequentSteps } = require('../visualizers/p003_top_k_frequent.steps');

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
];

function getProblemById(id) {
  return registry.find((problem) => problem.id === id) || null;
}

module.exports = {
  registry,
  getProblemById,
};
