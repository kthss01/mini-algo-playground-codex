export function renderArrayState(payload) {
  const wrapper = document.createElement('div');
  const arr = payload.items ?? payload.array ?? [];
  const pointer = payload.pointer;

  const title = document.createElement('p');
  title.textContent = '배열 상태';
  wrapper.appendChild(title);

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';

  arr.forEach((value, idx) => {
    const cell = document.createElement('div');
    cell.textContent = `${idx}:${value}`;
    cell.style.padding = '6px 8px';
    cell.style.border = '1px solid #cbd5e1';
    cell.style.borderRadius = '6px';
    cell.style.background = idx === pointer ? '#dbeafe' : '#f8fafc';
    row.appendChild(cell);
  });

  wrapper.appendChild(row);

  return wrapper;
}
