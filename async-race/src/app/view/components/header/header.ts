import createElem from '../../../utils/create_elem';
import './header.css';

const header = createElem<HTMLElement>('header', { class: 'header' });
const switchPages = <HTMLFormElement>createElem('form', { class: 'switch-pages' });

const selectGarageBtn = <HTMLButtonElement>(
  createElem('button', { class: 'switch-pages__btn_garage' })
);
selectGarageBtn.textContent = 'TO GARAGE';

const selectWinnersBtn = <HTMLButtonElement>(
  createElem('button', { class: 'switch-pages__btn_winners' })
);
selectWinnersBtn.textContent = 'TO WINNERS';

switchPages.append(selectGarageBtn, selectWinnersBtn);
header.append(switchPages);
export default header;
