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
footerRss.innerHTML = '<img src="https://rs.school/images/rs_school_js.svg" alt="rss">';
footer.insertAdjacentElement('beforeend', footerRss);