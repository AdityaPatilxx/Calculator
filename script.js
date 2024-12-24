
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



let operatorCounter = 1
const expression = document.querySelector('#expression')
const answer = document.querySelector('#answer')
function display() {
    const buttonContainer = document.querySelector('.button-container')

    buttonContainer.addEventListener('click', (event) => {
        let target = event.target
        if (target.className == 'numbers') {
            (expression.textContent == '0')
                ? expression.textContent = target.textContent
                : expression.textContent = expression.textContent + target.textContent

            answer.textContent = operate(expression.textContent)
        }
        else if (target.className == 'operator' && operatorCounter < 2) {
            expression.textContent = expression.textContent + target.textContent
            answer.textContent = operate(expression.textContent)
            operatorCounter++
        }
        else if (target.id == 'erase') {
            erase('one')
            answer.textContent = operate(expression.textContent)
        }
        else if (target.id == 'erase-all') {
            erase('all')
            answer.textContent = operate(expression.textContent)
            operatorCounter = 1
        }
        else if (target.id == 'start') {
            expression.textContent = operate(expression.textContent)
            operatorCounter = 1
        }
    })
}

function erase(flag) {
    if (flag == 'all') {
        expression.textContent = '0'
        answer.textContent = ''
    }
    else if (flag == 'one') {
        let lastErasedCharacter = expression.textContent.at(-1)
        console.log(lastErasedCharacter)
        if (operatorPattern.test(lastErasedCharacter)) {
            operatorCounter = 1
        }
        expression.textContent = expression.textContent.slice(0, -1);
    }
}

display()