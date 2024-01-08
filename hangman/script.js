import { words } from "./modules/words.js";
import { keyboard } from "./modules/keyboard.js";

const randomIndex = Math.floor(Math.random() * words.length)
const randomWord = words[randomIndex];
let livesRemaining = 6;
const guessWord = [];

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
keyContainer.append(gameField, questionField , keyboardWrapper);

// поле с остатком попыток

const remainingTimes = document.createElement('div');
remainingTimes.classList.add('remaining__wrapper');
remainingTimes.textContent = `${livesRemaining}/6 remaining tries`;
keyContainer.append(gameField, questionField, remainingTimes, keyboardWrapper);

//JS game functions

const getValue = () => {
  for (let i = 0; i < randomWord.answer.length; i++) {
    const createValue  = document.createElement('div');
    gameField.append(createValue);
    createValue.textContent = '_';
    createValue.classList.add('word__letter')
  }
  const createQuestion = document.createElement('p');
  questionField.append(createQuestion);
  createQuestion.textContent = randomWord.question;
}
getValue();

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

keyBoardArray.forEach((el) => {
  el.addEventListener('click', (e) => {
    const currentWordValue = e.target.innerText;
    if (randomWord.answer.toLowerCase().includes(currentWordValue)) {
      console.log(123);
    } else {
      remainingTimes.textContent = `${livesRemaining--}/6 remaining tries`;
    }
    guessWord.push(currentWordValue)
    console.log(guessWord, currentWordValue, randomWord.answer.toLowerCase());
    el.setAttribute('data-active', '');
  })
})

