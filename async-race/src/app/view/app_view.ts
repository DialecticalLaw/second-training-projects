import { container } from './components/container/container';
import { header } from './components/header/header';
import { loadingWrapper } from './components/loading/loading';
import { main } from './components/main/main';

export function drawMainMarkup(): void {
  const body = document.querySelector('body');
  if (!body) throw new Error('body is undefined');

  body.append(container);
  container.append(loadingWrapper, header, main);
}

export function toggleLoadingProcess(isNeedEnable: boolean): void {
  if (isNeedEnable) {
    loadingWrapper.classList.add('active');
  } else loadingWrapper.classList.remove('active');
}
