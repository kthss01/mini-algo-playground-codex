const { solveDummy } = require('../algorithms/p000_dummy');

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

  const result = solveDummy({ items });

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

module.exports = {
  buildDummySteps,
};
