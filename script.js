
function operate(string) {

    let numberArray = string.match(/(\d+(\.\d+)?)/g);
    let operatorArray = string.match(/[+\-×÷]/g);



    let firstNumber = numberArray[0]
    let secondNumber = numberArray[1]

    if (numberArray.length < 2 || operatorArray.length < 1) {
        return firstNumber
    }

    let operator = operatorArray[0]

    let answer = 0
    switch (operator) {
        case '+':
            return firstNumber + secondNumber

        case '-':
            return firstNumber - secondNumber

        case '×':
            return firstNumber * secondNumber

        case '÷':
            return firstNumber / secondNumber
        default:
            return 'error'

    }
}

function splitExpression(string) {
    let splitArray = string.match(/(\d+(\.\d+)?|[+\-*/])/g);
    return splitArray;
}

const expression = document.querySelector('#expression')
const answer = document.querySelector('#answer')
function display() {
    const buttonContainer = document.querySelector('.button-container')

    buttonContainer.addEventListener('click', (event) => {
        let target = event.target
        if (target.className == 'numbers' || target.className == 'operator') {
            expression.textContent = expression.textContent + target.textContent
            answer.textContent = operate(expression.textContent)

        }
        else if (target.id == 'erase') {
            erase('one')
            answer.textContent = operate(expression.textContent)
        }
        else if (target.id == 'erase-all') {
            erase('all')
            answer.textContent = operate(expression.textContent)
        }
        else if (target.id == 'start') {
            expression.textContent = operate(expression.textContent)
        }
    })
}

display()
console.log(expression.textContent)


function erase(flag) {
    if (flag == 'all') {
        expression.textContent = ''
        answer.textContent = ''
    }
    else if (flag == 'one') {
        expression.textContent = expression.textContent.slice(0, -1);
    }
}