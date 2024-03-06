export default function appendElem<
  T extends HTMLElement = HTMLElement,
  E extends HTMLElement = HTMLElement
>(target: T, elemsToAppend: E[]): void {
  elemsToAppend.forEach((elem: E) => target.insertAdjacentElement('beforeend', elem));
}
