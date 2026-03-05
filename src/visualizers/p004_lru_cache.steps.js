const { LRUCache } = require('../algorithms/p004_lru_cache');

function buildLRUSteps(input) {
  const capacity = Math.max(1, Number(input?.capacity) || 1);
  const ops = Array.isArray(input?.ops) ? input.ops : [];
  const cache = new LRUCache(capacity);
  const getOutputs = [];

  const steps = [
    {
      kind: 'state',
      payload: {
        capacity,
        opIndex: null,
        op: null,
        output: null,
        outputs: [],
        ...cache.snapshot(),
      },
      meta: { label: 'init' },
    },
  ];

  ops.forEach((op, opIndex) => {
    if (op?.type === 'put') {
      cache.put(Number(op.key), Number(op.value));
      steps.push({
        kind: 'visit',
        payload: {
          capacity,
          opIndex,
          op,
          output: null,
          outputs: [...getOutputs],
          ...cache.snapshot(),
        },
        meta: { label: `put(${op.key}, ${op.value})` },
      });
      return;
    }

    if (op?.type === 'get') {
      const output = cache.get(Number(op.key));
      getOutputs.push(output);
      steps.push({
        kind: 'state',
        payload: {
          capacity,
          opIndex,
          op,
          output,
          outputs: [...getOutputs],
          ...cache.snapshot(),
        },
        meta: { label: `get(${op.key}) => ${output}` },
      });
    }
  });

  steps.push({
    kind: 'state',
    payload: {
      capacity,
      opIndex: ops.length,
      op: null,
      output: null,
      outputs: [...getOutputs],
      ...cache.snapshot(),
    },
    meta: { label: 'done' },
  });

  return steps;
}

module.exports = {
  buildLRUSteps,
};
