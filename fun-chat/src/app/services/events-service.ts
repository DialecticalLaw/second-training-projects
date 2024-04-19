import { Events } from '../../interfaces';

export function dispatch(eventName: Events, detailData?: unknown) {
  document.dispatchEvent(new CustomEvent(eventName, { detail: detailData }));
}
