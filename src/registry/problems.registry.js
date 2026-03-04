const { buildDummySteps } = require('../visualizers/p000_dummy.steps');

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
];

function getProblemById(id) {
  return registry.find((problem) => problem.id === id) || null;
}

module.exports = {
  registry,
  getProblemById,
};
