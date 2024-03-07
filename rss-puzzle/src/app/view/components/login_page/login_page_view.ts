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
    const hintsWrapper: HTMLUListElement = createElem<HTMLUListElement>('ul', {
      class: 'login-form__hints'
    });
    const nameWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'login-form__name-wrapper'
    });
    const surnameWrapper: HTMLDivElement = createElem<HTMLDivElement>('div', {
      class: 'login-form__surname-wrapper'
    });
    appendElem(loginForm, [hintsWrapper, nameWrapper, surnameWrapper]);
  }

  private static drawFormElems(): void {
    const hintElems: HTMLLIElement[] = this.createLoginHints();
    const [nameInput, surnameInput]: HTMLInputElement[] = this.createLoginInputs();
    const [nameLabel, surnameLabel]: HTMLLabelElement[] = this.createLoginLabels();
    const formBtn: HTMLButtonElement = createElem<HTMLButtonElement>('button', {
      class: 'login-form__button'
    });
    formBtn.textContent = 'Login';

    const loginForm = document.querySelector('.login-form') as HTMLFormElement;
    const hintsWrapper = document.querySelector('.login-form__hints') as HTMLUListElement;
    const nameWrapper = document.querySelector('.login-form__name-wrapper') as HTMLDivElement;
    const surnameWrapper = document.querySelector('.login-form__surname-wrapper') as HTMLDivElement;
    appendElem(hintsWrapper, hintElems);
    appendElem(nameWrapper, [nameInput, nameLabel]);
    appendElem(surnameWrapper, [surnameInput, surnameLabel]);
    appendElem(loginForm, [formBtn]);
  }

  private static createLoginHints(): HTMLLIElement[] {
    const hintElems: HTMLLIElement[] = [];
    for (let i = 0; i < 4; i += 1) {
      // 4 - number of hints
      const hint: HTMLLIElement = createElem('li', { class: 'login-form__hint' });
      hintElems.push(hint);
    }
    hintElems[0].textContent =
      'The first name and surname input fields only accept English alphabet letters and the hyphen';
    hintElems[1].textContent = 'The first letter of each input field is validated to be uppercase';
    hintElems[2].textContent = 'First name - at least 3 characters, and last name - at least 4';
    hintElems[3].textContent = 'The fields are not empty';
    return hintElems;
  }

  private static createLoginInputs(): HTMLInputElement[] {
    const nameInput: HTMLInputElement = createElem<HTMLInputElement>('input', {
      class: 'login-form__input_name',
      id: 'login-name',
      type: 'text',
      placeholder: 'First Name'
    });
    const surnameInput: HTMLInputElement = createElem<HTMLInputElement>('input', {
      class: 'login-form__input_surname',
      id: 'login-surname',
      type: 'text',
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
