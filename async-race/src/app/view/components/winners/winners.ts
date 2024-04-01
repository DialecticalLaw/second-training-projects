import './winners.css';
import { createElem } from '../../../utils/create_elem';
import { winnersInfo } from './winners_main_info/winners_main_info';
import { winnersTable } from './winners_table/winners_table';
import { winnersPageSwitchBlock } from './winners_switch_page/winners_switch_block';

export const winners = createElem<HTMLDivElement>('div', { class: 'winners hiding' });
winners.append(winnersInfo, winnersTable, winnersPageSwitchBlock);
