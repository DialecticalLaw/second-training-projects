import { CarBtnStatus, PageMode } from '../../../interfaces';
import { garage } from '../components/garage/garage';
import {
  createBtn,
  generateBtn,
  raceBtn,
  updateBtn
} from '../components/garage/garage_options/garage_options';
import { nextBtn, prevBtn } from '../components/garage/garage_switch_block/garage_switch_block';
import { selectWinnersBtn } from '../components/header/header';

export function drawGarage(): void {
  const main = document.querySelector('.main');
  if (!main) throw new Error('main is undefined');
  main.append(garage);
}

export function updateButtonState(btnStatus: CarBtnStatus): void {
  if (btnStatus.status) {
    btnStatus.btn.classList.remove('disabled');
  } else btnStatus.btn.classList.add('disabled');
}

export function switchGarageMode(mode: PageMode): void {
  const allRemoveButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll('.garage__car_remove')
  );

  if (mode === PageMode.Race) {
    raceBtn.classList.add('on-race');
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
    raceBtn.classList.remove('on-race');
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

export function toggleBtnDriveValidity(isNeedValid: boolean): void {
  const allRemoveButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll('.garage__car_remove')
  );
  if (isNeedValid) {
    updateBtn.classList.remove('on-drive');
    prevBtn.classList.remove('on-drive');
    nextBtn.classList.remove('on-drive');
    allRemoveButtons.forEach((button: HTMLButtonElement) => {
      button.classList.remove('on-drive');
    });
  } else {
    updateBtn.classList.add('on-drive');
    prevBtn.classList.add('on-drive');
    nextBtn.classList.add('on-drive');
    allRemoveButtons.forEach((button: HTMLButtonElement) => {
      button.classList.add('on-drive');
    });
  }
}
