const numbers = document.querySelectorAll(".number");
const actions = document.querySelectorAll(".action");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector("#equal");
const led = document.querySelector("#led div");
const answer = document.querySelector("#answer");
const warning = document.querySelector("#warning");
let arrayCalc = [];
let operationInUse = "";
let index = 0;
let display = document.querySelector("#value p");
let resp = "";
let length = display.innerHTML.length;

// ERR
const err = function (length) {
  if (length === 9) {
    warning.innerHTML = `<p> ERR </p>`;
    display.innerHTML = display.innerHTML.slice(0, -1);
    index -= 1;
  } else {
    warning.innerHTML = "";
  }
};

// Numbers
numbers.forEach((i) => {
  i.addEventListener("click", () => {
    display.innerHTML += i.value;
    led.style.backgroundColor = "var(--white)";
    if (operationInUse === "") {
      index++;
    }
    err(display.innerHTML.length);
  });
});
// Operators
operations.forEach((i) => {
  i.addEventListener("click", () => {
    if (operationInUse === "") {
      arrayCalc.push(+display.innerHTML);
      operationInUse = i.value;
      display.innerHTML += i.value;
      index++;
    } else {
      led.style.backgroundColor = "var(--brown)";
    }
    err(display.innerHTML.length);
  });
});
// Equal
equal.addEventListener("click", () => {
  arrayCalc.push(+display.innerHTML.slice(index, display.innerHTML.length));
  resp = arrayCalc.reduce((acm, item) => {
    if (operationInUse === "/") {
      return acm / item;
    } else if (operationInUse === "*") {
      return acm * item;
    } else if (operationInUse === "+") {
      return acm + item;
    } else if (operationInUse === "-") {
      return acm - item;
    }
  });
  if (resp === undefined) {
    answer.innerHTML = "";
    warning.innerHTML = `<p> ERR </p>`;
  } else {
    answer.innerHTML = `<p> ${parseFloat(resp.toFixed(3))} </p>`;
    warning.innerHTML = "";
  }
});
// Actions
actions[0].addEventListener("click", () => {
  display.innerHTML = "";
  arrayCalc = [];
  operationInUse = "";
  index = 0;
  led.style.backgroundColor = "var(--white)";
});
actions[1].addEventListener("click", () => {
  index -= 1;
  display.innerHTML = display.innerHTML.slice(0, -1);
  // arrayCalc.push(+display.innerHTML.slice(0, index));
});
