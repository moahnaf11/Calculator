let begin = document.querySelector(".calc-container .number-buttons .ninetoseven");
let middle = document.querySelector(".calc-container .number-buttons .sixtofour");
let last = document.querySelector(".calc-container .number-buttons .threetoone");




for (let i = 7; i < 10; ++i) {
    let topbutton = document.createElement("div");
    topbutton.classList.add("number");
    topbutton.textContent = i;
    begin.appendChild(topbutton);
}

for (let i = 4; i < 7; ++i) {
    let middlebutton = document.createElement("div");
    middlebutton.classList.add("number");
    middlebutton.textContent = i;
    middle.appendChild(middlebutton);
}

for (let i = 1; i < 4; ++i) {
    let lastbutton = document.createElement("div");
    lastbutton.classList.add("number");
    lastbutton.textContent = i;
    last.appendChild(lastbutton);
}


let delNegAC = document.querySelector(".calc-container .top-buttons");

let clear = document.createElement("div");
clear.classList.add("topButton");
clear.classList.add("clear");

clear.textContent = "AC";

let del = document.createElement("div");
del.classList.add("topButton");
del.classList.add("del");
del.textContent = "DEL";

let percent = document.createElement("div");
percent.classList.add("topButton");
percent.classList.add("percent");
percent.textContent = "%";



let neg = document.createElement("div");
neg.classList.add("topButton");
neg.classList.add("neg");
neg.textContent = "+/-";

delNegAC.appendChild(clear);
delNegAC.appendChild(del);
delNegAC.appendChild(percent);
delNegAC.appendChild(neg);

let decimalPointDiv = document.querySelector(".decimal-point");

let zero = document.createElement("div");
zero.classList.add("number");
zero.classList.add("zero");
zero.textContent = "0";


let decimalPoint = document.createElement("div");
decimalPoint.classList.add("point");
decimalPoint.textContent = ".";

let powerButton  = document.createElement("div");
powerButton.classList.add("power");
powerButton.textContent = "POW";

let equalButton = document.createElement("div");
equalButton.classList.add("equal");
equalButton.textContent = "=";


decimalPointDiv.appendChild(zero);
decimalPointDiv.appendChild(decimalPoint);
decimalPointDiv.appendChild(powerButton);
decimalPointDiv.appendChild(equalButton);


// time for functions and event handlers

let digits = [];
let number1;
let number2;
let count = 0;
let operatorArray = [];
let answer;
let obj = {};

let display = document.querySelector(".display");
let clearButton = document.querySelector(".clear");

// function for AC

function Clear () {
    display.textContent = "";
    digits = [];
    count = 0;
    number1 = null;
    number2 = null;
    operatorArray = [];

}

clearButton.addEventListener("click", Clear);

// functions for number clicks

let numbers = document.querySelectorAll(".number");

function numberClick (e) {
    digits.push(e.target.textContent);
    display.textContent = digits.join("");
}

numbers.forEach(num => num.addEventListener("click", numberClick));

// function for del

let delButton = document.querySelector(".del");
function DelButton () {
    if (digits.length) {
        digits.pop();
        display.textContent = digits.join("");

    }

}

delButton.addEventListener("click", DelButton);


// function for percent button

let percentButton = document.querySelector(".percent");

function percentFunction () {
    if (digits.length) {
        if (Number.isInteger(Number(digits.join("")) / 100)) {
            display.textContent = digits.join("") / 100;
            digits = [String(digits.join("") / 100)];
        }   else {
            if (String(parseFloat(digits.join("") / 100)).split(".")[1].length > 5) {
                display.textContent = parseFloat(digits.join("") / 100).toFixed(6);
                digits = [String(parseFloat(digits.join("") / 100).toFixed(6))];
            }   else {
                display.textContent = digits.join("") / 100;
                digits = [String(digits.join("") / 100)]

            }
        }
    }   else if (String(number1)) {
        if (Number.isInteger(Number(number1) / 100)) {
            number1 = number1 / 100;
            display.textContent = number1;
        }   else {
            if (String(number1 / 100).split(".")[1].length > 5) {
                number1 = (number1 / 100).toFixed(6);
                display.textContent = number1;
            }   else { 
                number1 = (number1 / 100);
                display.textContent = number1;
            }
        }
    }
}

percentButton.addEventListener("click", percentFunction);


// function for +/- 

let negButton = document.querySelector(".neg");
function negativeFunction () {
    if (digits[0] == "-") {
        digits.shift();
        display.textContent = digits.join("");
    }   else {
        digits.unshift("-");
        display.textContent = digits.join("");
    }

}
negButton.addEventListener("click", negativeFunction);

// function for point button


let pointButton = document.querySelector(".point");

function decimalPointButton () {
    if (digits.indexOf(".") ==  -1) {
        if (digits.lengfth) {
            digits.push(".");
            display.textContent = digits.join("");
        }

    }
}

pointButton.addEventListener("click", decimalPointButton);

// function for +-*/** 

let operationsDiv = document.querySelector(".operations");
function operatorFunction (e) {
    let target = e.target;
    ++count;
    switch (target.className.split(" ")[1]) {
        case "plus":
            operatorArray.push("+");
            break;
        case "minus":
            operatorArray.push("-");
            break;
        case "x":
            operatorArray.push("*");
            break;
        case "divide":
            operatorArray.push("/");
            break;
    }
    if (count > 1 && digits.length && String(number1)) {
        number2 = Number(digits.join(""));
        digits = [];
        equals();
    }   else if (count > 1 && digits.length == 0 && String(number1)) {
        if (operatorArray[0] == "+" && operatorArray[1] == "-") {
            operatorArray.shift();
        }   else if (operatorArray[0] == operatorArray[1]) {
            operatorArray.shift();
        }

    }   else if (digits.length) {
        number1 = Number(digits.join(""));
        display.textContent = "";
        digits = [];
    }   else {
        display.textContent = "";
    }

}

operationsDiv.addEventListener("click", operatorFunction);

// function for pow

let power = document.querySelector(".power");
function powerFunction () {
    ++count;
    operatorArray.push("**");
    if (count > 1 && digits.length && String(number1)) {
        number2 = Number(digits.join(""));
        digits = [];
        equals();
    }   else if (count > 1 && digits.length == 0 && String(number1)) {
        if (operatorArray[0] == operatorArray[1]) {
            operatorArray.shift();
        }

    }   else if (digits.length) {
        number1 = Number(digits.join(""));
        display.textContent = "";
        digits = [];
    }   else {
        display.textContent = "";
    }

}
power.addEventListener("click", powerFunction);

// function for equals

let equal = document.querySelector(".equal");
equal.addEventListener("click", equals)

function equals () {
    if (count < 2) {
        number2 = Number(digits.join(""));
        count = 0;
    }   else {
        count = 1;
        if (digits.length) {
            number2 = Number(digits.join(""));
            if (operatorArray[0] == "+" && operatorArray[1] == "-") {
                operatorArray.shift();
            }   
        }  
    }

    switch (operatorArray[0]) {
        case "*":
            answer = number1 * number2;
            if (String(answer).indexOf(".") == -1) {
                display.textContent = answer;

            }   else if (String(answer).split(".")[1] > 5) {
                display.textContent = answer.toFixed(5);
            }   else {
                display.textContent = answer;
            }

            break;
        case "+":
            answer = number1 + number2;
            if (String(answer).indexOf(".") == -1) {
                display.textContent = answer;

            }   else if (String(answer).split(".")[1] > 5) {
                display.textContent = answer.toFixed(5);
            }   else {
                display.textContent = answer;
            }

            break;
        case "-":
            answer = number1 - number2;
            if (String(answer).indexOf(".") == -1) {
                display.textContent = answer;

            }   else if (String(answer).split(".")[1] > 5) {
                display.textContent = answer.toFixed(5);
            }   else {
                display.textContent = answer;
            }

            break;
        case "/":
            answer = number1 / number2;
            if (String(answer).indexOf(".") == -1) {
                display.textContent = answer;

            }   else if (String(answer).split(".")[1] > 5) {
                display.textContent = answer.toFixed(5);
            }   else {
                display.textContent = answer;
            }

            break;
        case "**":
            answer = number1 ** number2;
            if (String(answer).indexOf(".") == -1) {
                display.textContent = answer;

            }   else if (String(answer).split(".")[1] > 5) {
                display.textContent = answer.toFixed(5);
            }   else {
                display.textContent = answer;
            }

    }
    digits = [];
    operatorArray.shift();
    number1 = answer;

}

// keyboard support

window.addEventListener("keyup", function (e) {
    if (Number(e.key) > -1 && Number(e.key) < 10) {
        console.log("0-9");
        numberClick({target: {textContent: String(e.key)}})
    }   else if (e.key == ".") {
        console.log("dot");
        decimalPointButton();

    }   else if (e.key == "Backspace") {
        console.log("Backspace");
        DelButton();

    }   else if (e.key == "Delete") {
        console.log("clear");
        Clear();

    }   else if (e.key == "-") {
        console.log("minus");
        operatorFunction({target: {className: "oper minus"}});

    }   else if (e.key == "=") {
        console.log("equal");
        equals();

    }   else if (e.key === "%" && e.shiftKey) {
        console.log("%");
        percentFunction();

    }   else if (e.key === "+" && e.shiftKey) {
        console.log("plus");
        operatorFunction({target: {className: "oper plus"}});

    }   else if (e.key === '*' && e.shiftKey) {
        console.log("multiply");
        operatorFunction({target: {className: "oper x"}});

    }   else if (e.key === '/') {
        console.log("divide");
        operatorFunction({target: {className: "oper divide"}});

    }   else if (e.key === '^' && e.shiftKey) {
        console.log("power");
        powerFunction();

    }   else if (e.key == "_" && e.shiftKey) {
        console.log("negative");
        negativeFunction();


    }
})

















