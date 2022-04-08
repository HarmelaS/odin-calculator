
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');


const operate = (n1, operator, n2) => {
    let result = '';
    // calculator.dataset.previousKeyType = "operate";
    if (operator === "add") {
        // result = parseFloat(n1) + parseFloat(n2);
        result = add(n1, n2);
    } else if (operator === "subtract"){
        // result = parseFloat(n1) - parseFloat(n2);
        result = subtract(n1,n2);
    } else if (operator === "multiply"){
        // result = parseFloat(n1) * parseFloat(n2);
        result = multiply(n1, n2);
    } else if (operator === "divide"){
        // result = parseFloat(n1) / parseFloat(n2);
        if(n2 === "0"){
          result = "error";
        } else{
            result = divide(n1, n2);

        }
    }
    return result;
}

function add(a,b) {  
    return parseFloat(a) + parseFloat(b);
} 

function subtract(a,b) {  
    return parseFloat(a) - parseFloat(b);
} 

function multiply(a,b) {  
    return parseFloat(a) * parseFloat(b);
} 

function divide(a,b) {  
    return parseFloat(a) / parseFloat(b);
} 


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // determines type of key
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNumber = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressedButton'));

        if (!action){
            console.log("number key");
            if (displayNumber === "0" || previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = keyContent;
            } else {
                display.textContent = displayNumber + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }

        if (action === "decimal"){
            // if there is no decimal displayed, add one when button is clicked
            if (!displayNumber.includes('.')) {
                display.textContent = displayNumber + "."
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = "decimal";
        }

        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNumber;

            // check if firstValue and operator exists because secondValue always exists
            // if a user hits a number, operator, number, then another operator - display updates to calculated value
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                
                const calcValue = operate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                // calculated value becomes first value when making multiple equations
                calculator.dataset.firstValue = calcValue;
                // display.textContent = operate(firstValue, operator, secondValue);
            } else {
                calculator.dataset.firstValue = displayNumber;
            }

            key.classList.add('pressedButton');
            // add custom attribute
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
                    
        if (action === "clear"){
            if (key.textContent === "AC"){
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            } else {
                key.textContent = "AC";
            }

            display.textContent = 0;
            calculator.dataset.previousKeyType = "clear";
        }

        // when a number/operand is clicked, the AC text on button is changed to CE
        if (action !== 'clear'){
            const clearButton = calculator.querySelector('.clearButton');
            clearButton.textContent = 'CE';
        }

        if (action === "calculate"){
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayNumber;
           
            if (firstValue){
                if (previousKeyType === 'calculate'){
                    firstValue = displayNumber;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = operate(firstValue, operator, secondValue)
            }
           
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = "calculate";
        }
    }
})





