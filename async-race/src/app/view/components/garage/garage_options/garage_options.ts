import { createElem } from '../../../../utils/create_elem';
import './garage_options.css';

const garageOptions = createElem<HTMLDivElement>('div', { class: 'garage__options-block' });

const createOptions = createElem<HTMLFormElement>('form', { class: 'garage__create-options' });
const createTextInput = createElem<HTMLInputElement>('input', {
  class: 'garage__create_text',
  placeholder: "Car's name",
  type: 'text'
});
const createColorInput = createElem<HTMLInputElement>('input', {
  class: 'garage__create_color',
  type: 'color'
});
const createBtn = createElem<HTMLButtonElement>('button', {
  class: 'garage__btn_create'
});
createBtn.textContent = 'CREATE';
createOptions.append(createTextInput, createColorInput, createBtn);

const updateOptions = createElem<HTMLFormElement>('form', { class: 'garage__update-options' });
const updateTextInput = createElem<HTMLInputElement>('input', {
  class: 'garage__update_text',
  placeholder: "Car's name",
  type: 'text'
});
const updateColorInput = createElem<HTMLInputElement>('input', {
  class: 'garage__update_color',
  type: 'color'
});
const updateBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_update disabled' });
updateBtn.textContent = 'UPDATE';
updateOptions.append(updateTextInput, updateColorInput, updateBtn);

const additionOptions = createElem<HTMLFormElement>('form', { class: 'garage__addition-options' });
const raceBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_race' });
raceBtn.textContent = 'RACE';

const resetBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_reset' });
resetBtn.textContent = 'RESET';

const generateBtn = createElem<HTMLButtonElement>('button', { class: 'garage__btn_generate' });
generateBtn.textContent = 'GENERATE CARS';

additionOptions.append(raceBtn, resetBtn, generateBtn);

garageOptions.append(createOptions, updateOptions, additionOptions);
export default garageOptions;
