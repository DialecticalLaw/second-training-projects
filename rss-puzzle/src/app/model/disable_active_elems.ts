import { ChangeType } from '../../interfaces';
import AppView from '../view/app_view';

export default function disableActiveElems(): void {
  const allSources: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__source_active')
  );
  const allSentencePlaces: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.playarea__sentence-place_active')
  );
  const autoCompleteBtn = document.querySelector('.playarea__auto-complete') as HTMLButtonElement;
  AppView.disableElemsOnTime([autoCompleteBtn], 400);

  allSources.forEach((source: HTMLDivElement): void => {
    AppView.switchComponentDisplay(source, ChangeType.RemoveClass, {
      class: 'playarea__source_active'
    });
  });

  allSentencePlaces.forEach((place: HTMLDivElement): void => {
    AppView.switchComponentDisplay(place, ChangeType.RemoveClass, {
      class: 'playarea__sentence-place_active'
    });
  });
}
