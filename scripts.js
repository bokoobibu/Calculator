// Объявляем элементы из DOM
const display = document.getElementById('result');
const operationDisplay = document.getElementById('operation');

// Объявляем переменные для операндов, оператора и результата
let firstOperand = null;
let operator = null;
let secondOperand = null;
let result = null;

// Функция для очистки всех значений
function clearAll() {
  display.value = '';
  operationDisplay.innerText = '';
  firstOperand = null;
  operator = null;
  secondOperand = null;
  result = null;
}

// Функция для очистки последнего символа или вывода результата
function clear() {
  display.value = '';
  if (result !== null) {
    operationDisplay.innerText = result;
  } else {
    const lastChar = operationDisplay.innerText.slice(-1);
    if (!isNaN(lastChar) || lastChar === '.') {
      operationDisplay.innerText = operationDisplay.innerText.slice(0, -1);
    }
  }
}

// Функция для вычисления процента
function percent() {
  const value = parseFloat(display.value);
  display.value = value / 100;
}

// Функции для установки оператора
function divide() {
  firstOperand = parseFloat(display.value);
  operator = '/';
  operationDisplay.innerText = `${firstOperand} ${operator}`;
  display.value = '';
}

function multiply() {
  firstOperand = parseFloat(display.value);
  operator = '*';
  operationDisplay.innerText = `${firstOperand} ${operator}`;
  display.value = '';
}

function subtract() {
  firstOperand = parseFloat(display.value);
  operator = '-';
  operationDisplay.innerText = `${firstOperand} ${operator}`;
  display.value = '';
}

function add() {
  firstOperand = parseFloat(display.value);
  operator = '+';
  operationDisplay.innerText = `${firstOperand} ${operator}`;
  display.value = '';
}

// Функция для изменения знака числа
function sign() {
  const value = parseFloat(display.value);
  display.value = -value;
}

// Функция для добавления десятичной точки
function decimal() {
  if (!display.value.includes('.')) {
    if (display.value === '' || display.value === '-') {
      display.value += '0.';
    } else {
      display.value += '.';
    }
  }
}

// Функция для вычисления результата
function equals() {
  secondOperand = parseFloat(display.value);
  switch (operator) {
    case '/':
      result = firstOperand / secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '+':
      result = firstOperand + secondOperand;
      break;
    default:
      return;
  }
  display.value = result.toString(); 
  
  // преобразуем результат в строку
  if (secondOperand !== null) {
    operationDisplay.innerText += ` ${secondOperand} =`;
  }
  firstOperand = result;
  operator = null;
  secondOperand = null;
  result = null;
}

// Функция для обработки клика по кнопке с числом
function numberClick(event) {
  const number = event.target.innerText;
  if (operator === null) {
    if (result !== null) {
      display.value = number;
      operationDisplay.innerText = number;
      firstOperand = parseFloat(display.value);
      result = null;
    } else if (display.value === '0') {
      display.value = number;
      operationDisplay.innerText = number;
    } else {
      operationDisplay.innerText += number;
      display.value += number;
    }
  } else {
    if (result !== null) {
      firstOperand = result;
      result = null;
    }
    operationDisplay.innerText += number;
    display.value = number;
    secondOperand = parseFloat(display.value);
  }
}

// Добавляем обработчики событий для кнопок
document.getElementById('clear-all').addEventListener('click', clearAll);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('percent').addEventListener('click', percent);
document.getElementById('divide').addEventListener('click', divide);
document.getElementById('multiply').addEventListener('click', multiply);
document.getElementById('subtract').addEventListener('click', subtract);
document.getElementById('add').addEventListener('click', add);
document.getElementById('sign').addEventListener('click', sign);
document.getElementById('decimal').addEventListener('click', decimal);
document.getElementById('equals').addEventListener('click', equals);

// Объявляем все кнопки с классом "number"
const numberButtons = document.querySelectorAll('.number');

// Добавляем обработчик клика для каждой кнопки с числом
numberButtons.forEach(button => {
  button.addEventListener('click', numberClick);
});

// Добавляем обработчик событий для клавиатуры
document.addEventListener('keydown', event => {
  switch (event.key) {
    case '0':
      document.getElementById('0').click();
      break;
    case '1':
      document.getElementById('1').click();
      break;
    case '2':
      document.getElementById('2').click();
      break;
    case '3':
      document.getElementById('3').click();
      break;
    case '4':
      document.getElementById('4').click();
      break;
    case '5':
      document.getElementById('5').click();
      break;
    case '6':
      document.getElementById('6').click();
      break;
    case '7':
      document.getElementById('7').click();
      break;
    case '8':
      document.getElementById('8').click();
      break;
    case '9':
      document.getElementById('9').click();
      break;
    case '+':
      document.getElementById('add').click();
      break;
    case '-':
      document.getElementById('subtract').click();
      break;
    case '*':
      document.getElementById('multiply').click();
      break;
    case '/':
      document.getElementById('divide').click();
      break;
    case '.':
      document.getElementById('decimal').click();
      break;
    case 'Enter':
      document.getElementById('equals').click();
      break;
    case 'Backspace':
      document.getElementById('clear').click();
      break;
    case 'Escape':
      document.getElementById('clear-all').click();
      break;
    case '%':
      document.getElementById('percent').click();
      break;
    default:
      return;
  }
});