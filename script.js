const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // determines type of key
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNumber = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action){
            console.log("number key");
            if (displayNumber === "0" || previousKeyType === 'operator'){
                display.textContent = keyContent;
            } else {
                display.textContent = displayNumber + keyContent;
            }
            // calculator.dataset.previousKey = "number";
        }
        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            console.log("operator key");
            key.classList.add('pressedButton');
            // add custom attribute
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayNumber;
            calculator.dataset.operator = action;
        }
                    
        if (action === "decimal"){
            console.log("decimal key");
            // if there is no decimal displayed, add one when button is clicked
            if (!displayNumber.includes('.')) {
                display.textContent = displayNumber + "."
            } else if (previousKeyType === 'operator'){
                display.textContent = '0.'
            }
            // calculator.dataset.previousKey = "decimal";
        }
        if (action === "clear"){
            console.log("clear key")
            display.textContent = "";
            // calculator.dataset.previousKeyType = "clear";

        }

        const operate = (n1, operator, n2) => {
            let result = '';
            // calculator.dataset.previousKeyType = "operate";
            if (operator === "add") {
                result = parseFloat(n1) + parseFloat(n2);;
            } else if (operator === "subtract"){
                result = parseFloat(n1) - parseFloat(n2);;
            } else if (operator === "multiply"){
                result = parseFloat(n1) * parseFloat(n2);;
            } else if (operator === "divide"){
                result = parseFloat(n1) / parseFloat(n2);
            }
            console.log(result);
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

        if (action === "calculate"){
            console.log("equal key")
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNumber;
            display.textContent = operate(firstValue, operator, secondValue)
        }



        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressedButton'));
    }
})







// const calculator = document.querySelector('.calculator-container');
// const display = document.querySelector('.display');
// const buttons = document.querySelectorAll('button');
// const previousKeyType = calculator.dataset.previousKeyType;

// buttons.forEach((button) => {
//     button.addEventListener('click', (e) =>{
//         if (e.target.matches('button')) {
//            const key = e.target;
//            const action = key.dataset.action;
//            const keyContent = key.textContent;
//            const displayNum = display.textContent;
           
//            // removes the pressed operator  class when second value is pressed
//            Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressedButton'));
           
           
//            if (!action){
//                if (displayNum === "0" && previousKeyType === "operator"){
//                    display.textContent = keyContent;
//                } else {
//                    display.textContent = displayNum + keyContent;
//                }
//            }
//            if (
//                action === "add" ||
//                action === "subtract" ||
//                action === "multiply" ||
//                action === "divide"
//            ) {
//                // operand button pressed is styled when clicked 
//                key.classList.add('pressedButton');
//                calculator.dataset.previousKeyType = 'operator';
//            }
//            if (action === "decimal"){
//                display.textContent = displayNum + '.';
//            }
//            if (action === "clear"){
//                display.textContent = "";
//            }
//            if (action === "negPositive"){
//                console.log("Negative Positive key", key.textContent);
//            }
//            if (action === "calculate"){
//                console.log("Equal key", key.textContent);
//            }
//         }
//     });
// });

// function add(a,b) {
//     return a + b;
// }

// function subtract(a,b){
//     return a - b;
// }

// function multiply(a,b){
//     return a * b;
// }

// function divide(a,b){
//     return a / b;
// }

// function operate(operator, a, b){
//     switch (operator) {
//         case "+":
//             add(a,b);
//             break;
//         case "-":
//             subtract(a,b);
//             break;
//         case "*":
//             multiply(a,b);
//             break;
//         case "/":
//             divide(a,b);
//             break;
//         default:
//             alert("Error: use an operator");
//     }
// }

