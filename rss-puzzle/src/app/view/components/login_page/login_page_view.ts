import './login_page_style.css';
import appendElem from '../../../utils/appendElem';
import createElem from '../../../utils/create_elem';
export default class LoginPageView {
  public static draw(): void {
    this.drawWrappers();
    this.drawFormElems();
  }

  private static drawWrappers(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    const loginForm: HTMLFormElement = createElem<HTMLFormElement>('form', {
      class: 'login-form',
      autocomplete: 'off'
    });
    if (main) appendElem(main, [loginForm]);
    const nameWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'login-form__name-wrapper'
    });
    const surnameWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'login-form__surname-wrapper'
    });
    appendElem(loginForm, [nameWrapper, surnameWrapper]);
  }

  private static drawFormElems(): void {
    const [nameInput, surnameInput]: HTMLInputElement[] = this.createLoginInputs();
    const [nameLabel, surnameLabel]: HTMLLabelElement[] = this.createLoginLabels();
    const formBtn: HTMLButtonElement = createElem<HTMLButtonElement>('button', {
      class: 'login-form__button'
    });
    formBtn.textContent = 'Login';

    const loginForm = document.querySelector('.login-form') as HTMLFormElement;
    const nameWrapper = document.querySelector('.login-form__name-wrapper') as HTMLDivElement;
    const surnameWrapper = document.querySelector('.login-form__surname-wrapper') as HTMLDivElement;
    appendElem(nameWrapper, [nameInput, nameLabel]);
    appendElem(surnameWrapper, [surnameInput, surnameLabel]);
    appendElem(loginForm, [formBtn]);
  }

  private static createLoginInputs(): HTMLInputElement[] {
    const nameInput: HTMLInputElement = createElem<HTMLInputElement>('input', {
      class: 'login-form__input_name',
      id: 'login-name',
      type: 'text',
      required: 'true',
      placeholder: 'First Name'
    });
    const surnameInput: HTMLInputElement = createElem<HTMLInputElement>('input', {
      class: 'login-form__input_surname',
      id: 'login-surname',
      type: 'text',
      required: 'true',
      placeholder: 'Surname'
    });
    return [nameInput, surnameInput];
  }

  private static createLoginLabels(): HTMLLabelElement[] {
    const nameLabel: HTMLLabelElement = createElem<HTMLLabelElement>('label', {
      class: 'login-form__label_name',
      for: 'login-name'
    });
    nameLabel.textContent = 'Enter your name';
    const surnameLabel: HTMLLabelElement = createElem<HTMLLabelElement>('label', {
      class: 'login-form__label_surname',
      for: 'login-surname'
    });
    surnameLabel.textContent = 'Enter your surname';
    return [nameLabel, surnameLabel];
  }
}
