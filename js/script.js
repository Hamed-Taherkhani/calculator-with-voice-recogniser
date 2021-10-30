const calculatorButtons = document.querySelectorAll("#calculator td section"),
  displayArea = document.querySelector("#display-area"),
  preview = document.querySelector("#preview-result");

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
    // If there are not any operator, removes whole values;
    if (!hasJSMathOperator(displayAreaValue)) displayArea.textContent = "";
  } else if (value === "=") {
    operateTheValues(displayAreaValue, "displayArea");
  } else if (displayAreaValue.length <= 18) {
    displayArea.textContent += value;
  }

  // Show result as a preview result. If exist math operator, preview is shown, otherwise is not shown.
  if (hasJSMathOperator(displayArea.textContent))
    operateTheValues(displayArea.textContent, "preview");
  else preview.textContent = "";
}

function removeLastCharacter(str) {
  let temp = str.slice(0, str.length - 1);
  displayArea.textContent = temp;
  operateTheValues(temp, "preview");
}

function operateTheValues(values, whereDisplayed) {
  // ×,÷,− are not a JS math operator. Need to change.
  values = values.replace(/÷/g, "/");
  values = values.replace(/×/g, "*");
  values = values.replace(/−/g, "-");
  values = values.replace(/%/g, "/100");
  let product = eval(values);
  if (whereDisplayed === "displayArea") {
    displayArea.textContent = product;
    // Clear preview section:
    preview.textContent = "";
  } else if (whereDisplayed === "preview") preview.textContent = product;
}

function hasJSMathOperator(str) {
  return (
    str.includes("÷") ||
    str.includes("−") ||
    str.includes("%") ||
    str.includes("+")
  );
}
