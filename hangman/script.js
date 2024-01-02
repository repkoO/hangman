import { words } from "./modules/words.js";
import { keyboard } from "./modules/keyboard.js";

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
gameTitle.textContent = 'Hangman Game'

gameContainer.append(imgContainer, gameTitle)
