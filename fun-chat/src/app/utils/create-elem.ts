import { LooseStringObject } from '../../interfaces';

export function createElem<T extends HTMLElement>(tag: string, attributes?: LooseStringObject): T {
  const elem = document.createElement(tag) as T;
  if (attributes) {
    Object.keys(attributes).forEach((attribute: string) => {
      const value: string = attributes[attribute];
      elem.setAttribute(attribute, value);
    });
  }
  return elem;
}
