export function renderMapListState(payload) {
  const wrapper = document.createElement('div');
  const pre = document.createElement('pre');

  pre.textContent = JSON.stringify(
    {
      map: payload.map ?? null,
      list: payload.list ?? null,
    },
    null,
    2
  );

  wrapper.appendChild(pre);
  return wrapper;
}
