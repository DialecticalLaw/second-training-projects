import './winners.css';
import { createElem } from '../../../utils/create_elem';
import { winnersInfo } from './winners_main_info/winners_main_info';
import { winnersTable } from './winners_table/winners_table';

export const winners = createElem<HTMLDivElement>('div', { class: 'winners hiding' });
winners.append(winnersInfo, winnersTable);
