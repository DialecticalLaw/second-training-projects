import { container } from '../components/container/container';
import { header } from '../components/main-page/header/header';

export function drawMain() {
  container.append(header);
  header.hidden = false;
}
