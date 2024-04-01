import { createElem } from '../../../../utils/create_elem';
import { carIconCreator } from '../../garage/garage_info/car/car';
import { winnersPageNumber } from '../winners_main_info/winners_main_info';

function getTdNumber(): number {
  let pastPagesCount: number = Number(winnersPageNumber.textContent) - 1;
  if (pastPagesCount < 0) pastPagesCount = 0;
  const winnersPerPage: number = 10;

  const allTableBodyTr: HTMLTableRowElement[] = Array.from(
    document.querySelectorAll('.winners__table_body tr')
  );

  let serialNumber: number;
  if (allTableBodyTr.length) {
    serialNumber = allTableBodyTr.length + 1;
  } else serialNumber = 1;

  return pastPagesCount * winnersPerPage + serialNumber;
}

export function winnerRowCreator(
  color: string,
  name: string,
  wins: number,
  time: number
): HTMLTableRowElement {
  const winnerRow = createElem<HTMLTableRowElement>('tr');

  const numberTd = createElem<HTMLTableCellElement>('td');
  numberTd.textContent = getTdNumber().toString();

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
