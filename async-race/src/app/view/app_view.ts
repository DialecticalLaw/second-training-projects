import { container } from './components/container/container';
import { header, selectGarageBtn, selectWinnersBtn } from './components/header/header';
import { loadingWrapper } from './components/garage/loading/loading';
import { main } from './components/main/main';
import { ViewType } from '../../interfaces';
import { garage } from './components/garage/garage';
import { winners } from './components/winners/winners';

export function drawMainMarkup(): void {
  const body = document.querySelector('body');
  if (!body) throw new Error('body is undefined');

  body.append(container);
  container.append(loadingWrapper, header, main);
}

export function toggleLoadingProcess(isNeedEnable: boolean): void {
  if (isNeedEnable) {
    loadingWrapper.classList.add('active');
  } else loadingWrapper.classList.remove('active');
}

export function switchPageView(view: ViewType): void {
  if (view === ViewType.Garage) {
    selectGarageBtn.classList.add('disabled');
    selectWinnersBtn.classList.remove('disabled');
    garage.classList.remove('hiding');
    winners.classList.add('hiding');
  } else {
    selectWinnersBtn.classList.add('disabled');
    selectGarageBtn.classList.remove('disabled');
    garage.classList.add('hiding');
    winners.classList.remove('hiding');
  }
}
