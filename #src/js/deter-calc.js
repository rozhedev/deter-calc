// * Variant-2x2

let allInpArr = [
    document.querySelectorAll("#variant-2x2>*>input"),
    document.querySelectorAll("#variant-3x3>*>input"),
    document.querySelectorAll("#variant-4x4>*>input"),
];
let allBtnArr = [
    document.querySelector("#btn-2x2"),
    document.querySelector("#btn-3x3"),
    document.querySelector("#btn-4x4"),
];
const emptyErrOutput = document.querySelector("#empty-error-output");
const output = document.querySelector("#output");

// * FUNCTION

function clearInputs(inpArr) {
    inpArr.forEach(inpArrItem => {
        inpArrItem.value = "";
        inpArrItem.parentElement.classList.remove("_success");
    });
}

function isEmpty(inpArr, errOutput) {
    if (inpArr.every(inp => inp.value != "")) {
        return true;
    } else {
        errOutput.textContent = "Введіть значення в поля вводу."
    }
}

function parseArr(inpArr) {
    let numArr = [];

    for (let i = 0; i < inpArr.length; i++) {
        let inpValue = +inpArr[i].value;
        if (
            inpArr.every(elem => elem.parentElement.classList.contains("_success"))
        ) {
            numArr.push(inpValue);
        }
    }
    return numArr;
}

function calcDeter3x3(
    [num0, num1, num2, num3, num4, num5, num6, num7, num8]
) {
    return (num0 * num4 * num8) + (num6 * num1 * num5) + (num3 * num7 * num2) - (num6 * num4 * num2) - (num0 * num7 * num5) - (num3 * num1 * num8);
}

// * Array conversion

for (let i = 0; i < allInpArr.length; i++) {
    allInpArr[i] = Array.from(allInpArr[i]);
}

// * Call functions

if (allInpArr[0] && allBtnArr[0] && output && emptyErrOutput) {
    let result = 0;

    allBtnArr[0].addEventListener("click", function (e) {
        e.preventDefault();
        if (isEmpty(allInpArr[0], emptyErrOutput)) {
            result = parseArr(allInpArr[0])[0] * parseArr(allInpArr[0])[3] - parseArr(allInpArr[0])[1] * parseArr(allInpArr[0])[2];
            output.textContent = result;
            emptyErrOutput.textContent = "";
            clearInputs(allInpArr[0]);
        }
    });
}

if (allInpArr[1] && allBtnArr[1] && output && emptyErrOutput) {
    let result = 0;
    let tempArr = [];

    allBtnArr[1].addEventListener("click", function (e) {
        e.preventDefault();

        if (isEmpty(allInpArr[1], emptyErrOutput)) {
            for (let i = 0; i < parseArr(allInpArr[1]).length; i++) {
                tempArr[i] = parseArr(allInpArr[1])[i];
            }
            result = calcDeter3x3(tempArr);

            output.textContent = result;
            emptyErrOutput.textContent = "";
            clearInputs(allInpArr[1]);
        }
    });
}

if (allInpArr[2] && allBtnArr[2] && output && emptyErrOutput) {
    let tempResult = [0, 0, 0, 0];
    let result = 0;
    let tempArr = [[], [], [], [], []];
    let calcConditionArr = [];

    allBtnArr[2].addEventListener("click", function (e) {
        e.preventDefault();
        if (isEmpty(allInpArr[2], emptyErrOutput)) {
            let i = 0;
            while (i < parseArr(allInpArr[2]).length) {
                calcConditionArr = [
                    i == 3 || i == 11,
                    i == 7 || i == 15,
                    i >= 4 && i <= 6 || i >= 8 && i <= 10 || i >= 12 && i <= 14,
                    i >= 0 && i <= 2 || i >= 8 && i <= 10 || i >= 12 && i <= 14,
                    i >= 0 && i <= 2 || i >= 4 && i <= 6 || i >= 12 && i <= 14,
                    i >= 0 && i <= 2 || i >= 4 && i <= 6 || i >= 8 && i <= 10,
                ];

                // * Parce in array fourty column
                if (calcConditionArr[0]) tempArr[0].push(parseArr(allInpArr[2])[i]);

                if (calcConditionArr[1]) tempArr[0].push(parseArr(allInpArr[2])[i]);

                if (calcConditionArr[2]) tempArr[1].push(parseArr(allInpArr[2])[i]);

                if (calcConditionArr[3]) tempArr[2].push(parseArr(allInpArr[2])[i]);

                if (calcConditionArr[4]) tempArr[3].push(parseArr(allInpArr[2])[i]);

                if (calcConditionArr[5]) tempArr[4].push(parseArr(allInpArr[2])[i]);
                i++;
            }

            for (let i = 1; i < tempResult.length; i++) {
                tempResult[i] = tempArr[0][i] * calcDeter3x3(tempArr[i]);

                if (i == 2 || i == 4) {
                    result -= tempResult[i];
                }
                result += tempResult[i];
            }

            output.textContent = result;
            emptyErrOutput.textContent = "";
            clearInputs(allInpArr[2]);
        }
    });
}