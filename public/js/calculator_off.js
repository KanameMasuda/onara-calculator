function press(val) {
  document.getElementById("display").value += val;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  let expression = document.getElementById("display").value;
  try {
    let result = math.evaluate(expression);
    document.getElementById("display").value = result;
  } catch (e) {
    alert("計算エラー");
    clearDisplay();
  }
}