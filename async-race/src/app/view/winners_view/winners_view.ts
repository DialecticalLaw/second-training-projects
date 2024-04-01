import { WinnerInfo, Winners } from '../../../interfaces';
import { winners } from '../components/winners/winners';
import {
  winnersCount,
  winnersPageNumber
} from '../components/winners/winners_main_info/winners_main_info';
import { winnerRowCreator } from '../components/winners/winners_table/winner_row_creator';
import { tableBody } from '../components/winners/winners_table/winners_table';

export function drawWinners(): void {
  const main = document.querySelector('.main');
  if (!main) throw new Error('main is undefined');
  main.append(winners);
}

export class WinnersView {
  private winnersTableBody: HTMLTableSectionElement;

  private winnersCount: HTMLSpanElement;

  private winnersPageNumber: HTMLSpanElement;

  constructor() {
    this.winnersTableBody = tableBody;
    this.winnersCount = winnersCount;
    this.winnersPageNumber = winnersPageNumber;
  }

  private drawWinners(winnersInfo: WinnerInfo[]): void {
    winnersInfo.forEach((winner: WinnerInfo) => {
      if (!winner.color || !winner.name || !winner.wins || !winner.time) {
        throw new Error(`winner info options is wrong`);
      }

      const elem: HTMLTableRowElement = winnerRowCreator(
        winner.color,
        winner.name,
        winner.wins,
        winner.time
      );
      this.winnersTableBody.append(elem);
    });
  }

  public updatePage(pageInfo: Winners): void {
    this.winnersTableBody.innerHTML = '';
    this.winnersCount.textContent = pageInfo.total.toString();
    this.winnersPageNumber.textContent = pageInfo.page.toString();
    this.drawWinners(pageInfo.winners);
  }
}
