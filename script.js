class Calculator {
    constructor(previousoperandtext, currentoperandtext) {
        this.previousoperandtext = previousoperandtext
        this.currentoperandtext = currentoperandtext
        this.clear()
    }

    clear() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }

    addnum(num) {
        if (num === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + num.toString()
        //用於只讓小數點只有一個

    }

    selectoperation(operation) {
        if (this.currentoperand === '') return
        if (this.previousoperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
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
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''
    }

    display() {
        this.currentoperandtext.innerText = this.currentoperand
        this.previousoperandtext.innerText = this.previousoperand

    }


}

const numbuttons = document.querySelectorAll('[data-num]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const deletebuttons = document.querySelector('[data-delete]')
const allclearbuttons = document.querySelector('[data-allclear]')
const equalsbuttons = document.querySelector('[data-equals]')
const previousoperandtext = document.querySelector('[data-previous-operand]')
const currentoperandtext = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousoperandtext, currentoperandtext)

numbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addnum(button.innerText)
        calculator.display()
    })
})

operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectoperation(button.innerText)
        calculator.display()
    })
})

equalsbuttons.addEventListener('click', button => {
    calculator.compute()
    calculator.display()
})

allclearbuttons.addEventListener('click', button => {
    calculator.clear()
    calculator.display()
})

deletebuttons.addEventListener('click', button => {
    calculator.delete()
    calculator.display()
})

