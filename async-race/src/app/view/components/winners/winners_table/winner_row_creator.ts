import { createElem } from '../../../../utils/create_elem';
import { carIconCreator } from '../../garage/garage_info/car/car';

export function winnerRowCreator(
  color: string,
  name: string,
  wins: number,
  time: number
): HTMLTableRowElement {
  const winnerRow = createElem<HTMLTableRowElement>('tr');

  const numberTd = createElem<HTMLTableCellElement>('td');
  const allTableBodyTr: HTMLTableRowElement[] = Array.from(
    document.querySelectorAll('.winners__table_body tr')
  );
  if (allTableBodyTr.length) {
    numberTd.textContent = `${allTableBodyTr.length + 1}`;
  } else numberTd.textContent = '1';

  const carIconTd = createElem<HTMLTableCellElement>('td');
  const carIcon: HTMLElement = carIconCreator(color, 'winners__car-icon');
  carIconTd.append(carIcon);

  const nameTd = createElem<HTMLTableCellElement>('td');
  nameTd.textContent = name;

  const winsTd = createElem<HTMLTableCellElement>('td');
  winsTd.textContent = wins.toString();

  const timeTd = createElem<HTMLTableCellElement>('td');
  timeTd.textContent = time.toString();

  winnerRow.append(numberTd, carIconTd, nameTd, winsTd, timeTd);
  return winnerRow;
}
