import { CarBtnStatus } from '../../../interfaces';
import { garage } from '../components/garage/garage';
import { garageInfo } from '../components/garage/garage_info/garage_info';
import garageOptions from '../components/garage/garage_options/garage_options';
import { garagePageSwitchBlock } from '../components/garage/garage_switch_block/garage_switch_block';

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
