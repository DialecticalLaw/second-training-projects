import { HandleAction } from '../interfaces';

export function handleActionRequest(handleType: HandleAction) {
  const event: CustomEvent = new CustomEvent(handleType);
  document.dispatchEvent(event);
}
