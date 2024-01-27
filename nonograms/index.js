const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');
body.insertAdjacentElement('beforeend', container);

const header = document.createElement('header');
header.classList.add('header');
container.insertAdjacentElement('beforeend', header);

const haaderTitle = document.createElement('h1');
haaderTitle.classList.add('header__title');
haaderTitle.textContent = 'Nonograms';
header.insertAdjacentElement('beforeend', haaderTitle);

const main = document.createElement('main');
main.classList.add('main');
container.insertAdjacentElement('beforeend', main);

const footer = document.createElement('footer');
footer.classList.add('footer');
container.insertAdjacentElement('beforeend', footer);

const randomGameBtn = document.createElement('button');
randomGameBtn.classList.add('random-game-btn');
randomGameBtn.textContent = 'Random game';
main.insertAdjacentElement('beforeend', randomGameBtn);

const choosePuzzle = document.createElement('button');
choosePuzzle.classList.add('choose-puzzle');
choosePuzzle.textContent = 'Choose a puzzle';
main.insertAdjacentElement('beforeend', choosePuzzle);

const gameBoardContent = document.createElement('div');
gameBoardContent.classList.add('game-board-content');
main.insertAdjacentElement('beforeend', gameBoardContent);

const stopwatchMenuContainer = document.createElement('div');
stopwatchMenuContainer.classList.add('stopwatch-menu-container');
gameBoardContent.insertAdjacentElement('beforeend', stopwatchMenuContainer);

const stopwatch = document.createElement('p');
stopwatch.classList.add('stopwatch');
stopwatch.textContent = '00:00';
stopwatchMenuContainer.insertAdjacentElement('beforeend', stopwatch);

const menuBtn = document.createElement('button');
menuBtn.classList.add('menu-btn');
menuBtn.textContent = 'Menu';
stopwatchMenuContainer.insertAdjacentElement('beforeend', menuBtn);

const playArea = document.createElement('div');
playArea.classList.add('game-board__play-area');
gameBoardContent.insertAdjacentElement('beforeend', playArea);

const topCluesContainer = document.createElement('div');
topCluesContainer.classList.add('game-board__top-clues');
playArea.insertAdjacentElement('beforeend', topCluesContainer);

const leftCluesContainer = document.createElement('div');
leftCluesContainer.classList.add('game-board__left-clues');
playArea.insertAdjacentElement('beforeend', leftCluesContainer);

const interactionButtonsContainer = document.createElement('div');
interactionButtonsContainer.classList.add('interaction-buttons-container');
gameBoardContent.insertAdjacentElement('beforeend', interactionButtonsContainer);

const resetBtn = document.createElement('button');
resetBtn.classList.add('reset-btn');
resetBtn.textContent = 'Reset game';
interactionButtonsContainer.insertAdjacentElement('beforeend', resetBtn);

const solutionBtn = document.createElement('button');
solutionBtn.classList.add('solution-btn');
solutionBtn.textContent = 'Solution';
interactionButtonsContainer.insertAdjacentElement('beforeend', solutionBtn);

const githubLink = document.createElement('a');
githubLink.classList.add('github-link');
githubLink.href = 'https://github.com/DialecticalLaw';
githubLink.target = '_blank';
githubLink.innerHTML = '<svg class="github-link__icon" width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="Icons" x="0" y="-192" width="1280" height="800" style="fill:none;"/><g id="Icons1" serif:id="Icons"><g id="Strike"></g><g id="H1"></g><g id="H2"></g><g id="H3"></g><g id="list-ul"></g><g id="hamburger-1"></g><g id="hamburger-2"></g><g id="list-ol"></g><g id="list-task"></g><g id="trash"></g><g id="vertical-menu"></g><g id="horizontal-menu"></g><g id="sidebar-2"></g><g id="Pen"></g><g id="Pen1" serif:id="Pen"></g><g id="clock"></g><g id="external-link"></g><g id="hr"></g><g id="info"></g><g id="warning"></g><g id="plus-circle"></g><g id="minus-circle"></g><g id="vue"></g><g id="cog"></g><path id="github" d="M32.029,8.345c-13.27,0 -24.029,10.759 -24.029,24.033c0,10.617 6.885,19.624 16.435,22.803c1.202,0.22 1.64,-0.522 1.64,-1.16c0,-0.569 -0.02,-2.081 -0.032,-4.086c-6.685,1.452 -8.095,-3.222 -8.095,-3.222c-1.093,-2.775 -2.669,-3.514 -2.669,-3.514c-2.182,-1.492 0.165,-1.462 0.165,-1.462c2.412,0.171 3.681,2.477 3.681,2.477c2.144,3.672 5.625,2.611 6.994,1.997c0.219,-1.553 0.838,-2.612 1.526,-3.213c-5.336,-0.606 -10.947,-2.669 -10.947,-11.877c0,-2.623 0.937,-4.769 2.474,-6.449c-0.247,-0.608 -1.072,-3.051 0.235,-6.36c0,0 2.018,-0.646 6.609,2.464c1.917,-0.533 3.973,-0.8 6.016,-0.809c2.041,0.009 4.097,0.276 6.017,0.809c4.588,-3.11 6.602,-2.464 6.602,-2.464c1.311,3.309 0.486,5.752 0.239,6.36c1.54,1.68 2.471,3.826 2.471,6.449c0,9.232 -5.62,11.263 -10.974,11.858c0.864,0.742 1.632,2.208 1.632,4.451c0,3.212 -0.029,5.804 -0.029,6.591c0,0.644 0.432,1.392 1.652,1.157c9.542,-3.185 16.421,-12.186 16.421,-22.8c0,-13.274 -10.76,-24.033 -24.034,-24.033" style="fill:#000000;"/><g id="logo"></g><g id="eye-slash"></g><g id="eye"></g><g id="toggle-off"></g><g id="shredder"></g><g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"></g><g id="react"></g></g></svg>DialecticalLaw';
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


// end of elements generation

const levelStorage = [[
  {
    name: 'flower',
    board: [
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0]
    ]
  },
  {
    name: 'face',
    board: [
      [1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 1]
    ]
  },
  {
    name: 'rocket',
    board: [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1]
    ]
  },
  {
    name: 'clocks',
    board: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 1, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0]
    ]
  },
  {
    name: 'turtle',
    board: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0]
    ]
  }
], [
  {
    name: 'shower',
    board: [
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
      [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    ]
  },
  {
    name: 'skateboard',
    board: [
      [0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    ]
  },
  {
    name: 'chain',
    board: [
      [1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    ]
  },
  {
    name: 'crescent',
    board: [
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
      [0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 1, 1],
      [0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    ]
  },
  {
    name: 'ship',
    board: [
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  },
], [
  {
    name: 'coffee',
    board: [
      [0,1,1,0,0,0,0,1,0,0,1,1,0,1,0],
      [0,0,1,0,0,0,1,1,0,0,1,0,0,1,0],
      [0,0,1,1,0,0,1,0,0,1,1,0,1,1,0],
      [0,0,0,1,0,1,1,0,0,1,0,0,1,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
      [0,0,1,1,0,1,1,1,1,1,0,1,1,0,0],
      [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,0,0,0,0,0,1,1,0,0,0],
      [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0]
    ]
  },
  {
    name: 'book',
    board: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,0,1,1,1,0,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,0,1,1,1,0,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,0,1,0,0,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,0,1,0,1,1,1,0,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,0,1,0,1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  },
  {
    name: 'trust',
    board: [
    [1,1,0,0,1,1,0,0,1,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
    [0,1,1,0,1,1,0,0,1,0,0,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,0,0,1,1,0,0],
    [1,0,0,1,0,0,1,0,1,0,1,1,1,1,1],
    [1,1,0,1,0,1,1,0,1,0,0,1,1,0,0],
    [0,1,1,0,1,1,0,0,0,0,0,0,1,1,0],
    [0,0,1,1,1,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,1,1,1,0,0,0,1,1],
    [1,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,1,1,0,0,1,1,0,0,0,0,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [0,0,1,1,0,0,1,1,0,0,0,0,0,0,0]
    ]
  },
  {
    name: 'lamp',
    board: [
    [1,0,0,0,1,1,1,1,1,1,1,0,0,1,1],
    [1,1,0,1,1,0,0,0,0,0,1,1,0,1,0],
    [0,0,0,1,0,0,1,1,1,0,0,1,0,0,0],
    [1,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
    [0,0,1,0,0,1,1,1,1,1,0,0,1,0,0],
    [1,0,1,1,0,0,1,0,1,0,0,1,1,0,0],
    [0,0,0,1,0,1,1,1,1,1,0,1,0,0,1],
    [0,0,0,1,1,0,1,0,1,0,1,1,0,0,0],
    [1,1,0,0,1,1,1,0,1,1,1,0,1,1,0],
    [0,0,0,0,0,1,1,0,1,1,0,0,0,0,0],
    [1,0,1,0,1,0,1,1,1,0,1,1,0,1,1],
    [0,1,0,0,1,0,1,0,1,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
    ]
  },
  {
    name: 'waves',
    board: [
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,1,0,0,1,1,0,0,0,0,1,1,0,0,0],
    [0,1,0,1,1,0,0,0,0,0,0,1,1,0,0],
    [1,1,0,1,0,0,0,1,1,1,0,0,0,0,0],
    [1,0,0,1,0,0,1,0,0,1,1,0,0,0,0],
    [1,0,0,1,0,0,1,0,0,0,1,0,0,0,0],
    [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0],
    [1,1,0,1,1,0,0,0,0,1,1,1,0,0,0],
    [0,1,0,0,1,1,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0,1,1,1,1,1,1,1]
    ]
  },
]]

let currentLevel;

function startGame(mode) {
  switch (mode) {
    case '5x5':
      currentLevel = levelStorage[0][Math.floor(Math.random() * 5)];
      drawPlayArea(5);
      drawClues(5);
      break;
    case '10x10':
      currentLevel = levelStorage[1][Math.floor(Math.random() * 5)];
      drawPlayArea(10);
      drawClues(10);
      break;
    case '15x15':
      currentLevel = levelStorage[2][Math.floor(Math.random() * 5)];
      drawPlayArea(15);
      drawClues(15);
      break;
    default:
      break;
  }
}

startGame('15x15');

function drawPlayArea(size) {
  playArea.style['grid-template'] = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  playArea.style['grid-area'] = `2 / 2 / 2 / 2`;

  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.invisible = false;
      if (column === 4 && size > 5 || column === 9 && size > 10) cell.classList.add('divideRight');
      if (column === 5 || column === 10) cell.classList.add('divideLeft');
      if (row === 4 && size > 5 || row === 9 && size > 10) cell.classList.add('divideBottom');
      if (row === 5 || row === 10) cell.classList.add('divideTop');
      playArea.insertAdjacentElement('beforeend', cell);
    }
  }
}

function drawClues(size) {
  let topClueSum = 0;
  let leftClueSum = 0;
  let resultClues = {
    topClues: [],
    leftClues: []
  };

  for (let row = 0; row < size; row++) {
    const topClue = document.createElement('div');
    const leftClue = document.createElement('div');
    topClue.classList.add('top-clue');
    leftClue.classList.add('left-clue');
    if (row === 4 && size > 5 || row === 9 && size > 10) {
      topClue.classList.add('divideRight');
      leftClue.classList.add('divideBottom');
    }
    if (row === 5 || row === 10) {
      topClue.classList.add('divideLeft');
      leftClue.classList.add('divideTop');
    }
    topCluesContainer.insertAdjacentElement('beforeend', topClue);
    leftCluesContainer.insertAdjacentElement('beforeend', leftClue);
    const topClueSums = [];
    const leftClueSums = [];
    for (let column = 0; column < size; column++) {
      if (currentLevel.board[column][row] === 1) topClueSum += 1;
      if (currentLevel.board[column][row] === 0) {
        if (topClueSum !== 0) topClueSums.push(topClueSum);
        topClueSum = 0;
      }
      
      if (currentLevel.board[row][column] === 1) leftClueSum += 1;
      if (currentLevel.board[row][column] === 0) {
        if (leftClueSum !== 0) leftClueSums.push(leftClueSum);
        leftClueSum = 0;
      }

      if (column === size - 1) {
        if (topClueSum !== 0) topClueSums.push(topClueSum);
        if (leftClueSum !== 0) leftClueSums.push(leftClueSum);
        topClueSum = 0;
        leftClueSum = 0;
        resultClues.topClues.push(topClueSums);
        resultClues.leftClues.push(leftClueSums);
      }
    }
  }

  const topClues = document.querySelectorAll('.top-clue');
  const leftClues = document.querySelectorAll('.left-clue');

  for (let i = 0; i < topClues.length; i++) {
    for (let clue of resultClues.topClues[i]) {
      topClues[i].insertAdjacentHTML('beforeend', `<p>${clue}</p>`);
    }
  }

  for (let i = 0; i < leftClues.length; i++) {
    for (let clue of resultClues.leftClues[i]) {
      leftClues[i].insertAdjacentHTML('beforeend', `<p>${clue}</p>`);
    }
  }

  let maxLeftClues = 0;
  for (let clue of leftClues) {
    if (clue.children.length > maxLeftClues) maxLeftClues = clue.children.length;
  }

  let maxTopClues = 0;
  for (let clue of topClues) {
    if (clue.children.length > maxTopClues) maxTopClues = clue.children.length;
  }

  for (let clue of leftClues) {
    if (clue.children.length < maxLeftClues) addEmptyClue(clue, maxLeftClues - clue.children.length);
  }
  for (let clue of topClues) {
    if (clue.children.length < maxTopClues) addEmptyClue(clue, maxTopClues - clue.children.length);
  }

  const leftCluesParagraphs = document.querySelectorAll('.left-clue p');
  const topCluesParagraphs = document.querySelectorAll('.top-clue p');
  const cellSize = document.querySelector('.cell').getBoundingClientRect().width;
  for (let clue of leftCluesParagraphs) {
    clue.style.width = `${cellSize}px`;
    clue.style.height = `${cellSize}px`;
  }
  for (let clue of topCluesParagraphs) {
    clue.style.width = `${cellSize}px`;
    clue.style.height = `${cellSize}px`;
  }
}

function addEmptyClue(elem, num) {
  for (let i = 0; i < num; i++) {
    elem.insertAdjacentHTML('afterbegin', '<p></p>');
  }
}

window.addEventListener('resize', () => {
  const leftCluesParagraphs = document.querySelectorAll('.left-clue p');
  const topCluesParagraphs = document.querySelectorAll('.top-clue p');
  const cellSize = document.querySelector('.cell').getBoundingClientRect().width;
  for (let clue of leftCluesParagraphs) {
    clue.style.width = `${cellSize}px`;
    clue.style.height = `${cellSize}px`;
  }
  for (let clue of topCluesParagraphs) {
    clue.style.width = `${cellSize}px`;
    clue.style.height = `${cellSize}px`;
  }
});

window.addEventListener('resize', changeGameBoardIndent);

function changeGameBoardIndent() {
  const topCluesContainerHeight = topCluesContainer.offsetHeight;
  stopwatchMenuContainer.style['margin-bottom'] = `${topCluesContainerHeight}px`
  if (body.offsetWidth < 500) {
    gameBoardContent.removeAttribute('style');
    return;
  }
  gameBoardContent.style['align-self'] = 'flex-start';
  let resultMargin = leftCluesContainer.offsetWidth;
  const totalGameBoardWidth = gameBoardContent.offsetWidth + leftCluesContainer.offsetWidth;
  const mainCenter = main.offsetWidth / 2;
  resultMargin += mainCenter - totalGameBoardWidth / 2;
  gameBoardContent.style['margin-left'] = `${resultMargin}px`;
}

changeGameBoardIndent();

isPointerDown = false;
let actionType;
let buttonType;

playArea.addEventListener('pointerdown', (event) => {
  if (event.button === 0) {
    buttonType = 'left';
    isPointerDown = true;
    if (event.target.classList.contains('cell')) {
      if (!event.target.classList.contains('cell-marked') && event.target.dataset.invisible === 'false') {
        actionType = 'filling';
        event.target.classList.add('cell-marked');
        if (event.target.classList.contains('cell-cross')) {
          event.target.classList.remove('cell-cross');
          event.target.innerHTML = '';
        }
        event.target.dataset.invisible = true;
        if (isVictory()) {
          showModal();
        }
      } else if (event.target.classList.contains('cell-marked') && event.target.dataset.invisible === 'false') {
        actionType = 'emptying';
        event.target.classList.remove('cell-marked');
        event.target.dataset.invisible = true;
      }
    }
  } else if (event.button === 2) {
    buttonType = 'right';
    isPointerDown = true;
    if (event.target.classList.contains('cell')) {
      if (!event.target.classList.contains('cell-cross') && event.target.dataset.invisible === 'false') {
        actionType = 'filling';
        if (event.target.classList.contains('cell-marked')) event.target.classList.remove('cell-marked');
        event.target.classList.add('cell-cross');
        event.target.innerHTML = '<div class="cross"></div>';
        event.target.dataset.invisible = true;
      } else if (event.target.classList.contains('cell-cross') && event.target.dataset.invisible === 'false') {
        actionType = 'emptying';
        event.target.classList.remove('cell-cross');
        event.target.innerHTML = '';
        event.target.dataset.invisible = true;
      }
    }
  }
});

playArea.addEventListener('pointerup', () => {
  const cells = document.querySelectorAll('.cell');
  for (let cell of cells) {
    cell.dataset.invisible = false;
  }
  isPointerDown = false;
});

playArea.addEventListener('pointermove', markSquares);

function markSquares(event) {
  if (isPointerDown && event.target.classList.contains('cell')) {
    if (buttonType === 'left') {
      if (!event.target.classList.contains('cell-marked') && event.target.dataset.invisible === 'false' && actionType === 'filling') {
        event.target.classList.add('cell-marked');
        if (event.target.classList.contains('cell-cross')) {
          event.target.classList.remove('cell-cross');
          event.target.innerHTML = '';
        }
        event.target.dataset.invisible = true;
        if (isVictory()) {
          showModal();
        }
      } else if (event.target.classList.contains('cell-marked') && event.target.dataset.invisible === 'false' && actionType === 'emptying') {
        event.target.classList.remove('cell-marked');
        event.target.dataset.invisible = true;
      }
    } else if (buttonType === 'right') {
      if (!event.target.classList.contains('cell-cross') && event.target.dataset.invisible === 'false' && actionType === 'filling') {
        if (event.target.classList.contains('cell-marked')) event.target.classList.remove('cell-marked');
        event.target.classList.add('cell-cross');
        event.target.innerHTML = '<div class="cross"></div>';
        event.target.dataset.invisible = true;
      } else if (event.target.classList.contains('cell-cross') && event.target.dataset.invisible === 'false' && actionType === 'emptying') {
        event.target.classList.remove('cell-cross');
        event.target.innerHTML = '';
        event.target.dataset.invisible = true;
      }
    }
  }
}

playArea.addEventListener('pointerleave', () => {
  const cells = document.querySelectorAll('.cell');
  for (let cell of cells) {
    cell.dataset.invisible = false;
  }
  isPointerDown = false;
})

playArea.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  return false;
})

function isVictory() {
  const playAreaSize = currentLevel.board.length;
  const currentBoard = Array.from({ length: playAreaSize }, () => []);
  const cells = document.querySelectorAll('.cell');

  let column = 0;
  let row = 0;
  while (column < cells.length) {
    if (cells[column].classList.contains('cell-marked')) {
      currentBoard[row].push(1);
    } else {
      currentBoard[row].push(0);
    }
    if ((column + 1) % playAreaSize === 0 && column !== 0) {
      row++;
    }
    column++;
  }
  if (JSON.stringify(currentBoard) === JSON.stringify(currentLevel.board)) return true;
  return false;
}

function showModal() {
  console.log('MODAL');
}