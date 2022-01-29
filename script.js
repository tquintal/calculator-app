let arr = []
let input = ''
let operator = ''
let isOPDone = false

const screen = document.getElementById('screen')
const paragraph = document.createElement('p')
screen.appendChild(paragraph)
const equalBtn = document.getElementById('equal-btn')
const clearBtn = document.getElementById('clear-btn')
const deleteBtn = document.getElementById('delete-btn')

const keyboardInput = (e) => {
    if (e.key === '=' || e.key === 'Enter') equal()
    if (e.key >= 0 && e.key <= 9) { evaluateNumbers(e.key) }
    if (e.key === '.') input += e.key, paragraph.innerHTML = input
    if (e.key === 'Backspace') deleteN()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        isOPDone = false
        e.key === '*' ? operator = 'x' : e.key === '/' ? operator = '÷' : operator = e.key
        evaluateOP()
    }
}

window.addEventListener('keydown', keyboardInput)

const numbersBtns = document.querySelectorAll('#number')
numbersBtns.forEach((number) => {
    number.addEventListener('click', () => {
        evaluateNumbers(number)
    })
})

const operatorBtns = document.querySelectorAll('#operator')
operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
        isOPDone = false
        evaluateOP()
        operator = button.textContent
    })
})

const deleteN = () => {
    if (input !== '') {
        input = input.slice(0, input.length - 1)
        paragraph.innerHTML = input
    } else {
        clear()
    }
    log()
}

deleteBtn.addEventListener('click', () => { deleteN() })

const equal = () => {
    if (input !== '') {
        if (arr.length !== 0) {
            arr.push(
                operate(operator, arr[arr.length - 1], parseFloat(input))
            )
            paragraph.innerHTML = arr[arr.length - 1]
        }

        isOPDone = true
        input = ''
        operator = ''
        log()
    }
}

equalBtn.addEventListener('click', () => { equal() })

clearBtn.addEventListener('click', () => { clear(), log() })

// HELPERS
const evaluateNumbers = (val) => {
    if (isOPDone) {
        clear()
        isOPDone = false
    }
    input += val.textContent === undefined ? val : val.textContent
    paragraph.innerHTML = input
}

const evaluateOP = () => {
    if (input !== '') {
        if (arr.length !== 0) {
            arr.push(
                operate(operator, arr[arr.length - 1], parseFloat(input))
            )
            paragraph.innerHTML = arr[arr.length - 1]
        } else {
            arr.push(parseFloat(input))
            paragraph.innerHTML = input
        }

        input = ''
        log()
    }
}

const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

const add = (a, b) => {
    return a + b
}

const subtract = (a, b) => {
    return a - b
}

const multiply = (a, b) => {
    return a * b
}

const divide = (a, b) => {
    return a / b
}

const clear = () => {
    arr = []
    input = ''
    operator = ''
    paragraph.innerHTML = ''
}

const log = () => { if (arr.length !== 0) { console.log('History:', arr) } }

// OTHER
const copyright = document.getElementById('copyright')
let date = new Date().getFullYear()
copyright.textContent = date
