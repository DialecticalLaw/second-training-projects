import { winners } from '../components/winners/winners';

export function drawWinners(): void {
  const main = document.querySelector('.main');
  if (!main) throw new Error('main is undefined');
  main.append(winners);
}
