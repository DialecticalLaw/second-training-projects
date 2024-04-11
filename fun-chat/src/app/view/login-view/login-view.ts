import { container } from '../components/container/container';
import { loginWrapper } from '../components/login/login';

export function drawLogin() {
  container.append(loginWrapper);
  loginWrapper.hidden = false;
}
