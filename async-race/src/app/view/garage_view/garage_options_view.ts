import { UpdateBtnValidityClass } from '../../../interfaces';
import { updateBtn } from '../components/garage/garage_options/garage_options';

export class GarageOptionsView {
  public static toggleUpdateBtnValidity(
    isNeedValid: boolean,
    className: UpdateBtnValidityClass
  ): void {
    if (className === UpdateBtnValidityClass.Disabled) {
      if (isNeedValid) {
        updateBtn.classList.remove('disabled');
      } else {
        updateBtn.classList.add('disabled');
      }
    } else if (className === UpdateBtnValidityClass.Ondrive) {
      if (isNeedValid) {
        updateBtn.classList.remove('on-drive');
      } else {
        updateBtn.classList.add('on-drive');
      }
    }
  }
}
