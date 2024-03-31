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
const winsTh = createElem<HTMLTableCellElement>('th');
winsTh.textContent = 'Wins';
const timeTh = createElem<HTMLTableCellElement>('th');
timeTh.textContent = 'Best time (seconds)';

headTr.append(numberTh, carTh, nameTh, winsTh, timeTh);
tableHead.append(headTr);

export const tableBody = createElem<HTMLTableSectionElement>('tbody', {
  class: 'winners__table_body'
});

winnersTable.append(tableHead, tableBody);
