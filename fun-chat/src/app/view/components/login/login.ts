import './login.css';
import { createElem } from '../../../utils/create-elem';

export const loginWrapper: HTMLFormElement = createElem('form', {
  class: 'login'
});

const validateHints: HTMLUListElement = createElem('ul', { class: 'login__validate-hints' });

export const hintRequired: HTMLLIElement = createElem('li', {
  class: 'login__validate-hint required-hint'
});
hintRequired.textContent = 'The fields should not be empty';

export const hintCase: HTMLLIElement = createElem('li', {
  class: 'login__validate-hint case-hint'
});
hintCase.textContent = 'The name must begin with an uppercase letter';

export const hintChars: HTMLLIElement = createElem('li', {
  class: 'login__validate-hint chars-hint'
});
hintChars.textContent = 'The name consists only of letters';

validateHints.append(hintRequired, hintCase, hintChars);

export const nameLabel: HTMLLabelElement = createElem('label', { class: 'login__label_name' });
nameLabel.textContent = 'Name';
export const nameInput: HTMLInputElement = createElem('input', {
  class: 'login__input_name',
  type: 'text',
  placeholder: 'Enter the name'
});
nameLabel.append(nameInput);

const passwordLabel: HTMLLabelElement = createElem('label', { class: 'login__label_password' });
passwordLabel.textContent = 'Password';
export const passwordInput: HTMLInputElement = createElem('input', {
  class: 'login__input_password',
  type: 'password',
  placeholder: 'Enter the password'
});
passwordLabel.append(passwordInput);

export const loginBtn: HTMLButtonElement = createElem('button', {
  class: 'login__btn_login button-hover'
});
loginBtn.textContent = 'Login';

loginWrapper.append(validateHints, nameLabel, passwordLabel, loginBtn);
