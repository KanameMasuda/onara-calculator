let currentSoundMode = 'OFF';
let clickSound1;
let clickSound2;

function initializeSound() {
  clickSound1 = document.getElementById("clickSound1");
  clickSound2 = document.getElementById("clickSound2");
  console.log("Audio オブジェクトが初期化されました (sound_controller.js)");
}

function toggleSoundMode(mode) {
  currentSoundMode = mode;
  console.log(`サウンドモードを ${currentSoundMode} に切り替え (sound_controller.js)`);
  const soundMenu = document.querySelector(".sound-menu");
  if (soundMenu) {
    soundMenu.style.display = "none"; // メニューを閉じる
  }
  const soundBtn = document.querySelector(".sound-btn");
  if (soundBtn) {
    const modeText = mode === 'OFF' ? '♪' : (mode === '1' ? '♪1' : '♪2');
    soundBtn.textContent = modeText; // ボタンの表示を更新 (任意)
  }
}

function playSoundOnClick() {
  if (currentSoundMode === '1' && clickSound1) {
    clickSound1.play();
  }
}

function playSoundOnEqual() {
  if (currentSoundMode === '1' && clickSound1) {
    clickSound1.play();
  } else if (currentSoundMode === '2' && clickSound2) {
    clickSound2.play();
  }
}

function playSoundOnClear() {
  if (currentSoundMode === '2' && clickSound1) {
    clickSound1.play();
  } else {
    playSoundOnClick(); // Sound1 の設定に従う
  }
}

export { initializeSound, toggleSoundMode, playSoundOnClick, playSoundOnEqual, playSoundOnClear, currentSoundMode };