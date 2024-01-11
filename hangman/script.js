import { words } from "./modules/words.js";
import { keyboard } from "./modules/keyboard.js";

let randomIndex = Math.floor(Math.random() * words.length)
let randomWord = words[randomIndex];
let livesRemaining = 6;
let isGameOver = false;

const mainWrapper = document.createElement('div');

document.body.append(mainWrapper);
mainWrapper.classList.add('container');

const gameContainer = document.createElement('div');
const keyContainer = document.createElement('div');
gameContainer.classList.add('game__container');
keyContainer.classList.add('control__container');

mainWrapper.append(gameContainer, keyContainer);

const gameTitle = document.createElement('h1');
gameTitle.textContent = 'Hangman Game';

const canvasGraphic = document.createElement('canvas');
gameContainer.append(canvasGraphic, gameTitle)
canvasGraphic.setAttribute('width', '360px');
canvasGraphic.setAttribute('height', '400px');
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function drawGallows() {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.moveTo(100, 350);
  ctx.lineTo(300, 350);
  ctx.moveTo(150, 350);
  ctx.lineTo(150, 100);
  ctx.lineTo(250, 100);
  ctx.lineTo(250, 150);
  ctx.strokeStyle = 'black'
  ctx.stroke();
}
drawGallows();

function drawHangmanPart(lives) {
  switch (lives) {
    case 6:
      // Draw the head
      ctx.beginPath();
      ctx.arc(250, 168, 20, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'red';
      ctx.stroke();
      ctx.closePath();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(250, 190);
      ctx.lineTo(250, 300);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(250, 210);
      ctx.lineTo(200, 230);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(250, 210);
      ctx.lineTo(300, 230);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(248, 298);
      ctx.lineTo(200, 325);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(248, 298);
      ctx.lineTo(300, 325);
      ctx.stroke();
       break;
  }
}


// поле с буквами
const gameField = document.createElement('div');
const keyboardWrapper = document.createElement('div');
gameField.classList.add('game__wrapper')
keyboardWrapper.classList.add('keyaboard__wrapper')

//поле с вопросом

const questionField = document.createElement('div');
questionField.classList.add('questions__wrapper');

// поле с остатком попыток

const remainingTimes = document.createElement('div');
remainingTimes.classList.add('remaining__wrapper');
remainingTimes.textContent = `${livesRemaining}/6 remaining tries`;

//поле с кнопкой обновить

const resetButton = document.createElement('div');
resetButton.classList.add('reset__button');
resetButton.textContent = 'Reset Game';

keyContainer.append(gameField, questionField, remainingTimes, keyboardWrapper, resetButton);
//JS game functions

//создание поля ответа и вопроса

const getValue = () => {
  for (let i = 0; i < randomWord.answer.length; i++) {
    const createValue  = document.createElement('div');
    gameField.append(createValue);
    createValue.textContent = '_';
    createValue.classList.add('word__letter');
    createValue.setAttribute('data-id', i)
  }
  const createQuestion = document.createElement('p');
  questionField.append(createQuestion);
  createQuestion.textContent = randomWord.question;
}
getValue();

//создание клавиатуры

const createKeyboard = (keyboard) => {
  for (let i = 0; i < keyboard.length; i++) {
    const createButton = document.createElement('div');
    createButton.textContent = keyboard[i];
    keyboardWrapper.append(createButton);
    createButton.classList.add('game__button')
  }
}

createKeyboard(keyboard);

const keyBoardArray = document.querySelectorAll('.game__button');
const youWin = document.createElement('div');
const youLoose = document.createElement('div');
const finalWord = document.createElement('div');
//MODAL


const fixedOverlay = document.createElement('div');
fixedOverlay.classList.add('fixed__overlay', 'hidden')
document.body.append(fixedOverlay);

const modalWrapper = document.createElement('div');
modalWrapper.classList.add('modal__wrapper');

const modalContainer = document.createElement('div');
modalContainer.classList.add('modal__container');

//слушатель при клике на кнопку

keyBoardArray.forEach((el) => {
  el.addEventListener('click', (e) => {
  const currentWordValue = e.target.innerText; //значение элемента при клике
  const hiddenValue = document.querySelectorAll('.word__letter'); //доступ к дивам со скрытыми буквами
  if (randomWord.answer.toLowerCase().includes(currentWordValue)) {
    hiddenValue.forEach((el, index) => {
      if (randomWord.answer.toLowerCase().charAt(index) === currentWordValue) {
        el.textContent = currentWordValue;
      }
    })
  const currentGuessedWord = Array.from(hiddenValue).map(el => el.textContent).join('');
  const finalAnswer = randomWord.answer.toLowerCase();

  if (currentGuessedWord === randomWord.answer.toLowerCase()) {
    fixedOverlay.classList.remove('hidden');
    fixedOverlay.append(modalWrapper);
    modalWrapper.append(modalContainer);
    youWin.textContent = 'You Win!'
    youWin.classList.add('win__text');
    finalWord.classList.add('final__result');
    finalWord.textContent = `Correct Answer: ${finalAnswer}`
    modalContainer.append(youWin, finalWord, resetButton);
    document.body.style.overflow = 'hidden';
    keyBoardArray.forEach((button) => {
      button.style.pointerEvents = 'none';
    })
    }
  } else {
    drawHangmanPart(livesRemaining);
    remainingTimes.innerHTML = `${--livesRemaining}/6 remaining tries`;
    if (livesRemaining === 0) {
      fixedOverlay.classList.remove('hidden');
      fixedOverlay.append(modalWrapper);
      modalWrapper.append(modalContainer);
      youLoose.textContent = 'You Loose!'
      youLoose.classList.add('loose__text');
    modalContainer.append(youLoose, resetButton)
      keyBoardArray.forEach((button) => {
        button.style.pointerEvents = 'none';
      })
    }
  }
  el.setAttribute('data-active', '');
  })
})

//с клавиатуры

document.addEventListener('keydown', (e) => {
  if (isGameOver) return;
  keyBoardArray.forEach(el => {
    const hiddenValue = document.querySelectorAll('.word__letter'); //доступ к дивам со скрытыми буквами
    if (e.key === el.textContent) {
      const currentWordValue = e.key;
      console.log(currentWordValue);
       if (randomWord.answer.toLowerCase().includes(currentWordValue)) {
    hiddenValue.forEach((el, index) => {
      if (randomWord.answer.toLowerCase().charAt(index) === currentWordValue) {
        el.textContent = currentWordValue;
      }
    })
  const currentGuessedWord = Array.from(hiddenValue).map(el => el.textContent).join('');
  const finalAnswer = randomWord.answer.toLowerCase();
  
  if (currentGuessedWord === randomWord.answer.toLowerCase()) {
    fixedOverlay.classList.remove('hidden');
    fixedOverlay.append(modalWrapper);
    modalWrapper.append(modalContainer);
    youWin.textContent = 'You Win!'
    youWin.classList.add('win__text')
    finalWord.classList.add('final__result');
    finalWord.textContent = `Correct Answer: ${finalAnswer}`
    modalContainer.append(youWin, finalWord, resetButton);
    document.body.style.overflow = 'hidden';
    keyBoardArray.forEach((button) => {
      button.style.pointerEvents = 'none';
    });
    isGameOver = true;
    }
  } else {
    drawHangmanPart(livesRemaining);
    remainingTimes.innerHTML = `${--livesRemaining}/6 remaining tries`;
    if (livesRemaining === 0) {
      fixedOverlay.classList.remove('hidden');
      fixedOverlay.append(modalWrapper);
      modalWrapper.append(modalContainer);
      youLoose.textContent = 'You Loose!'
      youLoose.classList.add('loose__text')
      modalContainer.append(youLoose, resetButton)
      keyBoardArray.forEach((button) => {
        button.style.pointerEvents = 'none';
      })
      isGameOver = true;
    }
  }
  el.setAttribute('data-active', '');
}
  })
})

//сброс с кнопки



const clearGame = document.querySelector('.reset__button');
clearGame.addEventListener('click', () => {
  isGameOver = false;
  gameField.textContent = '';
  questionField.textContent = '';


  randomIndex = Math.floor(Math.random() * words.length)
  randomWord = words[randomIndex];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGallows();


  livesRemaining = 6;
  remainingTimes.innerHTML = `${livesRemaining}/6 remaining tries`;

  const hiddenValue = document.querySelectorAll('.word__letter');
  hiddenValue.forEach(el => {
    el.textContent = '_';
  });

  keyBoardArray.forEach(el => {
    el.removeAttribute('data-active');
  });

  youLoose.textContent = '';
  youWin.textContent = '';
  document.body.style.overflow = '';

  keyBoardArray.forEach((button) => {
    button.style.pointerEvents = '';
  })

  fixedOverlay.classList.add('hidden');

  keyContainer.append(resetButton);

  for (let i = 0; i < randomWord.answer.length; i++) {
    const createValue  = document.createElement('div');
    gameField.append(createValue);
    createValue.textContent = '_';
    createValue.classList.add('word__letter');
    createValue.setAttribute('data-id', i)
  }
  const createQuestion = document.createElement('p');
  questionField.append(createQuestion);
  createQuestion.textContent = randomWord.question;
})