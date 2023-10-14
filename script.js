// Strategy pattern

const calculator = (function () {
  let displayValue = "";
  let currentValue = null;
  let currentOperator = null;
  let history = [];

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b === 0) {
        alert("Деление на ноль недопустимо!");
        clearDisplay();
        return null;
      }
      return a / b;
    },
    "^": (a, b) => Math.pow(a, b),
    sqrt: (a) => Math.sqrt(a),
  };

  function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
  }

  function clearDisplay() {
    displayValue = "";
    currentValue = null;
    currentOperator = null;
    document.getElementById("display").value = "";
  }

  function operate(operator) {
    if (currentValue === null) {
      currentValue = parseFloat(displayValue);
      displayValue = "";
      currentOperator = operator;
    } else {
      currentValue = calculate();
      currentOperator = operator;
      displayValue = "";
    }
  }

  function calculate() {
    const value = parseFloat(displayValue);

    if (currentOperator in operations) {
      const result = operations[currentOperator](currentValue, value);

      if (result !== null) {
        const operationText =
          currentValue + " " + currentOperator + " " + value + " = " + result;
        history += operationText + "<br>";
        document.getElementById("history").innerHTML = history;
        currentValue = result;
        displayValue = currentValue.toString();
        document.getElementById("display").value = displayValue;
      }
    } else {
      alert("Неверный оператор!");
      clearDisplay();
    }

    return currentValue;
  }

  return {
    appendToDisplay,
    clearDisplay,
    operate,
    calculate,
  };
})();
