export function renderArrayState(payload) {
  const wrapper = document.createElement('div');
  const arr =
    payload.items ??
    payload.array ??
    payload.nums ??
    payload.sorted ??
    payload.intervals ??
    [];
  const pointer = payload.pointer;
  const i = payload.i ?? payload.index;
  const pair = Array.isArray(payload.pair) ? payload.pair : [];

  const title = document.createElement('p');
  title.textContent = '배열 상태';
  wrapper.appendChild(title);

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.flexWrap = 'wrap';

  arr.forEach((value, idx) => {
    const cell = document.createElement('div');
    cell.textContent = Array.isArray(value) ? `${idx}:[${value[0]},${value[1]}]` : `${idx}:${value}`;
    cell.style.padding = '6px 8px';
    cell.style.border = '1px solid #cbd5e1';
    cell.style.borderRadius = '6px';

    if (pair.includes(idx)) {
      cell.style.background = '#dcfce7';
    } else if (idx === i || idx === pointer) {
      cell.style.background = '#dbeafe';
    } else {
      cell.style.background = '#f8fafc';
    }

    row.appendChild(cell);
  });

  wrapper.appendChild(row);

  if (Array.isArray(payload.merged)) {
    const mergedText = document.createElement('pre');
    mergedText.textContent = `merged: ${JSON.stringify(payload.merged)}`;
    wrapper.appendChild(mergedText);
  }

  return wrapper;
}
