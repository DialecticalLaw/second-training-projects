import { Events } from '../../interfaces';

export function dispatch(eventName: Events, detailData?: { [key: string]: string | null }) {
  document.dispatchEvent(new CustomEvent(eventName, { detail: detailData }));
}
