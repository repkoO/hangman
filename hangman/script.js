import { words } from "./modules/words.js";
import { keyboard } from "./modules/keyboard.js";

const randomIndex = Math.floor(Math.random() * words.length)
const randomWord = words[randomIndex];
let livesRemaining = 6;

const mainWrapper = document.createElement('div');

document.body.append(mainWrapper);
mainWrapper.classList.add('container');

const gameContainer = document.createElement('div');
const keyContainer = document.createElement('div');
gameContainer.classList.add('game__container');
keyContainer.classList.add('control__container');

mainWrapper.append(gameContainer, keyContainer);

const imgContainer = document.createElement('div');
const gameTitle = document.createElement('h1');
imgContainer.classList.add('img__container');
gameTitle.textContent = 'Hangman Game';

gameContainer.append(imgContainer, gameTitle)

const imgFile = document.createElement('img');
imgFile.src = './assets/gallows.png'
imgFile.classList.add('img__gallow')
imgContainer.append(imgFile);


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


//слушатель при клике на кнопку

const keyBoardArray = document.querySelectorAll('.game__button');
const youWin = document.createElement('div');
const youLoose = document.createElement('div');

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
  if (currentGuessedWord === randomWord.answer.toLowerCase()) {
    youWin.classList.add('win__text');
    keyContainer.append(youWin);
    youWin.textContent = 'You Win! \n Reset The Game'
    keyBoardArray.forEach((button) => {
      button.style.pointerEvents = 'none';
    })
    }
  } else {
    drawHangmanPart(livesRemaining);
    remainingTimes.innerHTML = `${--livesRemaining}/6 remaining tries`;
    if (livesRemaining === 0) {
      youLoose.classList.add('loose__text');
      youLoose.textContent = 'You Loose! :( \n Reset The Game'
      keyContainer.append(youLoose);
      keyBoardArray.forEach((button) => {
        button.style.pointerEvents = 'none';
      })
    }
  }
  el.setAttribute('data-active', '');
  })
})

const canvasGraphic = document.createElement('canvas');
mainWrapper.append(canvasGraphic);
canvasGraphic.setAttribute('width', '150px');
canvasGraphic.setAttribute('height', '300px');
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function drawHangmanPart(lives) {
  switch (lives) {
    case 6:
      // Draw the head
      ctx.beginPath();
      ctx.arc(60, 60, 20, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'red';
      ctx.stroke();
      ctx.closePath();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(60, 220);
      ctx.lineTo(60, 80);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(60, 120);
      ctx.lineTo(10, 100);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(62, 120);
      ctx.lineTo(110, 100);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(60, 220);
      ctx.lineTo(190, 370);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(60, 220);
      ctx.lineTo(10, 300);
      ctx.stroke();
       break;
  }
}

//сброс с кнопки

const clearGame = document.querySelector('.reset__button');
clearGame.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  keyBoardArray.forEach((button) => {
    button.style.pointerEvents = '';
  })
})