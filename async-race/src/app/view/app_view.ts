import { container } from './components/container/container';
import { header, selectWinnersBtn } from './components/header/header';
import { loadingWrapper } from './components/garage/loading/loading';
import { main } from './components/main/main';
import { PageMode } from '../../interfaces';
import {
  createBtn,
  generateBtn,
  updateBtn
} from './components/garage/garage_options/garage_options';
import { nextBtn, prevBtn } from './components/garage/garage_switch_block/garage_switch_block';

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

export function switchPageMode(mode: PageMode): void {
  const allRemoveButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll('.garage__car_remove')
  );

  if (mode === PageMode.Race) {
    selectWinnersBtn.classList.add('on-race');
    createBtn.classList.add('on-race');
    updateBtn.classList.add('on-race');
    generateBtn.classList.add('on-race');

    allRemoveButtons.forEach((button: HTMLButtonElement) => {
      button.classList.add('on-race');
    });

    prevBtn.classList.add('on-race');
    nextBtn.classList.add('on-race');
  } else {
    selectWinnersBtn.classList.remove('on-race');
    createBtn.classList.remove('on-race');
    updateBtn.classList.remove('on-race');
    generateBtn.classList.remove('on-race');

    allRemoveButtons.forEach((button: HTMLButtonElement) => {
      button.classList.remove('on-race');
    });

    prevBtn.classList.remove('on-race');
    nextBtn.classList.remove('on-race');
  }
}
