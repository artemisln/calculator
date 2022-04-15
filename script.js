class Calculator {
    constructor(previousOperatorTextElement, currentOperatorTextElement) {
        this.previousOperatorTextElement = previousOperatorTextElement
        this.currentOperatorTextElement = currentOperatorTextElement
        this.clear()
    }

    clear() {
        this.currentOperator = ''
        this.previousOperator = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperator = this.currentOperator.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperator.includes('.')) return 
        this.currentOperator = this.currentOperator.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperator === '') return 
        if (this.previousOperator !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperator = this.currentOperator
        this.currentOperator = ''
    }

    compute() {
        let computation 
        const prev = parseFloat(this.previousOperator)
        const current = parseFloat(this.currentOperator)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
        default: return
        }
        this.currentOperator = computation
        this.operation = undefined
        this.previousOperator = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperatorTextElement.innerText = 
        this.getDisplayNumber(this.currentOperator)
        if(this.operation != null) {
            this.previousOperatorTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperator)} ${this.operation}`
        } else {
            this.previousOperatorTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperatorTextElement = document.querySelector('[data-previous-operator]')
const currentOperatorTextElement = document.querySelector('[data-current-operator]')

const calculator = new Calculator(previousOperatorTextElement, currentOperatorTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})