import { SWITCH_VIEW_ANIMATION_DURATION } from '../..';
import { container } from './components/container/container';
import { waitingWindow } from './components/waiting-window/waiting-window';

export function drawMainMarkup(): void {
  const body = document.querySelector('body');
  if (!body) throw new Error('body not found');

  body.append(container);
}

export function updateElemValidity<T extends HTMLElement>(elem: T, isNeedValid: boolean): void {
  if (isNeedValid) {
    elem.classList.add('valid');
  } else elem.classList.remove('valid');
}

export function hideCurrentView(): void {
  const containerChildren: Element[] = Array.from(container.children);
  containerChildren.forEach((elem: Element) => {
    if (elem instanceof HTMLElement) {
      const elemLink: HTMLElement = elem;

      if (!elem.classList.contains('info-btn') && !elem.classList.contains('waiting-window')) {
        elemLink.hidden = true;
        setTimeout(() => {
          elemLink.remove();
        }, SWITCH_VIEW_ANIMATION_DURATION);
      }
    }
  });
}

export function toggleWaitingConnectWindow(isNeedShow: boolean): void {
  if (isNeedShow) {
    container.prepend(waitingWindow);
  } else waitingWindow.remove();
}
