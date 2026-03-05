export function buildLRUSteps(input) {
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

  const snap = () => ({
    size: map.size,
    order: [...order],
    map: Object.fromEntries([...map.entries()].map(([k, v]) => [k, v])),
  });

  const steps = [{ kind: 'state', payload: { capacity, opIndex: null, op: null, output: null, outputs: [], ...snap() }, meta: { label: 'init' } }];

  ops.forEach((op, opIndex) => {
    if (op?.type === 'put') {
      const key = Number(op.key);
      const value = Number(op.value);
      if (map.has(key)) {
        map.set(key, value);
        touch(key);
      } else {
        map.set(key, value);
        touch(key);
        if (map.size > capacity) {
          const removedKey = order.pop();
          map.delete(removedKey);
        }
      }
      steps.push({ kind: 'visit', payload: { capacity, opIndex, op, output: null, outputs: [...outputs], ...snap() }, meta: { label: `put(${op.key}, ${op.value})` } });
      return;
    }

    if (op?.type === 'get') {
      const key = Number(op.key);
      let output = -1;
      if (map.has(key)) {
        output = map.get(key);
        touch(key);
      }
      outputs.push(output);
      steps.push({ kind: 'state', payload: { capacity, opIndex, op, output, outputs: [...outputs], ...snap() }, meta: { label: `get(${op.key}) => ${output}` } });
    }
  });

  steps.push({ kind: 'state', payload: { capacity, opIndex: ops.length, op: null, output: null, outputs: [...outputs], ...snap() }, meta: { label: 'done' } });
  return steps;
}
