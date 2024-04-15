import { EventDetail, Events } from '../../interfaces';

export function dispatch(eventName: Events, detailData?: EventDetail) {
  document.dispatchEvent(new CustomEvent(eventName, { detail: detailData }));
}
