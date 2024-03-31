import { CarBtnStatus, PageMode } from '../../../interfaces';
import { garage } from '../components/garage/garage';
import { garageInfo } from '../components/garage/garage_info/garage_info';
import garageOptions, {
  createBtn,
  generateBtn,
  updateBtn
} from '../components/garage/garage_options/garage_options';
import {
  garagePageSwitchBlock,
  nextBtn,
  prevBtn
} from '../components/garage/garage_switch_block/garage_switch_block';
import { selectWinnersBtn } from '../components/header/header';

export function drawGarage(): void {
  garage.append(garageOptions, garageInfo, garagePageSwitchBlock);

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
