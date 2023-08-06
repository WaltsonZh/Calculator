/* 
    Author: WaltsonZh
    File: script.js
    Description: 
*/

// Get references to the HTML elements
const input = document.getElementById("input");
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const dot = document.getElementById("dot");
const AC_btn = document.getElementById("reset");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equal = document.getElementById("equal");
const negate = document.getElementById("negate");
const percent = document.getElementById("percent");

// Initialize variables
let x = 0; // First operand
let y = NaN; // Second operand
let AC = true; // All clear flag
let C = true; // Clear flag
let op_selector = 0; // Operation selector (0 = no operation, 1 = plus, 2 = minus, 3 = multiply, 4 = divede)
let next_operand = false; // Flag to indicate if the next input should be treated as a new operand

// Event listeners to number buttons (0-9) and dot
zero.addEventListener("click", () => {
	number(0);
});
one.addEventListener("click", () => {
	number(1);
});
two.addEventListener("click", () => {
	number(2);
});
three.addEventListener("click", () => {
	number(3);
});
four.addEventListener("click", () => {
	number(4);
});
five.addEventListener("click", () => {
	number(5);
});
six.addEventListener("click", () => {
	number(6);
});
seven.addEventListener("click", () => {
	number(7);
});
eight.addEventListener("click", () => {
	number(8);
});
nine.addEventListener("click", () => {
	number(9);
});
dot.addEventListener("click", () => {
	number(".");
});

// All clear button event
AC_btn.addEventListener("click", () => {
	if (AC == false && C == false) {
		// If clear mode is active
		input.textContent = 0;
		input.style.fontSize = "90px";
        	input.style.paddingTop = "150px";
		y = NaN;
		C = true;
		AC_btn.textContent = "AC";
	} else if (AC == false && C == true) {
		// If all clear mode is active
		x = 0;
		y = NaN;
		AC = true;
	}
});


// Event listeners to operation buttons (plus, minus, multiply, divide, equal)
plus.addEventListener("click", () => {
	operation(1);
});
minus.addEventListener("click", () => {
	operation(2);
});
multiply.addEventListener("click", () => {
	operation(3);
});
divide.addEventListener("click", () => {
	operation(4);
});
equal.addEventListener("click", () => {
	operation(0);
});

// Event listeners to the "negate" and "percent" buttons
negate.addEventListener("click", () => {
	let tmp = input.textContent;
	if (tmp.charAt(0) != "-" && tmp != "0") {
		tmp = "-" + tmp;
	} else if (tmp != "0") {
		tmp = tmp.substring(1);
	}
	input.textContent = tmp;
});

percent.addEventListener("click", () => {
	let tmp = input.textContent;
    let num = Number(tmp.replace(/,/g, ""));
	num *= 0.01;
	input.textContent = formatnum(num);
});

// Function to handle number button clicks
function number(num) {
	let str = input.textContent;

	if (str == "0" || next_operand) {
		str = ""; // Clear the input if it's 0 or the next operand is expected
		next_operand = false;
	}

    if (str.indexOf('.') != -1 && num == '.') {
        num = ''; // If a dot already exists, ignore further dots
    }

    str = str.replace(/,/g, "") + num;
    if (str.length > 12){
        return;
    }

	if (str == ".") {
		input.textContent = "0."; // If the input is just a dot, display "0."
	} else {
		input.textContent = formatString(str);
	}

	if (num != 0) {
		AC = false;
		C = false;
		AC_btn.textContent = "C";
	}
}

// Function to handle operation button clicks
function operation(op) {
	if (op_selector == 0 || next_operand) {
		x = Number(input.textContent.replace(/,/g, ""));
	} else {
		y = Number(input.textContent.replace(/,/g, ""));
	}

	if (!next_operand) { // If next_operand is false, calculate the result of the ongoing operation (if any)
		result();
		AC = false;
		C = false;
		AC_btn.textContent = "C";
	}
	op_selector = op;
	next_operand = true;
}

// Function to calculate and display the result of the ongoing operation
function result() {
	switch (op_selector) {
		case 1:
			x += y;
			break;
		case 2:
			x -= y;
			break;
		case 3:
			x *= y;
			break;
		case 4:
			x /= y;
			break;
		default:
			break;
	}
	if (x == NaN || x == Infinity) {
		input.textContent = "Error";
		input.style.fontSize = "90px";
        input.style.paddingTop = "150px";
	} else {
		input.textContent = formatnum(x);
	}
}

// Function to format a number with commas for thousands separation
function formatnum(num) {
    if (num >= 1000000000000) {
        input.style.fontSize = "90px";
		input.style.paddingTop = "150px";
        return "Error";
    } else {
        let str = parseFloat(num.toFixed(13)).toString();

	    if (str.length > 13) {
	    	str = str.substring(0, 13);
	    }

	    if (Number(str.slice(str.indexOf("."))) == 0 && str.indexOf(".") != -1) {
	    	str = "0";
	    }

        return formatString(str);
    }
}

// Function to format the input display based on the length of the input
function formatString(str) {
	if (str.length < 7) {
		input.style.fontSize = "90px";
        input.style.paddingTop = "150px";
	} else if (str.length < 10) {
		input.style.fontSize = 120 - str.length * 7 + "px";
        input.style.paddingTop = "172px";
	} else {
        input.style.fontSize = 90 - str.length * 4 + "px";
        input.style.paddingTop = "172px";
    }

	let dec = str.indexOf(".");
	if (dec == -1) {
		dec = str.length;
	}
    let neg = str.indexOf("-");

	for (let i = dec - 3; i > neg + 1; i -= 3) {
		str = str.slice(0, i) + "," + str.slice(i);
	}

	return str;
}
