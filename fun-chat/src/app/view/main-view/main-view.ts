import { container } from '../components/container/container';
import { header } from '../components/main-page/header/header';
import { main } from '../components/main-page/main/main';

export function drawMain() {
  container.append(header, main);
  header.hidden = false;
}
