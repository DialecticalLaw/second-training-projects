import { container } from '../components/container/container';
import { footer } from '../components/main-page/footer/footer';
import { header, username } from '../components/main-page/header/header';
import { main } from '../components/main-page/main/main';

export function drawMainPage() {
  container.append(header, main, footer);
  header.hidden = false;
  main.hidden = false;
  footer.hidden = false;
}

export function updateMainPageData(login: string): void {
  username.textContent = login;
}
