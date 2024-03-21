import { ChangeType } from '../../interfaces';
import AppView from '../view/app_view';

export default function clearSourcesValidity(): void {
  const allSources: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__source_active')
  );

  allSources.forEach((source: HTMLDivElement): void => {
    AppView.switchComponentDisplay(source, ChangeType.Validity);
  });
}
