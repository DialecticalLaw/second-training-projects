import { SortType } from '../../../interfaces';
import { timeTh, winsTh } from '../components/winners/winners_table/winners_table';

export function toggleThState(sortType: SortType, order: 'ASC' | 'DESC'): void {
  if (sortType === SortType.Wins) {
    timeTh.classList.remove('selected-sort');
    timeTh.classList.remove('reverse-sort');

    if (order === 'ASC') {
      winsTh.classList.remove('selected-sort');
      winsTh.classList.add('reverse-sort');
    } else {
      winsTh.classList.remove('reverse-sort');
      winsTh.classList.add('selected-sort');
    }
  } else if (sortType === SortType.Time) {
    winsTh.classList.remove('selected-sort');
    winsTh.classList.remove('reverse-sort');

    if (order === 'ASC') {
      timeTh.classList.remove('selected-sort');
      timeTh.classList.add('reverse-sort');
    } else {
      timeTh.classList.remove('reverse-sort');
      timeTh.classList.add('selected-sort');
    }
  }
}
