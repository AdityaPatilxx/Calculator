function addition(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtraction(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function division(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function multiplication(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function operate(firstNumber, operator, secondNumber) {
    let answer = 0
    switch (operator) {
        case '+':
            return addition(firstNumber, secondNumber);

        case '-':
            return subtraction(firstNumber, secondNumber);

        case '*':
            return multiplication(firstNumber, secondNumber);

        case '/':
            return division(firstNumber, secondNumber);
    }
}

function display() {
    const buttonContainer = document.querySelector('.button-container')
    const display = document.querySelector('#real-display')

    buttonContainer.addEventListener('click', (event) => {
        let target = event.target
        display.textContent = target.textContent
    })
}

display()
