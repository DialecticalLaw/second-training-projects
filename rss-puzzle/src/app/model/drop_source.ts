import { MoveAction } from '../../interfaces';
import AppView from '../view/app_view';
import clearSourcesValidity from './clear_sources_validity';
import { updateButtonsState } from './updateButtons';

export default function dropSource(target: HTMLDivElement, source: HTMLDivElement): void {
  const targetChild: Element | null = target.firstElementChild;
  const sourceParent: HTMLElement | null = source.parentElement;
  if (targetChild instanceof HTMLElement && sourceParent) {
    const copyTargetChild: HTMLElement = targetChild;
    // swapping places
    AppView.moveComponent(source, MoveAction.SetSource, target);
    AppView.moveComponent(copyTargetChild, MoveAction.SetSource, sourceParent);
  } else {
    AppView.moveComponent(source, MoveAction.SetSource, target);
  }
  clearSourcesValidity();
  updateButtonsState();
}
