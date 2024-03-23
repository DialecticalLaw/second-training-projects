import { createElem } from '../../../utils/create_elem';
import './garage.css';
import { garageInfo } from './garage_info/garage_info';
import garageOptions from './garage_options/garage_options';
import { garagePageSwitchBlock } from './garage_switch_block/garage_switch_block';

export const garage = createElem<HTMLDivElement>('div', { class: 'garage' });
garage.append(garageOptions, garageInfo, garagePageSwitchBlock);
