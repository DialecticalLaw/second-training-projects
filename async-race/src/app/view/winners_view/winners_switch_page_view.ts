import {
  nextWinnersBtn,
  prevWinnersBtn
} from '../components/winners/winners_switch_page/winners_switch_block';

export class WinnersPageSwitchView {
  private prevWinnersBtn: HTMLButtonElement;

  private nextWinnersBtn: HTMLButtonElement;

  constructor() {
    this.prevWinnersBtn = prevWinnersBtn;
    this.nextWinnersBtn = nextWinnersBtn;
  }

  public updateButtonsState(prevBtnState: boolean, nextBtnState: boolean): void {
    if (prevBtnState) {
      this.prevWinnersBtn.classList.remove('disabled');
    } else this.prevWinnersBtn.classList.add('disabled');

    if (nextBtnState) {
      this.nextWinnersBtn.classList.remove('disabled');
    } else this.nextWinnersBtn.classList.add('disabled');
  }
}
