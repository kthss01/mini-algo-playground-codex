export function renderMapListState(payload) {
  const wrapper = document.createElement('div');
  const title = document.createElement('p');
  title.textContent = '맵/리스트 상태';
  wrapper.appendChild(title);

  const pre = document.createElement('pre');

  pre.textContent = JSON.stringify(
    {
      map: payload.map ?? null,
      list: payload.list ?? null,
      order: payload.order ?? null,
      size: payload.size ?? null,
      seen: payload.seen ?? null,
      freq: payload.freq ?? null,
      heap: payload.heap ?? null,
      pushed: payload.pushed ?? null,
      removed: payload.removed ?? null,
      inserted: payload.inserted ?? null,
      target: payload.target ?? null,
      complement: payload.complement ?? null,
      pair: payload.pair ?? null,
      k: payload.k ?? null,
      result: payload.result ?? null,
      op: payload.op ?? null,
      output: payload.output ?? null,
      outputs: payload.outputs ?? null,
      capacity: payload.capacity ?? null,
    },
    null,
    2
  );

  wrapper.appendChild(pre);
  return wrapper;
}
