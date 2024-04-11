import { container } from '../container/container';
import { footer } from '../main-page/footer/footer';

export function drawFooter() {
  container.append(footer);
  footer.hidden = false;
}
