import { Car } from '../../../../../../interfaces';
import { createElem } from '../../../../../utils/create_elem';
import './car.css';

const carSvgText: string = `<svg class="garage__car_icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="m259.716 159.8a35.28 35.28 0 0 1 20.765 6.314l59.8 40.031-119.34.031-44.1-46.09c2.656-.191 5.373-.286 8.171-.286zm-115.852 8.448-37.728 16.152 11.4 11.925a30.511 30.511 0 0 0 23.115 9.872h.01l56.661-.02-40.691-42.527a107.487 107.487 0 0 0 -12.769 4.6zm-40.5 183.952a42.026 42.026 0 1 1 42.024-42.023 42.074 42.074 0 0 1 -42.024 42.023zm305.277 0a42.026 42.026 0 1 1 42.029-42.023 42.08 42.08 0 0 1 -42.029 42.023zm93.764-44.2a9.61 9.61 0 0 0 9.6-9.6v-38.815h-8.478a8.532 8.532 0 0 1 -1.555-16.922c-42.23-19.451-85.859-19.451-132.044-19.451l-229.26.055h-.01a48 48 0 0 1 -35.447-15.15l-15.83-16.544-19.849 8.5a53.287 53.287 0 0 1 -15.392 4.106l-46.573 5.442a8.594 8.594 0 0 1 -3.167-.221l-4.4-1.168v20.208h7.844a8.533 8.533 0 0 1 0 17.066h-7.844v17.224a37.385 37.385 0 0 0 16.8 31.754c1.524 1.036 3 2.063 4.417 3.064 8.342 5.832 14.059 9.822 23.105 10.376a59.082 59.082 0 0 1 118.083.076h187.2a59.072 59.072 0 0 1 1.681-12.051h-138.716a8.531 8.531 0 0 1 -6.169-2.636l-23.88-24.957a8.532 8.532 0 1 1 12.327-11.8l21.37 22.325h33.339l-10.078-10.526a8.534 8.534 0 1 1 12.332-11.8l20.695 21.621a7.394 7.394 0 0 1 .594.7h85.451a59.061 59.061 0 0 1 109.131 29.124zm-85.22 2.179a8.531 8.531 0 0 0 -8.529-8.534h-.025a8.534 8.534 0 1 0 8.554 8.534zm-305.278 0a8.531 8.531 0 0 0 -8.533-8.534h-.02a8.534 8.534 0 1 0 8.553 8.534z" fill-rule="evenodd"/>
</svg>`;

export function carCardCreator(options: Car): HTMLDivElement {
  if (!options.id || options.name === undefined || !options.color)
    throw new Error('options is undefined');
  const wrapper = createElem<HTMLDivElement>('div', {
    class: 'garage__car_card',
    id: options.id.toString()
  });

  const carOptions = createElem<HTMLFormElement>('form', { class: 'garage__car_options' });
  const selectBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_select' });
  selectBtn.textContent = 'SELECT';
  const removeBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_remove' });
  removeBtn.textContent = 'REMOVE';
  const carName = createElem<HTMLParagraphElement>('p', { class: 'garage__car_name' });
  carName.textContent = options.name;
  carOptions.append(selectBtn, removeBtn, carName);

  const carActions = createElem<HTMLFormElement>('form', { class: 'garage__car_actions' });
  const gasBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_gas' });
  gasBtn.textContent = 'A';
  const brakeBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_brake disabled' });
  brakeBtn.textContent = 'B';
  carActions.append(gasBtn, brakeBtn);
  carActions.insertAdjacentHTML('beforeend', carSvgText);
  const carIcon = carActions.lastElementChild as HTMLElement;
  carIcon.setAttribute('fill', options.color);
  const flag = createElem<HTMLDivElement>('div', {
    class: 'garage__car_flag'
  });
  carActions.append(flag);

  wrapper.append(carOptions, carActions);
  return wrapper;
}
