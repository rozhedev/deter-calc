const allInp = document.querySelectorAll(".inp");

// * VALIDATION INTERVALS

const deterCalcInterval = {
    min: -9999,
    max: 9999,
};

// * FUNCTIONS

function checkInp(inp, intervalMin, intervalMax) {
    let inpValue = +inp.value;
    if (inp.value == "") {
        setErrorFor(inp, "Поле не може бути пустим");
    } else if (inpValue <= intervalMin) {
        setErrorFor(inp, `Мінімальне значення: ${intervalMin}`);
    } else if (inpValue >= intervalMax) {
        setErrorFor(inp, `Максимальне значення: ${intervalMax}`);
    } else {
        setSuccessFor(inp);
    }
}

// * Ограничение количества чисел после комы
function setDecimalNumber(e) {
    // цифра устанавливает количество цифр после запятой, т.е. если 3, то максимум 2 цифры после запятой
    let num = 3;
    if (e.value.indexOf(".") != '-1') {
        e.value = e.value.substring(0, e.value.indexOf(".") + num);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    formControl.classList.add("_error")
    formControl.classList.remove("_success");
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.classList.remove("_error")
    formControl.classList.add("_success");
}

// * CALL FUNCTIONS

if (allInp) {
    for (let i = 0; i < allInp.length; i++) {
        allInp[i].addEventListener("input", function () {
            setDecimalNumber(allInp[i]);
        });
        allInp[i].addEventListener("change", function () {
            checkInp(allInp[i], deterCalcInterval.min, deterCalcInterval.max);
        });
    }
}