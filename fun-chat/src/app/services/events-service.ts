import { Events, HandleAction } from '../../interfaces';

export function handleActionRequest(handleType: HandleAction) {
  const event: CustomEvent = new CustomEvent(handleType);
  document.dispatchEvent(event);
}

export function dispatch(eventName: Events) {
  document.dispatchEvent(new CustomEvent(eventName));
}
