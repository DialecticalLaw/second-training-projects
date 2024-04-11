import { container } from './components/container/container';

export function drawMainMarkup() {
  const body = document.querySelector('body');
  if (!body) throw new Error('body not found');

  body.append(container);
}

export function updateElemValidity<T extends HTMLElement>(elem: T, isNeedValid: boolean): void {
  if (isNeedValid) {
    elem.classList.add('valid');
  } else elem.classList.remove('valid');
}

export function hideCurrentView() {
  const containerChildren: Element[] = Array.from(container.children);
  containerChildren.forEach((elem: Element) => {
    if (elem instanceof HTMLElement) {
      const elemLink: HTMLElement = elem;

      if (!elem.classList.contains('info-btn')) {
        elemLink.hidden = true;
        const animationDuration: number = 500;
        setTimeout(() => {
          elem.remove();
        }, animationDuration);
      }
    }
  });
}
