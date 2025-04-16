// ui_controller.js

const displayElement = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons .btn');
const clearButton = document.getElementById('clear-btn');
const equalButton = document.getElementById('equal-btn');
const soundBtn = document.querySelector('.sound-btn');
const soundMenu = document.querySelector('.sound-menu');
const gameBtn = document.querySelector('.game-btn');
const gameMenu = document.querySelector('.game-selector');
const multiplicationButtons = document.querySelectorAll('.multiplication-btn');

function getDisplayElement() {
  return displayElement;
}

function getButtons() {
  return buttons;
}

function getClearButton() {
  return clearButton;
}

function getEqualButton() {
  return equalButton;
}

function getSoundButton() {
  return soundBtn;
}

function getSoundMenu() {
  return soundMenu;
}

function getGameButton() {
  return gameBtn;
}

function getGameMenu() {
  return gameMenu;
}

function getMultiplicationButtons() {
  return multiplicationButtons;
}

function updateDisplay(value) {
  if (displayElement) {
    displayElement.value = value;
  }
}

function getDisplayValue() {
  return displayElement ? displayElement.value : '';
}

export {
  getDisplayElement,
  getButtons,
  getClearButton,
  getEqualButton,
  getSoundButton,
  getSoundMenu,
  getGameButton,
  getGameMenu,
  getMultiplicationButtons,
  updateDisplay,
  getDisplayValue,
};