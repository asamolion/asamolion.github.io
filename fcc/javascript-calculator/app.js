(function() {
    "use strict";

    // create parser
    var parser = math.parser(),
        lastValue, // result of the last computation
        opCheck = false, // variable to check if the last click was an operator or not, true if last click was an operator
        equalCheck = false, // boolean to check if the equals button was clicked or not
        parserArray = [], // Array of values of the expression, used in parsing the result
        parserString = ""; // String containing the string form of the expression

    // return true if element is number i.e. number string
    function isNumber(element) {
        return !Number.isNaN(parseInt(element, 10));
    }
    // return if number is an operator
    function isOperator(element) {
        if (
            element === "+" ||
            element === "-" ||
            element === "*" ||
            element === "/"
        ) {
            return true;
        }
        return false;
    }
    // change in top-output
    function topOutputChange() {
        var topOutput = document.querySelector("#top-output-numbers"),
            topOutputText = topOutput.innerHTML;
        if (topOutputText.length > 23) {
            var topOutputArray = topOutputText.split(" ");
            while (topOutputArray.join(" ").length > 23) {
                topOutputArray.shift();
            }
            topOutput.innerHTML = topOutputArray.join(" ");
            document.getElementById("double-left-arrow").style.display =
                "inline";
        }
    }
    // font and size change in bottom-output
    function bottomOutputChange() {
        var output = document.querySelector("#bottom-output"),
            outputText = output.innerHTML;
        if (outputText.length > 12) {
            output.classList.add("short");
        } else {
            output.classList.remove("short");
        }
    }
    // Takes the current input by the user and applies the appropriate action

    function input(element) {
        // get the output elements
        var bottomOutput = document.querySelector("#bottom-output"),
            bottomOutputText = bottomOutput.innerHTML,
            topOutput = document.querySelector("#top-output-numbers"),
            topOutputText = topOutput.innerHTML;

        // if equals was pressed then clear the input
        if (equalCheck) {
            bottomOutput.innerHTML = "";
            parserArray = [parserString];
            equalCheck = false;
        }
        // if number then add to the bottom output
        if (isNumber(element)) {
            if (bottomOutput.innerHTML.length < 16) {
                if (opCheck) {
                    bottomOutput.innerHTML = element;
                    opCheck = false;
                } else {
                    bottomOutput.innerHTML += element;
                }
                bottomOutputChange();
                parserArray.push(element); // insert the element into the parserArray
            }
        } else if (isOperator(element)) {
            // if operator then operate
            if (opCheck) {
                var topOutputArray = topOutputText.split(" ");
                topOutputArray.pop();
                topOutputArray.push(element);
                topOutput.innerHTML = topOutputArray.join(" ");
                parserArray.pop(); // remove the last operator
            } else {
                if (parserArray === []) {
                    topOutput.innerHTML += " " + "0" + " " + element;
                } else {
                    topOutput.innerHTML +=
                        " " + bottomOutputText + " " + element;
                }
            }
            opCheck = true;
            topOutputChange();
            parserArray.push(element); // insert the element into the parserArray
        } else if (element === ".") {
            // if decimal point than add decimal point
            if (opCheck) {
                bottomOutput.innerHTML = "0.";
                opCheck = false;
            }
            if (bottomOutput.innerHTML.indexOf(".") === -1) {
                bottomOutput.innerHTML += element;
            }
            parserArray.push(element);
        }
    }

    // coerces the error in the parserArray to nearest possible correct expression
    function coerceArray() {
        if (parserArray[parserArray.length - 1] === ".") {
            parserArray.push("0");
        }
    }

    // function evalutes the expressions and does the corresponding tasks
    function evaluate() {
        coerceArray();
        var bottomOutput = document.getElementById("bottom-output");
        //alert(parserArray);
        parserString = parserArray.join("");
        bottomOutput.innerHTML = parser.eval(parserString);
        parserString = bottomOutput.innerHTML;
        parserArray = [];
        equalCheck = true;
    }
    /* ADDING EVENT HANDLERS */

    // Add input event to the number and decimal point input
    // Add input event to the operator buttons
    document
        .querySelectorAll("#plus, #minus, #multiply, #divide, .input")
        .forEach(function(currentValue) {
            currentValue.addEventListener("click", function() {
                input(this.innerHTML);
            });
        });
    // add backspace to left-arrow
    document.getElementById("left-arrow").addEventListener("click", function() {
        var output = document.querySelector("#bottom-output"),
            outputText = output.innerHTML;
        output.innerHTML = outputText.substring(0, outputText.length - 1);
        bottomOutputChange();
    });
    // clear single entry event handler
    document.getElementById("CE").addEventListener("click", function() {
        document.getElementById("bottom-output").innerHTML = "";
        parserArray.pop(); // remove the last entry from the parserArray
    });
    // clear all event handler
    document.getElementById("C").addEventListener("click", function() {
        document.getElementById("top-output-numbers").innerHTML = "";
        document.getElementById("bottom-output").innerHTML = "";
        parserString = ""; // empty evaluation string
        parserArray = [];
    });
    // get the result
    document.getElementById("equals").addEventListener("click", function() {
        document.getElementById("top-output-numbers").innerHTML = "";
        evaluate();
    });
})();
