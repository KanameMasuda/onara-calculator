import {
  initializeSound,
  toggleSoundMode,
  playSoundOnClick,
  playSoundOnEqual,
  playSoundOnClear,
  currentSoundMode,
} from '/js/sound_controller.js';

import {
  startGame as startGameController,
  checkAnswer as checkAnswerController,
  getCurrentGameMode,
} from '/js/game_controller.js';

let currentScript = "calculator_off.js";
let isSoundMenuOpen = false;
let isGameMenuOpen = false;
let calculationResult = null;

// ✅ スクリプトのロード
function loadScript(scriptName) {
  const existingScript = document.getElementById("calculator-script");
  if (existingScript) existingScript.remove();

  const script = document.createElement("script");
  script.src = `/js/${scriptName}`;
  script.id = "calculator-script";
  script.type = "module";

  script.onload = () => console.log(`${scriptName}が正常にロードされました`);
  script.onerror = (error) => console.error(`${scriptName}の読み込みに失敗しました`, error);

  document.body.appendChild(script);
  currentScript = scriptName;
}

// ✅ 黒ひげ危機一発ボタン（DOMContentLoaded外）
document.querySelector("#blackbeard-btn").addEventListener("click", () => {
  loadScript("blackbeard_game.js");
  console.log("黒ひげ危機一発ゲームのロードを試みます");
});

document.addEventListener("DOMContentLoaded", () => {
  loadScript("calculator_off.js");
  initializeSound();

  const soundBtn = document.querySelector(".sound-btn");
  const soundMenu = document.querySelector(".sound-menu");
  const gameBtn = document.querySelector(".game-btn");
  const gameMenu = document.querySelector(".game-selector");
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("#buttons .btn");
  const clearButton = document.getElementById("clear-btn");
  const equalButton = document.getElementById("equal-btn");

  // 🎵 サウンドメニュー表示切り替え
  soundBtn.addEventListener("click", () => {
    if (isGameMenuOpen) {
      gameMenu.style.display = "none";
      isGameMenuOpen = false;
    }
    soundMenu.style.display = soundMenu.style.display === "block" ? "none" : "block";
    isSoundMenuOpen = !isSoundMenuOpen;
  });

  // 🎮 ゲームメニュー表示切り替え（＋サウンドOFF）
  gameBtn.addEventListener("click", () => {
    toggleSoundMode('OFF');
    if (isSoundMenuOpen) {
      soundMenu.style.display = "none";
      isSoundMenuOpen = false;
    }
    gameMenu.style.display = gameMenu.style.display === "block" ? "none" : "block";
    isGameMenuOpen = !isGameMenuOpen;
  });

  // 外部クリックでメニューを閉じる
  document.addEventListener("click", (event) => {
    if (isSoundMenuOpen && !soundBtn.contains(event.target) && !soundMenu.contains(event.target)) {
      soundMenu.style.display = "none";
      isSoundMenuOpen = false;
    }

    if (isGameMenuOpen && !gameBtn.contains(event.target) && !gameMenu.contains(event.target)) {
      gameMenu.style.display = "none";
      isGameMenuOpen = false;
    }
  });

  // サウンド切り替え
  soundMenu.querySelectorAll("button").forEach((btn, idx) => {
    const mode = idx === 0 ? 'OFF' : String(idx);
    btn.addEventListener("click", () => toggleSoundMode(mode));
  });

  // 九九ゲーム選択ボタン（1〜9、ランダム）
  const multiplicationButtons = document.querySelectorAll(".multiplication-btn");
  multiplicationButtons.forEach((btn, index) => {
    const mode = index === 9 ? 'random' : index + 1;
    btn.addEventListener("click", () => startGameController(mode));
  });

  // 電卓ボタン
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      const currentGame = getCurrentGameMode();

      if (currentGame) {
        const parts = display.value.split('=?');
        const currentAnswer = parts[1] || '';
        display.value = parts[0] + '=?' + currentAnswer + value;
      } else {
        display.value += value;
      }

      playSoundOnClick();
      console.log(`ボタンが押されました: ${value}`);
    });
  });

  // クリア
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      display.value = "";
      console.log("クリアボタンが押されました");
      playSoundOnClear();
    });
  }

  // イコール
  if (equalButton) {
    equalButton.addEventListener("click", () => {
      playSoundOnEqual();
      const currentGame = getCurrentGameMode();

      if (currentGame) {
        const userAnswer = display.value.split('=?')[1];
        if (!userAnswer || userAnswer.trim() === "") {
          console.log("答えが入力されていません");
          return;
        }
        checkAnswerController(parseInt(userAnswer));
      } else {
        try {
          const result = math.evaluate(display.value);
          if (currentSoundMode === '2') {
            display.value = "";
            calculationResult = result;
            setTimeout(() => {
              display.value = calculationResult;
              calculationResult = null;
            }, 3000);
          } else {
            display.value = result;
          }
        } catch (error) {
          display.value = "Error";
        }
      }
    });
  }
});