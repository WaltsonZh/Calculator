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

// oprends
let x = 0;
let y = NaN;

let AC = true; // all clear
let C = true; // clear
let op_selector = 0; // operation selector (0 = no operation, 1 = plus, 2 = minus, 3 = multiply, 4 = divede)
let next_operand = false;

// number buttons' events
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


// ac button event
AC_btn.addEventListener("click", () => {
	if (AC == false && C == false) { // C 
		input.textContent = 0;
		y = NaN;
		C = true;
        AC_btn.textContent = "AC";
	} else if (AC == false && C == true) { // AC 
		x = 0;
		y = NaN;
		AC = true;
	}
});

// operation events
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

negate.addEventListener("click", () => {
    let tmp = Number(input.textContent);
    tmp *= -1;
    input.textContent = tmp;
});

percent.addEventListener("click", () => {
    let tmp = Number(input.textContent);
    tmp *= 0.01;
    input.textContent = tmp;
});

function number(num) {
	let str = input.textContent;
	if (str == "0" || next_operand) {
		str = "";
        next_operand = false;
	}

    if (str == "" && num == ".") {
        input.textContent = "0.";
    } else {
        str += num;
        str = str.replace(/,/g, '');
        input.textContent = Number(str).toLocaleString('en-US');
    }

	if (num != 0) {
		AC = false;
		C = false;
		AC_btn.textContent = "C";
	}
}

function operation(op) {
    if (op_selector == 0 || next_operand) {
        x = Number(input.textContent.replace(/,/g, ''));
    } else {
        y = Number(input.textContent.replace(/,/g, ""));
    }

    if (op_selector != op && !next_operand) {
		result();
		AC = false;
		C = false;
		AC_btn.textContent = "C";
		
	}
    op_selector = op;
    next_operand = true;
}

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
        input.textContent = x;
    } else {
        input.textContent = format(x);
    }
}

function format(num) {
    if (num >= 1000000000000000) {
        return "Infinity";
    }
    if (num < 1000000000000000) {
        let str = parseFloat(num.toFixed(15)).toString();
        if (str.length > 15) {
            str = str.substring(0, 15);
        }

        return Number(str).toLocaleString('en-US');
    }
}