import { Car } from '../../../../../../interfaces';
import { createElem } from '../../../../../utils/create_elem';
import './car.css';

const carSvgText: string = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="garage__car_icon">
  <defs>
  <filter height="200%" width="200%" x="-50%" y="-50%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="2.3"/>
  </filter>
  <filter height="200%" width="200%" x="-50%" y="-50%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="2.3"/>
  </filter>
  </defs>
  <g class="layer">
  <rect fill="transparent" height="402" width="582" x="-1" y="-1"/>
  <g display="none">
    <rect fill="url(#gridpattern)" height="100%" stroke-width="0" width="100%" x="0" y="0"/>
  </g>
  </g>
  <g class="layer">
    <g>
    <path d="m258.54,88.34a32.39,34.44 0 0 1 18.99,6.2l55.04,39.05l-109.65,0l-40.67,-44.95c2.58,-0.28 5.02,-0.28 7.6,-0.28l68.72,0l-0.03,-0.03zm-106.53,8.21l-34.69,15.86l10.43,11.66a28.06,29.84 0 0 0 21.28,9.5l0,0l52.03,0l-37.41,-41.5a98.79,105.05 0 0 0 -11.65,4.48l0,0zm-37.27,179.84a38.63,41.06 0 1 1 38.63,-41.06a38.63,41.06 0 0 1 -38.63,41.06zm280.54,0a38.63,41.06 0 1 1 38.77,-41.06a38.63,41.06 0 0 1 -38.77,41.06zm86.21,-43.22a8.81,9.37 0 0 0 8.81,-9.37l0,-37.89l-7.74,0a7.85,8.37 0 0 1 -1.5,-16.58c-38.77,-19.02 -78.87,-19.02 -121.29,-19.02l-210.76,0l0,0a44.18,46.98 0 0 1 -32.53,-14.7l-14.62,-16.29l-18.17,8.37a48.91,52.03 0 0 1 -14.23,4.04l-42.68,5.33a7.85,8.37 0 0 1 -2.98,-0.28l-4.05,-1.16l0,19.74l7.17,0a7.85,8.37 0 0 1 0,16.71l-7.17,0l0,16.86a34.43,36.61 0 0 0 15.45,30.97c1.36,1 2.72,2.01 4.05,3.04c7.74,5.77 12.87,9.65 21.28,10.09a54.36,57.79 0 0 1 108.57,0.15l171.99,0a54.36,57.79 0 0 1 1.62,-11.82l-127.53,0a7.85,8.37 0 0 1 -5.7,-2.6l-21.96,-24.35a7.85,8.37 0 1 1 11.39,-11.53l19.64,21.75l30.64,0l-9.35,-10.22a7.85,8.37 0 1 1 11.39,-11.53l18.99,21.19a6.77,7.21 0 0 1 0.54,0.57l78.61,0a54.36,57.79 0 0 1 100.29,28.52l31.85,0l-0.03,0.03zm-78.33,2.16a7.85,8.37 0 0 0 -7.74,-8.37l-0.14,0a7.85,8.37 0 1 0 7.85,8.37l0.03,0zm-280.54,0a7.85,8.37 0 0 0 -7.85,-8.37l0,0a7.85,8.37 0 1 0 7.85,8.37z" fill-rule="evenodd"/>
    <ellipse cx="4552.26" cy="3018.49" fill="#ffff26" filter="url(#svg_5_blur)" rx="8.93" ry="8.98" stroke="#CE7975" stroke-width="1.5" transform="matrix(2.35494 0.396558 -0.183531 1.232 -9682.42 -5345.96)"/>
    <ellipse cx="4082.81" cy="3009.81" fill="#ff6660" filter="url(#svg_6_blur)" rx="8.52" ry="9.02" stroke="#000" stroke-width="1.5" transform="matrix(1.67238 0 0 1.20289 -6801.65 -3456.24)"/>
    </g>
    </g>
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
  selectBtn.innerHTML = '<span>SELECT</span>';
  const removeBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_remove' });
  removeBtn.innerHTML = '<span>REMOVE</span>';
  const carName = createElem<HTMLParagraphElement>('p', { class: 'garage__car_name' });
  carName.textContent = options.name;
  carOptions.append(selectBtn, removeBtn, carName);

  const carActions = createElem<HTMLFormElement>('form', { class: 'garage__car_actions' });
  const gasBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_gas' });
  gasBtn.innerHTML = '<span>A</span>';
  const brakeBtn = createElem<HTMLButtonElement>('button', { class: 'garage__car_brake disabled' });
  brakeBtn.innerHTML = '<span>B</span>';
  carActions.append(gasBtn, brakeBtn);
  carActions.insertAdjacentHTML('beforeend', carSvgText);
  const carIcon = carActions.lastElementChild as Element;
  carIcon.setAttribute('fill', options.color);
  const flag = createElem<HTMLDivElement>('div', {
    class: 'garage__car_flag'
  });
  carActions.append(flag);

  wrapper.append(carOptions, carActions);
  return wrapper;
}
