import { MoveAction } from '../../interfaces';
import AppView from '../view/app_view';
import clearSourcesValidity from './clear_sources_validity';
import resizeSources from './resize_sources';
import { updateButtonsState } from './updateButtons';

export default function makeSourceReaction(event: MouseEvent): void {
  const eventTarget = event.currentTarget as HTMLDivElement | null;
  const actionBtn: HTMLButtonElement | null = document.querySelector('.playarea__action-button');

  if (!eventTarget || !actionBtn) return;

  AppView.moveComponent(eventTarget, MoveAction.MoveSource);
  clearSourcesValidity();
  updateButtonsState();
  resizeSources();
}
