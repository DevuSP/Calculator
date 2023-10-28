const numberButton = document.querySelectorAll("[data-number]"); // these are array used in "foEach".
const numberOperation = document.querySelectorAll("[data-operation]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
const allClearButton = document.querySelector("[data-all-clear]")
const deleteButton = document.querySelector("[data-delete]")
const equalButton = document.querySelector("[data-equal]")


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()              // this will clear the values when we create a new calculator. 
    }

    clear() {
        this.previousOperand = ""
        this.currentOperand = ""
        // operation is operator used in chooseOperation.
        this.operation = undefined
    }

    delete() {
        this.currentOperand = (this.currentOperand).toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) { return }  // it won't let to enter more than one "."
        this.currentOperand = this.currentOperand.toString() + number.toString() // this is like "+=".currentOperand is what was clicked and is there and number is what currently is clicked and need to be added as string. 
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return // this will make the user not use operator with no current operand.
        if (this.previousOperand !== "") {  // it will calculate, if operator is clicked even after writing previous and current.
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand // and after calculation this helps to keep current ready for new numbers. 
        this.currentOperand = ""

    }
    compute() {
        let computation
        const prev = Number(this.previousOperand)
        const curr = Number(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return  // if prev or curr is not given by user.
        switch (this.operation) {
            case "+":
                computation = prev + curr
                break;
            case "-":
                computation = prev - curr
                break;
            case "/":
                computation = prev / curr
                break;
            case "x":
                computation = prev * curr
                break;

            default:
                return;
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
    }

    getDisplayNumber(number) {    // this is used for commas in number, like in thousands.
        const stringNumber = number.toString()
        const integerDigits = Number(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en-IN", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDigits}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) // currentOperand will get shown in currentOperandTextElement means in screen.

        if (this.operation != null) {   // if "+ , - ,* ,/" is pressed.
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` // to show operator with previousOperand.
        } else {
            this.previousOperandTextElement.innerText = "" // if "=" is pressed
        }
    }
}

//this will create new calculator with class calulator in line 10. [search "new in js" for help]
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

numberOperation.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})