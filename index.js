const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const input = document.querySelector("input");
const equal = document.querySelector(".equal");
const cancel = document.querySelector(".cancel");
const ce = document.querySelector(".ce");
const MS = document.querySelector(".MS");
const MC = document.querySelector(".MC");
const MR = document.querySelector(".MR");
const MPlus = document.querySelector(".MPlus");
const MMinus = document.querySelector(".MMinus");
const pi = document.querySelector(".pi");
const e = document.querySelector(".e");
const operations = document.querySelectorAll(".operation");
const brackets = document.querySelectorAll(".bracket");

let previousResult = "";
let currentResult = "";
let operator;
let display = document.querySelector(".result");
let ms = "";

let count = 0;

//For accessing brackets
brackets.forEach(function (bracket) {
  bracket.addEventListener("click", function () {
    input.value += this.innerText;
    console.log(this.innerText);

    if (input.value === "(") {
      count++;
      console.log(count);
    } else {
      count--;
      display.innerHTML = input.value;
      currentResult = eval(input.value);
      input.value = currentResult;
      calculateOperation(operator);
      operator = undefined;
    }
  });
});

//For accessing Numbers
digits.forEach(function (digit) {
  digit.addEventListener("click", function () {
    input.value += this.innerText;
    currentResult = parseFloat(input.value);
  });
});

//For accessing operators
operators.forEach(function (myOperator) {
  myOperator.addEventListener("click", function () {
    if (currentResult == "") return;
    if (count !== 0) {
      input.value += this.innerHTML;
      console.log(input.value);
      return;
    }
    console.log("i am called");

    if (operator === undefined) {
      console.log();
      operator = this.innerHTML;
      display.innerHTML = `${currentResult} ${operator}`;
      previousResult = currentResult;
      input.value = "";
    } else {
      calculateOperation(operator);
      operator = this.innerHTML;
      display.innerHTML = `${currentResult} ${operator}`;
      previousResult = currentResult;
      input.value = "";
    }
  });
});

//To perform basic operations
function calculateOperation(operator) {
  operator =
    typeof operator !== "undefined"
      ? operator
      : display.innerHTML[display.innerHTML.length - 1];

  if (operator === "") console.log("operator is empty");
  else if (operator === "+") {
    input.value = parseFloat(previousResult) + parseFloat(currentResult);
    display.innerHTML = `${previousResult} ${operator} ${currentResult}`;
  } else if (operator === "-") {
    input.value = parseFloat(previousResult) - parseFloat(currentResult);
    display.innerHTML = `${previousResult} ${operator} ${currentResult}`;
  } else if (operator === "*") {
    input.value = parseFloat(previousResult) * parseFloat(currentResult);
    display.innerHTML = `${previousResult} ${operator} ${currentResult}`;
  } else if (operator === "/") {
    input.value = parseFloat(previousResult) / parseFloat(currentResult);
    display.innerHTML = `${previousResult} ${operator} ${currentResult}`;
  } else if (operator === "d") {
    //modulo operation
    input.value = parseFloat(previousResult) % parseFloat(currentResult);
    operator = "%";
    display.innerHTML = `${previousResult} ${operator} ${currentResult}`;
  } else if (operator === ">") {
    //x resTo y
    input.value = Math.pow(
      parseFloat(previousResult),
      parseFloat(currentResult)
    );
    operator = "^";
    display.innerHTML = `${previousResult} ${operator} ${currentResult}`;
  }
  currentResult = input.value;
}

//for different operations
operations.forEach(function (operation) {
  operation.addEventListener("click", function () {
    let text = this.innerHTML;
    console.log(text);

    if (input.value === "") return;
    let operator = display.innerHTML[display.innerHTML.length - 1];
    if (text === "sin") {
      //sin
      display.innerHTML = `sin(${input.value})`;
      input.value = Math.sin(input.value);
    } else if (text === "cos") {
      //cos
      display.innerHTML = `cos(${input.value})`;
      input.value = Math.cos(input.value);
    } else if (text === "tan") {
      //tan
      display.innerHTML = `tan(${input.value})`;
      input.value = Math.tan(input.value);
    } else if (text === "cot") {
      //cot
      display.innerHTML = `cot(${input.value})`;
      input.value = 1 / Math.tan(input.value);
    } else if (text === "⌈x⌉") {
      //ceil
      display.innerHTML = `ceil(${input.value})`;
      input.value = Math.ceil(input.value);
    } else if (text === "⌊x⌋") {
      //floor
      display.innerHTML = `floor(${input.value})`;
      input.value = Math.floor(input.value);
    } else if (text === "log") {
      //log
      display.innerHTML = `logOf(${input.value})`;
      input.value = Math.log10(input.value, 2);
    } else if (text === "ln") {
      //ln
      display.innerHTML = `lnOf(${input.value})`;
      input.value = Math.log(input.value);
    } else if (text === "+/-") {
      //+/-
      input.value = parseFloat(input.value) * -1;
    } else if (text === "x<sup>2</sup>") {
      //square
      display.innerHTML = `square(${input.value})`;
      input.value = Math.pow(parseFloat(input.value), 2);
    } else if (text === "10<sup>x</sup>") {
      //10resTo
      display.innerHTML = `10resTo(${input.value})`;
      input.value = Math.pow(10, parseFloat(input.value));
    } else if (text === "<sup>1</sup>/x") {
      display.innerHTML = `inverse(${input.value})`;
      input.value = 1 / parseFloat(input.value);
    } else if (text === "exp") {
      //exp
      display.innerHTML = `exp(${input.value})`;
      input.value = Math.exp(parseFloat(input.value));
    } else if (text === "√x") {
      //root
      display.innerHTML += ` sqrt(${input.value})`;
      input.value = Math.sqrt(input.value);
    } else if (text === "n!") {
      //factorial
      let number = parseFloat(input.value);
      let fact = 1;
      for (i = number; i >= 1; i--) {
        fact = fact * i;
      }
      display.innerHTML = `factorial(${input.value})`;
      input.value = fact;
    } else if (text === "|x|") {
      //mod
      if (input.value < 0) input.value = parseFloat(input.value) * -1;
    }

    currentResult = input.value;
    calculateOperation(operator);
  });
});

//For clear button
ce.addEventListener("click", () => {
  input.value = "";
  display.innerHTML = "";
  previousResult = "";
  currentResult = "";
  operator = undefined;
});

//For cancel button - to undo action
cancel.addEventListener("click", () => {
  input.value = input.value.slice(0, input.value.length - 1);
});

//For equal button
equal.addEventListener("click", () => {
  calculateOperation();
  currentResult = parseFloat(input.value);
  operator = undefined;
});

//for pi
pi.addEventListener("click", () => {
  input.value = 3.14159265359;
  currentResult = input.value;
});

//for e
e.addEventListener("click", () => {
  input.value = 2.71828;
  currentResult = input.value;
});

//for MS
MS.addEventListener("click", () => {
  if (input.value == "") return;
  ms = input.value;
  input.value = "";
});

//for MC
MC.addEventListener("click", () => {
  ms = "";
});

//for MS
MR.addEventListener("click", () => {
  input.value = ms;
});

//for M+
MPlus.addEventListener("click", () => {
  if (ms === "") return;
  input.value = parseFloat(currentResult) + parseFloat(ms);
  display.innerHTML = `${currentResult} + ${ms}`;
  currentResult = input.value;
});

//for M-
MMinus.addEventListener("click", () => {
  if (ms === "") return;
  input.value = parseFloat(currentResult) - parseFloat(ms);
  display.innerHTML = `${currentResult} - ${ms}`;
  currentResult = input.value;
});

//for accessing from key board
document.addEventListener("keyup", (e) => {
  if (
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0"
  ) {
    input.value += e.key;
    currentResult = parseFloat(input.value);
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    if (currentResult == "") return;

    if (operator === undefined) {
      operator = e.key;
      display.innerHTML = `${currentResult} ${operator}`;
      previousResult = currentResult;
      input.value = "";
    } else {
      calculateOperation(operator);
      operator = e.key;
      display.innerHTML = `${currentResult} ${operator}`;
      previousResult = currentResult;
      input.value = "";
    }
  }
  if (e.key === "(")
    if (e.key === "=") {
      calculateOperation();
      currentResult = parseFloat(input.value);
      operator = undefined;
    }
  if (e.keyCode === 8) {
    input.value = input.value.slice(0, input.value.length - 1);
  }
});
