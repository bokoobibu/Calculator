// Получаем элементы калькулятора
const display = document.querySelector('.display');
const operation = document.querySelector('#operation');
const result = document.querySelector('#result');
const clearAll = document.querySelector('#clear-all');
const sign = document.querySelector('#sign');
const percent = document.querySelector('#percent');
const clear = document.querySelector('#clear');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const subtract = document.querySelector('#subtract');
const add = document.querySelector('#add');
const equals = document.querySelector('#equals');
const decimal = document.querySelector('#decimal');
const buttons = document.querySelectorAll('.buttons button:not(#clear-all):not(#sign):not(#percent):not(#clear):not(#divide):not(#multiply):not(#subtract):not(#add):not(#equals):not(#decimal)');

// Объявляем переменные для хранения данных
let currentNumber = '';
let previousNumber = '';
let currentOperation = null;
let shouldResetDisplay = false;

// Функция для обновления поля результата
function updateResult() {
  result.value = currentNumber;
}

// Функция для обновления поля операции
function updateOperation() {
  operation.textContent = `${previousNumber} ${currentOperation || ''}`;
}

// Функция для выполнения операции
function performOperation() {
  switch (currentOperation) {
    case '+':
      currentNumber = parseFloat(previousNumber) + parseFloat(currentNumber);
      break;
    case '-':
      currentNumber = parseFloat(previousNumber) - parseFloat(currentNumber);
      break;
    case '*':
      currentNumber = parseFloat(previousNumber) * parseFloat(currentNumber);
      break;
    case '/':
      currentNumber = parseFloat(previousNumber) / parseFloat(currentNumber);
      break;
    default:
      return;
  }
  currentNumber = currentNumber.toString();
  currentOperation = null;
  previousNumber = '';
}

// Обработчик клика по кнопкам
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (shouldResetDisplay) {
      currentNumber = '';
      shouldResetDisplay = false;
    }
    currentNumber += button.textContent;
    updateResult();
  });
});

// Обработчик клика по кнопке "+/-"
sign.addEventListener('click', () => {
  currentNumber = (parseFloat(currentNumber) * -1).toString();
  updateResult();
});

// Обработчик клика по кнопке "%"
percent.addEventListener('click', () => {
  currentNumber = (parseFloat(currentNumber) / 100).toString();
  updateResult();
});

// Обработчик клика по кнопке "C"
clear.addEventListener('click', () => {
  currentNumber = currentNumber.slice(0, -1);
  updateResult();
});

// Обработчик клика по кнопке "AC"
clearAll.addEventListener('click', () => {
  currentNumber = '';
  previousNumber = '';
  currentOperation = null;
  updateResult();
  updateOperation();
});

// Обработчик клика по кнопке операции
divide.addEventListener('click', () => {
  if (currentOperation) {
    performOperation();
    updateResult();
  }
  currentOperation = '/';
  previousNumber = currentNumber;
  currentNumber = '';
  updateOperation();
  shouldResetDisplay = false;
});

multiply.addEventListener('click', () => {
  if (currentOperation) {
    performOperation();
    updateResult();
  }
  currentOperation = '*';
  previousNumber = currentNumber;
  currentNumber = '';
  updateOperation();
  shouldResetDisplay = false;
});

subtract.addEventListener('click', () => {
  if (currentOperation) {
    performOperation();
    updateResult();
  }
  currentOperation = '-';
  previousNumber = currentNumber;
  currentNumber = '';
  updateOperation();
  shouldResetDisplay = false;
});

add.addEventListener('click', () => {
  if (currentOperation) {
    performOperation();
    updateResult();
  }
  currentOperation = '+';
  previousNumber = currentNumber;
  currentNumber = '';
  updateOperation();
  shouldResetDisplay = false;
});

// Обработчик клика по кнопке "="
equals.addEventListener('click', () => {
  if (currentOperation) {
    performOperation();
    updateResult();
    updateOperation();
    shouldResetDisplay = true;
  }
});

// Обработчик клика по кнопке "."
decimal.addEventListener('click', () => {
  if (currentNumber.includes('.')) {
    return;
  }
  currentNumber += '.';
  updateResult();
});

// Обработчик нажатия клавиш на клавиатуре
document.addEventListener('keydown', event => {
  const key = event.key;
  if (/\d/.test(key)) {
    buttons.forEach(button => {
      if (button.textContent === key) {
        button.click();
      }
    });
  } else if (key === '.') {
    decimal.click();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    if (currentOperation) {
      performOperation();
      updateResult();
    }
    currentOperation = key;
    previousNumber = currentNumber;
    currentNumber = '';
    updateOperation();
    shouldResetDisplay = false;
  } else if (key === 'Enter' || key === '=') {
  equals.click();
  } else if (key === 'Backspace') {
      clear.click();
  } else if (key === 'Escape') {
    clearAll.click();
  }
}); 