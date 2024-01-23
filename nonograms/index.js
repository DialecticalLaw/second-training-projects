const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');
body.insertAdjacentElement('beforeend', container);

const header = document.createElement('header');
header.classList.add('header');
container.insertAdjacentElement('beforeend', header);

const title = document.createElement('h1');
title.classList.add('title');
title.textContent = 'Nonograms';
header.insertAdjacentElement('beforeend', title);

const main = document.createElement('main');
main.classList.add('main');
container.insertAdjacentElement('beforeend', main);

const randomGameBtn = document.createElement('button');
randomGameBtn.classList.add('random-game-btn');
randomGameBtn.textContent = 'Random game';
main.insertAdjacentElement('beforeend', randomGameBtn);

const choosePuzzle = document.createElement('button');
choosePuzzle.classList.add('choose-puzzle');
choosePuzzle.textContent = 'Choose a puzzle';
main.insertAdjacentElement('beforeend', choosePuzzle);

const stopwatchMenuContainer = document.createElement('div');
stopwatchMenuContainer.classList.add('stopwatch-menu-container');
main.insertAdjacentElement('beforeend', stopwatchMenuContainer);

const stopwatch = document.createElement('p');
stopwatch.classList.add('stopwatch');
stopwatch.textContent = '00:00';
stopwatchMenuContainer.insertAdjacentElement('beforeend', stopwatch);

const menuBtn = document.createElement('button');
menuBtn.classList.add('menu-btn');
menuBtn.textContent = 'Menu';
stopwatchMenuContainer.insertAdjacentElement('beforeend', menuBtn);

const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');
main.insertAdjacentElement('beforeend', gameBoard);

const interactionButtonsContainer = document.createElement('div');
interactionButtonsContainer.classList.add('interaction-buttons-container');
main.insertAdjacentElement('beforeend', interactionButtonsContainer);

const resetBtn = document.createElement('button');
resetBtn.classList.add('reset-btn');
resetBtn.textContent = 'Reset game';
interactionButtonsContainer.insertAdjacentElement('beforeend', resetBtn);

const solutionBtn = document.createElement('button');
solutionBtn.classList.add('solution-btn');
solutionBtn.textContent = 'Solution';
interactionButtonsContainer.insertAdjacentElement('beforeend', solutionBtn);

const footer = document.createElement('footer')
footer.classList.add('footer');
container.insertAdjacentElement('beforeend', footer);