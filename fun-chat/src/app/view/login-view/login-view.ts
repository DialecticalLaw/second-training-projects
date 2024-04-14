import { Events } from '../../../interfaces';
import { container } from '../components/container/container';
import { loginWrapper, nameInput, nameLabel, passwordInput } from '../components/login/login';

export function drawLogin() {
  container.append(loginWrapper);
  // console.log(loginWrapper);
  loginWrapper.hidden = false;
}

export function clearLogin(): void {
  nameInput.value = '';
  passwordInput.value = '';
  loginWrapper.dispatchEvent(new InputEvent('input'));

  const hints: HTMLLIElement[] = Array.from(document.querySelectorAll('.login__validate-hint'));
  hints.forEach((hint: HTMLLIElement) => {
    hint.classList.remove('valid');
  });
}

export function markError(error: Events.AlreadyAuth | Events.IncorrectPassword): void {
  nameLabel.classList.remove('already-auth');
  nameLabel.classList.remove('incorrect-password');

  if (error === Events.AlreadyAuth) {
    nameLabel.classList.add('already-auth');
  } else {
    nameLabel.classList.add('incorrect-password');
  }

  const errorVisibilityTime: number = 3500;
  setTimeout(() => {
    nameLabel.classList.remove('already-auth');
    nameLabel.classList.remove('incorrect-password');
  }, errorVisibilityTime);
}
