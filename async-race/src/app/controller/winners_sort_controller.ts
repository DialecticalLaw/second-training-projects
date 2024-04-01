import { SortType, UpdateCurrentPage, ViewType } from '../../interfaces';
import { timeTh, winsTh } from '../view/components/winners/winners_table/winners_table';
import { toggleThState } from '../view/winners_view/winners_th_view';

export class WinnersSortController {
  winsTh: HTMLTableCellElement;

  timeTh: HTMLTableCellElement;

  constructor() {
    this.winsTh = winsTh;
    this.timeTh = timeTh;
  }

  public handleSortRequest(updateCurrentPage: UpdateCurrentPage): void {
    this.winsTh.addEventListener('click', this.sortByWins.bind(this, updateCurrentPage));
    this.timeTh.addEventListener('click', this.sortByTime.bind(this, updateCurrentPage));
  }

  private async sortByWins(updateCurrentPage: UpdateCurrentPage): Promise<void> {
    const isAlreadySelected: boolean = this.winsTh.classList.contains('selected-sort');
    if (isAlreadySelected) {
      toggleThState(SortType.Wins, 'ASC');
      await updateCurrentPage(ViewType.Winners, { limit: 10, order: 'ASC', sort: SortType.Wins });
    } else {
      toggleThState(SortType.Wins, 'DESC');
      await updateCurrentPage(ViewType.Winners, { limit: 10, order: 'DESC', sort: SortType.Wins });
    }
  }

  private async sortByTime(updateCurrentPage: UpdateCurrentPage): Promise<void> {
    const isAlreadySelected: boolean = this.timeTh.classList.contains('selected-sort');
    if (isAlreadySelected) {
      toggleThState(SortType.Time, 'ASC');
      await updateCurrentPage(ViewType.Winners, { limit: 10, order: 'ASC', sort: SortType.Time });
    } else {
      toggleThState(SortType.Time, 'DESC');
      await updateCurrentPage(ViewType.Winners, { limit: 10, order: 'DESC', sort: SortType.Time });
    }
  }
}
