import createElem from '../../../utils/create_elem';
import './garage.css';
import garageOptions from './garage_options/garage_options';

const garage = createElem<HTMLDivElement>('div', { class: 'garage' });
garage.append(garageOptions);
export default garage;
