
const operatorPattern = /[+\-×÷^]/g;

function operate(expression) {
    const numberArray = expression.match(/(\d+(\.\d+)?)/g);
    const operatorArray = expression.match(operatorPattern);

    if (numberArray.length < 2 || operatorArray.length < 1) {
        return numberArray[0];
    }

    return mathsOperation(parseFloat(numberArray[0]), parseFloat(numberArray[1]), operatorArray[0]);
}

function mathsOperation(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+': return firstNumber + secondNumber;
        case '-': return firstNumber - secondNumber;
        case '×': return firstNumber * secondNumber;
        case '÷': return secondNumber !== 0 ? firstNumber / secondNumber : 'Error';
        case '^': return Math.pow(firstNumber, secondNumber);
        default: return 'Error';
    }
}

function initializeCalculator() {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.addEventListener('click', handleButtonClick);
}

let operatorCounter = 1;
let lastInputWasOperator = false;

const expressionElement = document.querySelector('#expression')
const answerElement = document.querySelector('#answer')


function updateAnswer() {
    if (expressionElement.textContent == '') {
        answerElement.textContent = ''
    }
    else {
        answerElement.textContent = operate(expressionElement.textContent)
    }

}

function handleButtonClick(event) {
    const target = event.target;

    if (target.className == 'numbers') {
        handleNumberInput(target.textContent);
    }
    else if (target.className == 'operator') {
        handleOperatorInput(target.textContent);
    }
    else if (target.id === 'erase') {
        erase('one');
    }
    else if (target.id === 'erase-all') {
        erase('all');
    }
    else if (target.id === 'start') {
        finalizeExpression();
    }
}

function handleNumberInput(value) {
    if (expressionElement.textContent === '0') {
        expressionElement.textContent = value;
    }
    else {
        // Check for duplicate decimals in the current number
        const lastNumber = expressionElement.textContent.split(operatorPattern).pop();

        if (value === '.' && lastNumber.includes('.')) {
            return; // Prevent adding another decimal point
        }

        expressionElement.textContent += value;
        updateAnswer()
    }
    lastInputWasOperator = false;
    answerElement.textContent = operate(expressionElement.textContent);
}

function handleOperatorInput(operator) {
    const lastChar = expressionElement.textContent.slice(-1);
    if (operatorCounter < 2 && !operatorPattern.test(lastChar)) {
        expressionElement.textContent += operator;
        operatorCounter++;
        lastInputWasOperator = true;
    }
}


function erase(flag) {
    if (flag === 'all') {
        expressionElement.textContent = '0';
        answerElement.textContent = '';
        operatorCounter = 1;
    } else if (flag === 'one') {
        const lastChar = expressionElement.textContent.slice(-1);
        if (operatorPattern.test(lastChar)) {
            operatorCounter = 1;
        }
        expressionElement.textContent = expressionElement.textContent.slice(0, -1) || '0';
        updateAnswer()
    }
}

function finalizeExpression() {
    expressionElement.textContent = operate(expressionElement.textContent);
    operatorCounter = 1;
}

initializeCalculator();