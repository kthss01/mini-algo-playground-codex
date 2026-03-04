const registry = [
  {
    id: 'P000',
    title: 'Dummy',
    defaultInput: {
      items: [1, 2, 3],
    },
    rendererType: 'array',
    buildSteps: () => [
      {
        kind: 'state',
        payload: { message: 'dummy init' },
        meta: { label: 'init' },
      },
    ],
  },
];

function getProblemById(id) {
  return registry.find((problem) => problem.id === id) || null;
}

module.exports = {
  registry,
  getProblemById,
};
