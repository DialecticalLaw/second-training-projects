if (!localStorage.getItem('oldAnswer')) {
  localStorage.setItem('oldAnswer', undefined);
}

// Начало генерирования HTML

const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');
body.insertAdjacentElement('beforeend', container);

const header = document.createElement('header');
header.classList.add('header');
container.insertAdjacentElement('beforeend', header);

const main = document.createElement('main');
main.classList.add('main');
container.insertAdjacentElement('beforeend', main);

const footer = document.createElement('footer');
footer.classList.add('footer');
container.insertAdjacentElement('beforeend', footer);

const modalWrapper = document.createElement('div');
modalWrapper.classList.add('modal-wrapper');
container.insertAdjacentElement('afterbegin', modalWrapper);

const modalWindow = document.createElement('div');
modalWindow.classList.add('modal-wrapper__window');
modalWrapper.insertAdjacentElement('afterbegin', modalWindow);

const modalTitle = document.createElement('h2');
modalTitle.classList.add('modal-wrapper__title');
modalWindow.insertAdjacentElement('beforeend', modalTitle);

const modalAnswer = document.createElement('p');
modalAnswer.classList.add('modal-wrapper__answer');
modalWindow.insertAdjacentElement('beforeend', modalAnswer);

const modalBtn = document.createElement('button');
modalBtn.classList.add('modal-wrapper__btn');
modalBtn.innerHTML = 'Играть снова';
modalWindow.insertAdjacentElement('beforeend', modalBtn);

modalAnswer.innerHTML = 'Правильный ответ: муравей'; // УДАЛИТЬ
modalTitle.innerHTML = 'Победа'; // УДАЛИТЬ

const headerTitle = document.createElement('h1');
headerTitle.classList.add('header__title');
headerTitle.innerHTML = 'Виселица';
header.insertAdjacentElement('beforeend', headerTitle);

const mainHint = document.createElement('p');
mainHint.classList.add('main__hint');
main.insertAdjacentElement('afterbegin', mainHint);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
main.insertAdjacentElement('beforeend', keyboard);

const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

for (let letter of alphabet) {
  const letterBtn = document.createElement('button');
  letterBtn.classList.add('keyboard__btn');
  letterBtn.innerHTML = letter;
  letterBtn.addEventListener('click', checkGuess);
  keyboard.insertAdjacentElement('beforeend', letterBtn);
}

document.addEventListener('keydown', checkGuess);

const guessWord = document.createElement('div');
guessWord.classList.add('guess-word');
main.insertAdjacentElement('beforeend', guessWord);

const mainTries = document.createElement('p');
mainTries.classList.add('main__tries');
mainTries.innerHTML = 'Неправильных ответов: <span class="incorrect-counter">0 / 6</span>';
main.insertAdjacentElement('beforeend', mainTries);

const canvas = document.createElement('canvas');
canvas.id = 'hangman';
canvas.innerHTML = 'Ваш браузер устарел и не поддерживает новые функции. Пожалуйста, обновите его';
canvas.width = 300;
canvas.height = 350;
main.insertAdjacentElement('beforeend', canvas);

const context = canvas.getContext('2d');
context.strokeStyle = '#12ffff';
context.lineWidth = '5';
context.lineJoin = 'round';

context.beginPath(); // Рисование виселицы - снизу вверх
context.moveTo(0, 350);
context.lineTo(300, 350);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(50, 350);
context.lineTo(50, 0);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(50, 50);
context.lineTo(100, 0);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(50, 0);
context.lineTo(220, 0);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(220, 0);
context.lineTo(220, 50);
context.closePath();
context.stroke();

const githubLink = document.createElement('a');
githubLink.classList.add('github-link');
githubLink.href = 'https://github.com/DialecticalLaw';
githubLink.target = '_blank';
githubLink.innerHTML = '<svg class="github-link__icon" width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="Icons" x="0" y="-192" width="1280" height="800" style="fill:none;"/><g id="Icons1" serif:id="Icons"><g id="Strike"></g><g id="H1"></g><g id="H2"></g><g id="H3"></g><g id="list-ul"></g><g id="hamburger-1"></g><g id="hamburger-2"></g><g id="list-ol"></g><g id="list-task"></g><g id="trash"></g><g id="vertical-menu"></g><g id="horizontal-menu"></g><g id="sidebar-2"></g><g id="Pen"></g><g id="Pen1" serif:id="Pen"></g><g id="clock"></g><g id="external-link"></g><g id="hr"></g><g id="info"></g><g id="warning"></g><g id="plus-circle"></g><g id="minus-circle"></g><g id="vue"></g><g id="cog"></g><path id="github" d="M32.029,8.345c-13.27,0 -24.029,10.759 -24.029,24.033c0,10.617 6.885,19.624 16.435,22.803c1.202,0.22 1.64,-0.522 1.64,-1.16c0,-0.569 -0.02,-2.081 -0.032,-4.086c-6.685,1.452 -8.095,-3.222 -8.095,-3.222c-1.093,-2.775 -2.669,-3.514 -2.669,-3.514c-2.182,-1.492 0.165,-1.462 0.165,-1.462c2.412,0.171 3.681,2.477 3.681,2.477c2.144,3.672 5.625,2.611 6.994,1.997c0.219,-1.553 0.838,-2.612 1.526,-3.213c-5.336,-0.606 -10.947,-2.669 -10.947,-11.877c0,-2.623 0.937,-4.769 2.474,-6.449c-0.247,-0.608 -1.072,-3.051 0.235,-6.36c0,0 2.018,-0.646 6.609,2.464c1.917,-0.533 3.973,-0.8 6.016,-0.809c2.041,0.009 4.097,0.276 6.017,0.809c4.588,-3.11 6.602,-2.464 6.602,-2.464c1.311,3.309 0.486,5.752 0.239,6.36c1.54,1.68 2.471,3.826 2.471,6.449c0,9.232 -5.62,11.263 -10.974,11.858c0.864,0.742 1.632,2.208 1.632,4.451c0,3.212 -0.029,5.804 -0.029,6.591c0,0.644 0.432,1.392 1.652,1.157c9.542,-3.185 16.421,-12.186 16.421,-22.8c0,-13.274 -10.76,-24.033 -24.034,-24.033" style="fill:#ffffff;"/><g id="logo"></g><g id="eye-slash"></g><g id="eye"></g><g id="toggle-off"></g><g id="shredder"></g><g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"></g><g id="react"></g></g></svg>DialecticalLaw';
footer.insertAdjacentElement('beforeend', githubLink);

const footerYear = document.createElement('p');
footerYear.classList.add('footer__year');
footerYear.innerHTML = '2024';
footer.insertAdjacentElement('beforeend', footerYear);

const footerRss = document.createElement('a');
footerRss.classList.add('footer__link_rss');
footerRss.href = 'https://rs.school/js-stage0/';
footerRss.target = '_blank';
footerRss.innerHTML = '<img src="assets/img/rs-logo-js-inverse.svg" alt="rss">';
footer.insertAdjacentElement('beforeend', footerRss);

// Конец генерирования HTML

const dictionary = [{
  word: 'хобби',
  hint: 'Увлечение в свободное время'
},
{
  word: 'бумага',
  hint: 'Материал, используемый в книгах, журналах. На нём пишут, из него вырезают'
},
{
  word: 'колесо',
  hint: 'Ну... Оно круглое!'
},
{
  word: 'рыба',
  hint: 'Подходит котик к продавцу ЭТОГО и спрашивает: <i>вы ЭТО продаёте?</i> А ему в ответ: <i>нет, только показываем.</i> Котик: <i>красивое...</i>'
},
{
  word: 'язык',
  hint: 'Он есть во рту, на нём пишут и даже говорят. Что же это?'
},
{
  word: 'капибара',
  hint: 'Это животное называют самом большим грызуном. А ещё они милые'
},
{
  word: 'кошелёк',
  hint: 'Как правило, в нём пусто'
},
{
  word: 'посылка',
  hint: '<i>"Это то, что становится вашим лучшим другом во время налогового сезона и вашим худшим врагом, когда вы сталкиваетесь с термином "бюрократия"."</i> - ChatGPT'
},
{
  word: 'соединение',
  hint: 'Ответ - пшш... Приём, как слышшпш.... <i>*связь потеряна*</i>'
},
{
  word: 'время',
  hint: 'В детстве идёт долго. С возрастом ускоряется. Уже не возвращается'
},
{
  word: 'вертолёт',
  hint: 'А муха тоже ... , но без коробки передач'
},
{
  word: 'голубь',
  hint: 'Раньше они почту разносили. А теперь безработные... Живут на "бабушкины пособия".'
},]

let answer;

startGame();

function startGame() {
  const randomNum = Math.floor(Math.random() * 12);
  if (dictionary[randomNum].word === localStorage.getItem('oldAnswer')) {
    startGame();
  } else {
    localStorage.setItem('oldAnswer', dictionary[randomNum].word);
    mainHint.innerHTML = `<b>Подсказка:</b> ${dictionary[randomNum].hint}`;
    answer = dictionary[randomNum].word;

    for (let i = 0; i < dictionary[randomNum].word.length; i++) {
      const encryptedLetter = document.createElement('div');
      encryptedLetter.classList.add('guess-word__line');
      guessWord.insertAdjacentElement('beforeend', encryptedLetter);
    }

    console.log(dictionary[randomNum].word);
  }
}

function checkGuess(event) {
  let keyRegexp = /[а-яё]/i
  if (event.key !== undefined && !keyRegexp.test(event.key)) {
    return;
  }

  if (event.target.classList.contains('keyboard__btn')) {
    event.key = event.target.innerHTML;
    event.target.disabled = true;
    event.target.classList.add('keyboard__btn_disabled');
  } else if (event.key) {
    const letterButtons = document.querySelectorAll('.keyboard__btn');
    for (let btn of letterButtons) {
      if (btn.innerHTML === event.key.toUpperCase()) {
        if (btn.classList.contains('keyboard__btn_disabled')) {
          return;
        }

        btn.disabled = true;
        btn.classList.add('keyboard__btn_disabled');
        break;
      }
    }
  }

  let letterPositions = [];
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === event.key.toLowerCase()) {
      letterPositions.push(i);
    }
  }

  if (letterPositions.length) {
    showLetters(letterPositions, event.key.toLowerCase());
  } else {
    drawBodyPart();
  }
}

function showLetters(letterPositions, key) {
  for (let position of letterPositions) {
    const lineOnPosition = document.querySelectorAll('.guess-word__line')[position];
    lineOnPosition.classList.add('guess-word__letter');
    lineOnPosition.innerHTML = key;
  }

  const guessWordItems = document.querySelectorAll('.guess-word__line');
  let isWordGuessed = true;
  for (let item of guessWordItems) {
    if (!item.classList.contains('guess-word__letter')) {
      isWordGuessed = false;
    }
  }

  if (isWordGuessed) {
    showModal('win');
  }
}

function drawBodyPart() {
  const incorrectCount = Number(document.querySelector('.incorrect-counter').innerHTML[0]);
  context.strokeStyle = '#ffffff';
  context.lineCap = 'round';
  switch (incorrectCount) {
    case 0:
      context.beginPath();
      context.arc(220, 80, 30, 0, Math.PI * 2, true);
      context.stroke();
      document.querySelector('.incorrect-counter').innerHTML = '1 / 6';
      break;
    case 1:
      context.beginPath();
      context.moveTo(220, 110);
      context.lineTo(220,190);
      context.stroke();
      document.querySelector('.incorrect-counter').innerHTML = '2 / 6';
      break;
    case 2:
      context.beginPath();
      context.moveTo(220, 120);
      context.lineTo(180, 170);
      context.stroke();
      document.querySelector('.incorrect-counter').innerHTML = '3 / 6';
      break;
    case 3:
      context.beginPath();
      context.moveTo(220, 120);
      context.lineTo(260, 170);
      context.stroke();
      document.querySelector('.incorrect-counter').innerHTML = '4 / 6';
      break;
    case 4:
      context.beginPath();
      context.moveTo(220, 190);
      context.lineTo(180, 230);
      context.stroke();
      document.querySelector('.incorrect-counter').innerHTML = '5 / 6';
      break;
    case 5:
      context.beginPath();
      context.moveTo(220, 190);
      context.lineTo(260, 230);
      context.stroke();
      document.querySelector('.incorrect-counter').innerHTML = '6 / 6';
      showModal('lose');
      break;
    default:
      break;
  }
}

function showModal(result) {
  switch (result) {
    case 'win':
      modalTitle.innerHTML = 'Вы выиграли';
      modalTitle.style.color = '#00ff00';
      modalAnswer.innerHTML = `Правильный ответ: ${answer}`;

      modalWrapper.classList.add('modal-wrapper-on');
      setTimeout(() => {
        modalWrapper.classList.add('modal-wrapper-blackout');
        modalWindow.classList.add('modal-wrapper__window_on');
      }, 15);
      break;
    case 'lose':
      modalTitle.innerHTML = 'Вы проиграли';
      modalTitle.style.color = '#ff1717';
      modalAnswer.innerHTML = `Правильный ответ: ${answer}`;

      modalWrapper.classList.add('modal-wrapper-on');
      setTimeout(() => {
        modalWrapper.classList.add('modal-wrapper-blackout');
        modalWindow.classList.add('modal-wrapper__window_on');
      }, 15);
      break;
    default:
      break;
  }
}