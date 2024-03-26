import { nextBtn, prevBtn } from '../components/garage/garage_switch_block/garage_switch_block';

export class GaragePageSwitchView {
  private prevBtn: HTMLButtonElement;

  private nextBtn: HTMLButtonElement;

  constructor() {
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
  }

  public updateButtonsState(prevBtnState: boolean, nextBtnState: boolean): void {
    if (prevBtnState) {
      this.prevBtn.classList.remove('disabled');
    } else this.prevBtn.classList.add('disabled');

    if (nextBtnState) {
      this.nextBtn.classList.remove('disabled');
    } else this.nextBtn.classList.add('disabled');
  }
}
