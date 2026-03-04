import { renderArrayState } from './arrayRenderer.js';
import { renderMapListState } from './mapListRenderer.js';

export function renderStepState(container, step) {
  container.innerHTML = '';

  if (!step) {
    container.textContent = '표시할 step이 없습니다.';
    return;
  }

  const kindBadge = document.createElement('span');
  kindBadge.className = 'badge';
  kindBadge.textContent = `kind: ${step.kind}`;
  container.appendChild(kindBadge);

  const labelBadge = document.createElement('span');
  labelBadge.className = 'badge';
  labelBadge.textContent = `label: ${step.meta?.label ?? '-'}`;
  container.appendChild(labelBadge);

  const payload = step.payload || {};
  const hasArray = Array.isArray(payload.items) || Array.isArray(payload.array);
  const hasMapList = payload.map || payload.list;

  if (hasArray) {
    container.appendChild(renderArrayState(payload));
  } else if (hasMapList) {
    container.appendChild(renderMapListState(payload));
  } else {
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(payload, null, 2);
    container.appendChild(pre);
  }
}
