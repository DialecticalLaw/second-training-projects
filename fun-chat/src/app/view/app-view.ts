import { container } from './components/container/container';

export function drawMainMarkup() {
  const body = document.querySelector('body');
  if (!body) throw new Error('body not found');

  body.append(container);
}
