const calculatorButtons = document.querySelectorAll("#calculator td section"),
  displayArea = document.querySelector("#display-area");

//   Add listener for every buttons and handle them:
calculatorButtons.forEach((value) => {
  value.addEventListener("click", handelClick);
});

// Push text content(value) of clicked buttons to display area, and add clear and equality functionality:
function handelClick() {
  const value = this.textContent,
    displayAreaValue = displayArea.textContent;

  // Removes the zero from display area. When clicked for first time.
  if (displayAreaValue === "0") removeLastCharacter(displayAreaValue);

  if (value === "CE") {
    // A section of a string from 0 to end - 1 (remove the last character).
    removeLastCharacter(displayAreaValue);
  } else if (value === "=") {
    operateTheValues(displayAreaValue);
  } else displayArea.textContent += value;
}

function removeLastCharacter(str) {
  displayArea.textContent = str.slice(0, str.length - 1);
}

function operateTheValues(values) {
  // ×,÷,− are not a JS math operator. Need to change.
  values = values.replace(/÷/g, "/");
  values = values.replace(/×/g, "*");
  values = values.replace(/−/g, "-");
  let product = eval(values);
  displayArea.textContent = product;
}
