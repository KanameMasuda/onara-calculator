// ゲーム終了時に音を再生する関数
function playGameOverSound() {
  const audio = new Audio('/audio/game-sound6.mp3'); // ゲーム終了音
  audio.play(); // 音を再生
}

// ゲーム開始時に音を再生する関数
function playStartGameSound() {
  const audio = new Audio('/audio/game-sound7.mp3'); // ゲーム開始音
  audio.play(); // 音を再生
}

// "セーフ!" の音を再生する関数
function playComeOnSound() {
  const audio = new Audio('/audio/game-sound2.mp3'); // "セーフ!" の音
  audio.play(); // 音を再生
}

// ゲームモードの管理
let currentGameMode = ''; // 'blackbeard' または 'multiplication' を設定

// 黒ひげ危機一発ゲームの状態管理
let randomNumber;
let userInput = "";

// ゲームの表示領域
const display = document.getElementById("display");

// 黒ひげ危機一発ゲーム開始
function startBlackbeardGame() {
  currentGameMode = 'blackbeard'; // 黒ひげ危機一発モードに設定
  randomNumber = Math.floor(Math.random() * 10); // ランダムな数字
  console.log("ランダム数字:", randomNumber); // デバッグ用

  // "黒ひげ危機一髪!" を表示してゲームを開始
  display.value = "黒ひげ危機一髪！";
  playStartGameSound(); // ゲーム開始音を再生

  // ユーザー入力をリセット
  userInput = "";

  
}

// 数字ボタンが押されたときの処理
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", (event) => {
    const value = event.target.getAttribute("data-value");
    
    // ゲームモードに応じて処理
    if (currentGameMode === 'blackbeard') {
      // 黒ひげ危機一発ゲームの場合
      userInput += value;
      display.value = userInput; // 入力された数字を表示
    } else if (currentGameMode === 'multiplication') {
      // 九九ゲームの場合
      // ここに九九ゲーム用の処理を追加
    }
  });
});

// ゲーム結果の判定 (黒ひげ危機一発の結果)
document.getElementById("equal-btn").addEventListener("click", () => {
  if (currentGameMode === 'blackbeard') {
    if (userInput === String(randomNumber)) {
      display.value = "Game over!      "; // ゲーム終了
      playGameOverSound(); // 音を再生
    } else {
      display.value = "セーフ!         "; // 次を待機
      playComeOnSound(); // "Come on!" の音を再生
    }
    userInput = ""; // 入力をリセット
  }
  // もし九九のゲームの結果判定をしたい場合は、ここに追加
});

// ゲームボタンのクリックでゲームを開始 (黒ひげ危機一発)
document.getElementById("blackbeard-btn").addEventListener("click", startBlackbeardGame);

// 九九ゲームの処理
document.querySelectorAll(".multiplication-btn").forEach(button => {
  button.addEventListener("click", (event) => {
    const mode = event.target.getAttribute("data-mode");
    currentGameMode = 'multiplication'; // 九九ゲームモードに設定
    
    // 選択された段の処理
    if (mode === 'random') {
      // ランダムな九九の段
      const randomMode = Math.floor(Math.random() * 9) + 1;
      display.value = `${randomMode}の段を選択`;
    } else {
      display.value = `${mode}の段を選択`;
    }
    // 九九ゲームをここで開始するロジックを追加
  });
});

// 初期表示の調整
document.getElementById("blackbeard-btn").click(); // ページが読み込まれたときに黒ひげゲームを開始