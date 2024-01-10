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

const headerTitle = document.createElement('h1');
headerTitle.classList.add('header__title');
headerTitle.innerHTML = 'Виселица';
header.insertAdjacentElement('beforeend', headerTitle);

const mainHint = document.createElement('p');
mainHint.classList.add('main__hint');
mainHint.innerHTML = '*тут будет подсказка*' //////////// REMOVE THIS LATER!!!
main.insertAdjacentElement('afterbegin', mainHint);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
main.insertAdjacentElement('beforeend', keyboard);

const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

for (let letter of alphabet) {
    const letterBtn = document.createElement('button');
    letterBtn.classList.add('keyboard__btn');
    letterBtn.innerHTML = letter;
    keyboard.insertAdjacentElement('beforeend', letterBtn);
}

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

context.beginPath(); // Рисование виселицы
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