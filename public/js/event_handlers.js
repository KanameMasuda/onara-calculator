// event_handlers.js

import { toggleSoundMode, playSoundOnClick, playSoundOnEqual, playSoundOnClear } from '/js/sound_controller.js';
import { startGame as startGameController, checkAnswer as checkAnswerController, getCurrentGameMode } from '/js/game_controller.js';
import {
  getDisplayElement,
  getSoundButton,
  getSoundMenu,
  getGameButton,
  getGameMenu,
  updateDisplay,
  getDisplayValue,
} from '/js/ui_controller.js';

let isSoundMenuOpen = false;
let isGameMenuOpen = false;
let calculationResult = null;

// 🎵 ♪ボタンの処理
function handleSoundButtonClick() {
  const gameMenu = getGameMenu();
  const soundMenu = getSoundMenu();
  if (isGameMenuOpen) {
    gameMenu.style.display = "none";
    isGameMenuOpen = false;
  }
  soundMenu.style.display = soundMenu.style.display === "block" ? "none" : "block";
  isSoundMenuOpen = !isSoundMenuOpen;
}

// 🎮 gボタンの処理
function handleGameButtonClick() {
  const soundMenu = getSoundMenu();
  const gameMenu = getGameMenu();
  toggleSoundMode('OFF'); // ✅ Gボタンクリック時にサウンドをOFFにする
  if (isSoundMenuOpen) {
    soundMenu.style.display = "none";
    isSoundMenuOpen = false;
  }
  gameMenu.style.display = gameMenu.style.display === "block" ? "none" : "block";
  isGameMenuOpen = !isGameMenuOpen;
}

// ✅ 外側をクリックしたらメニューを閉じる処理
function handleDocumentClick(event) {
  const soundBtn = getSoundButton();
  const soundMenu = getSoundMenu();
  const gameBtn = getGameButton();
  const gameMenu = getGameMenu();

  if (isSoundMenuOpen && !soundBtn.contains(event.target) && !soundMenu.contains(event.target)) {
    soundMenu.style.display = "none";
    isSoundMenuOpen = false;
  }

  if (isGameMenuOpen && !gameBtn.contains(event.target) && !gameMenu.contains(event.target)) {
    gameMenu.style.display = "none";
    isGameMenuOpen = false;
  }
}

// サウンド切り替え処理
function handleSoundModeOffClick() {
  toggleSoundMode('OFF');
}

function handleSoundMode1Click() {
  toggleSoundMode('1');
}

function handleSoundMode2Click() {
  toggleSoundMode('2');
}

// ゲームメニューのイベントリスナー
function handleMultiplicationButtonClick(mode) {
  startGameController(mode);
  updateDisplay("");
}

// ボタンのクリック処理
function handleNumberButtonClick(value) {
  const currentGame = getCurrentGameMode();
  const displayElement = getDisplayElement();
  if (currentGame) {
    const parts = displayElement.value.split('=?');
    updateDisplay(parts[0] + '=?' + (parts[1] || '') + value);
  } else {
    updateDisplay(getDisplayValue() + value);
  }
  console.log(`ボタンが押されました: ${value}`);
  playSoundOnClick();
}

// ✅ クリアボタン処理
function handleClearButtonClick() {
  updateDisplay("");
  console.log("クリアボタンが押されました");
  playSoundOnClear();
}

// ✅ = ボタンの処理
function handleEqualButtonClick() {
  playSoundOnEqual();
  const currentGame = getCurrentGameMode();
  const displayElement = getDisplayElement();

  if (currentGame) {
    const userAnswer = getDisplayValue().split('=?')[1];
    if (userAnswer !== undefined && userAnswer.trim() !== "") {
      checkAnswerController(parseInt(userAnswer));
    }
  } else {
    try {
      calculationResult = math.evaluate(getDisplayValue());
      updateDisplay("");
      setTimeout(() => updateDisplay(calculationResult), 3000);
      calculationResult = null;
    } catch (error) {
      updateDisplay("Error");
    }
  }
}

export {
  handleSoundButtonClick,
  handleGameButtonClick,
  handleDocumentClick,
  handleSoundModeOffClick,
  handleSoundMode1Click,
  handleSoundMode2Click,
  handleMultiplicationButtonClick,
  handleNumberButtonClick,
  handleClearButtonClick,
  handleEqualButtonClick,
};