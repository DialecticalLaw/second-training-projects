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

const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');
gameBoardContent.insertAdjacentElement('beforeend', gameBoard);

const topCluesContainer = document.createElement('div');
topCluesContainer.classList.add('game-board__top-clues');
gameBoard.insertAdjacentElement('beforeend', topCluesContainer);

const playArea = document.createElement('div');
playArea.classList.add('game-board__play-area');
gameBoard.insertAdjacentElement('beforeend', playArea);

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

const footer = document.createElement('footer')
footer.classList.add('footer');
container.insertAdjacentElement('beforeend', footer);

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
], ['15x15']]

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

startGame('10x10');

function drawPlayArea(size) {
  gameBoard.style['grid-template'] = `auto ${size}fr / auto ${size}fr`;
  topCluesContainer.style['grid-template-columns'] = `repeat(${size}, 1fr`;
  topCluesContainer.style['grid-column-start'] = '2';
  playArea.style['grid-template'] = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  playArea.style['grid-area'] = `2 / 2 / 2 / 2`;

  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
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
  const cellSize = document.querySelector('.cell').getBoundingClientRect().width;
  for (let clue of leftCluesParagraphs) {
    clue.style.width = `${cellSize}px`;
    clue.style.height = `${cellSize}px`;
  }
}

function addEmptyClue(elem, num) {
  for (let i = 0; i < num; i++) {
    elem.insertAdjacentHTML('afterbegin', '<p></p>');
  }
}