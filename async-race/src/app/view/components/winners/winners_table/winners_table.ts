import { createElem } from '../../../../utils/create_elem';
import './winners_table.css';

export const winnersTable = createElem<HTMLTableElement>('table', { class: 'winners__table' });

const tableHead = createElem<HTMLTableSectionElement>('thead', { class: 'winners__table_head' });
const headTr = createElem<HTMLTableRowElement>('tr');

const numberTh = createElem<HTMLTableCellElement>('th');
numberTh.textContent = 'Number';
const carTh = createElem<HTMLTableCellElement>('th');
carTh.textContent = 'Car';
const nameTh = createElem<HTMLTableCellElement>('th');
nameTh.textContent = 'Name';

export const winsTh = createElem<HTMLTableCellElement>('th', { class: 'winners__th_wins' });
winsTh.textContent = 'Wins';
const winsSortIcon = createElem<HTMLDivElement>('div', { class: 'winners__table_sort-icon' });
winsTh.append(winsSortIcon);

export const timeTh = createElem<HTMLTableCellElement>('th', { class: 'winners__th_time' });
timeTh.textContent = 'Best time (seconds)';
const timeSortIcon = createElem<HTMLDivElement>('div', { class: 'winners__table_sort-icon' });
timeTh.append(timeSortIcon);

headTr.append(numberTh, carTh, nameTh, winsTh, timeTh);
tableHead.append(headTr);

export const tableBody = createElem<HTMLTableSectionElement>('tbody', {
  class: 'winners__table_body'
});

winnersTable.append(tableHead, tableBody);
