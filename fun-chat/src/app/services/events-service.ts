import { Events, LooseStringObject } from '../../interfaces';

export function dispatch(eventName: Events, detailData?: LooseStringObject) {
  document.dispatchEvent(new CustomEvent(eventName, { detail: detailData }));
}
