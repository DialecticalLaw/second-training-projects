import { container } from './components/container/container';
import { header } from './components/header/header';
import { main } from './components/main/main';

export function drawMainMarkup(): void {
  const body = document.querySelector('body');
  if (!body) throw new Error('body is undefined');

  body.append(container);
  container.append(header, main);
}
