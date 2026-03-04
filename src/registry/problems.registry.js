const { buildDummySteps } = require('../visualizers/p000_dummy.steps');
const { buildTwoSumSteps } = require('../visualizers/p001_two_sum.steps');

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
];

function getProblemById(id) {
  return registry.find((problem) => problem.id === id) || null;
}

module.exports = {
  registry,
  getProblemById,
};
