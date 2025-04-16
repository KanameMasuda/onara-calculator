let currentGameMode = null;
let currentQuestionIndex = 0;
let currentProblem = null;
let gameProblems = [];
const numberOfRandomQuestions = 10;

// ✅ 音声ファイルを再生する関数（main.jsにも同様の関数がある場合はどちらか一方を残してください）
function playSound(filePath) {
  const audio = new Audio(filePath);
  audio.play();
}

function startGame(mode) {
  currentGameMode = mode;
  currentQuestionIndex = 0;
  gameProblems = [];
  document.getElementById("display").value = ""; // Clear display
  console.log("startGame:", mode);
  console.log("gameProblems:", gameProblems);
  console.log("currentQuestionIndex:", currentQuestionIndex);

  if (mode === 'random') {
    generateRandomProblems(numberOfRandomQuestions);
    displayProblem();
  } else if (mode >= 1 && mode <= 9) {
    generateSequentialProblems(mode);
    displayProblem();
  } else if (mode === null) {
    document.getElementById("display").value = "段を選択してください";
  }
}

function generateSequentialProblems(dan) {
  for (let i = 1; i <= 9; i++) {
    gameProblems.push({ num1: dan, num2: i, question: `${dan}*${i}=?`, answer: dan * i });
  }
  console.log("generateSequentialProblems:", gameProblems);
}

function generateRandomProblems(count) {
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    gameProblems.push({ num1: num1, num2: num2, question: `${num1}*${num2}=?`, answer: num1 * num2 });
  }
  console.log("generateRandomProblems:", gameProblems);
}

function displayProblem() {
  if (currentQuestionIndex < gameProblems.length) {
    currentProblem = gameProblems[currentQuestionIndex];
    const questionWithSpaces = currentProblem.question + "         "; // 問題文に半角スペース5個を追加
    document.getElementById("display").value = questionWithSpaces; // スペースを追加した問題文を表示
    playSound('/audio/game-sound1.mp3'); // ✅ 問題表示時に game-sound1.mp3 を再生
    console.log("displayProblem:", currentProblem);
    console.log("currentQuestionIndex:", currentQuestionIndex);
  } else {
    document.getElementById("display").value = "Congratulations!  ";
    playSound('/audio/game-sound4.mp3'); // ✅ ゲーム終了時に game-sound4.mp3 を再生
    currentGameMode = null;
    currentProblem = null; // ゲーム終了時に currentProblem をリセット
    console.log("displayProblem: ゲーム終了");
    console.log("currentGameMode:", currentGameMode);
    console.log("currentProblem:", currentProblem);
  }
}


function checkAnswer(userAnswer) {
  console.log("checkAnswer - userAnswer:", userAnswer);
  console.log("checkAnswer - currentProblem:", currentProblem);
  console.log("checkAnswer - currentGameMode:", currentGameMode);

  if (!currentGameMode || !currentProblem) { // currentProblem が null の場合もチェック
    document.getElementById("display").value = "先にゲームを開始してください";
    return false;
  }

  if (parseInt(userAnswer, 10) === currentProblem.answer) {
    document.getElementById("display").value = "⚪︎      ";
    document.getElementById("display").style.color = "red";       // 文字色を赤に設定
    document.getElementById("display").style.fontSize = "3em";    // フォントサイズを少し大きく (例: 2倍)
    playSound('/audio/game-sound2.mp3'); // ✅ 正解時に game-sound2.mp3 を再生
    console.log("正解!");
    currentQuestionIndex++;
    console.log("currentQuestionIndex incremented:", currentQuestionIndex);
    setTimeout(() => {
      // 正解表示後、少し遅れて次の問題を表示する前にスタイルをリセット
      document.getElementById("display").style.color = "";
      document.getElementById("display").style.fontSize = "";
      displayProblem();
    }, 1000); // 1秒後に次の問題を表示
    return true;
  } else {
    document.getElementById("display").value = `△      `;
    document.getElementById("display").style.color = "blue";      // 文字色を青に設定
    document.getElementById("display").style.fontSize = "3em";   // フォントサイズを少し大きく (例: 2倍)
    playSound('/audio/game-sound3.mp3'); // ✅ 不正解時に game-sound3.mp3 を再生
    console.log("不正解!");
    setTimeout(() => {
      // 不正解表示後、少し遅れて問題を再表示する前にスタイルをリセット
      document.getElementById("display").style.color = "";
      document.getElementById("display").style.fontSize = "";
      const questionWithSpaces = currentProblem.question + "          "; // 問題文に半角スペース9個を追加
      document.getElementById("display").value = questionWithSpaces; // スペースを追加した問題文を再表示
    }, 1500);
    return false;
  }
}

function getCurrentGameMode() {
  return currentGameMode;
}

export { startGame, checkAnswer, getCurrentGameMode };