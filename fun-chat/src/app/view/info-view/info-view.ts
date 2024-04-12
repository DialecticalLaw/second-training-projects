import { container } from '../components/container/container';
import { infoPage } from '../components/info-page/info-page';

export function drawInfoPage(): void {
  container.append(infoPage);
  infoPage.hidden = false;
}
