import { container } from '../components/container/container';
import { loginWrapper, nameInput, passwordInput } from '../components/login/login';

export function drawLogin() {
  container.append(loginWrapper);
  loginWrapper.hidden = false;
}

export function clearLogin(): void {
  nameInput.value = '';
  passwordInput.value = '';

  const hints: HTMLLIElement[] = Array.from(document.querySelectorAll('.login__validate-hint'));
  hints.forEach((hint: HTMLLIElement) => {
    hint.classList.remove('valid');
  });
}
