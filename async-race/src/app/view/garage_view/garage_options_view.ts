import { updateBtn } from '../components/garage/garage_options/garage_options';

export class GarageOptionsView {
  private updateBtn: HTMLButtonElement;

  constructor() {
    this.updateBtn = updateBtn;
  }

  public toggleUpdateBtnValidity(isNeedValid: boolean): void {
    if (isNeedValid) {
      this.updateBtn.classList.remove('disabled');
    } else {
      this.updateBtn.classList.add('disabled');
    }
  }
}
