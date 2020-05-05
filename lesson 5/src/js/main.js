'use strict';

let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expencesValue = document.getElementsByClassName("expenses-value")[0],
    optionalValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomValue = document.getElementsByClassName("income-value")[0],
    monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
    expencesItem = document.getElementsByClassName("expenses-item"),
    expensesBtn = document.getElementsByTagName("button")[0],
    optionalBtn = document.getElementsByTagName("button")[1],
    countBtn = document.getElementsByTagName("button")[2],
    inputOptional = document.querySelectorAll(".optionalexpenses-item"),
    potentionalIncome = document.querySelector(".choose-income"),
    savings = document.querySelector("#savings"),
    chooseSum = document.querySelector(".choose-sum"),
    choosePersent = document.querySelector(".choose-percent"),
    year = document.querySelector(".year-value"),
    month = document.querySelector(".month-value"),
    day = document.querySelector(".day-value");

let money, time;

expensesBtn.setAttribute("disabled", "disabled");
expensesBtn.style.opacity = "0.5";
optionalBtn.setAttribute("disabled", "disabled");
optionalBtn.style.opacity = "0.5";
countBtn.setAttribute("disabled", "disabled");
countBtn.style.opacity = "0.5";

startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?");

    while (isNaN(money) || money == null || money == "") {
        money = +prompt("Ваш бюджет на месяц?");
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = appData.budget;
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
    expensesBtn.removeAttribute("disabled");
    expensesBtn.style.opacity = "1";
    optionalBtn.removeAttribute("disabled");
    optionalBtn.style.opacity = "1";
    countBtn.removeAttribute("disabled");
    countBtn.style.opacity = "1";
});

let sum;

expensesBtn.addEventListener('click', function () {
    sum = 0;
    for (let i = 0; i < expencesItem.length; i++) {
        let a = expencesItem[i].value;
        let b = expencesItem[++i].value;

        if ((typeof (a) != null) && (typeof (b) != null) && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    expencesValue.textContent = sum;
});

optionalBtn.addEventListener('click', function () {
    for (let i = 0; i < inputOptional.length; i++) {
        let opt = inputOptional[i].value;
        appData.optionalExpenses[i] = opt;
        optionalValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

countBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.budgetPerDay = ((appData.budget - sum) / 30).toFixed(2);
        dayBudgetValue.textContent = appData.budgetPerDay;

        if (appData.budgetPerDay < 1000) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.budgetPerDay >= 1000 && appData.budgetPerDay <= 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.budgetPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Что-то пошло не так!";
        }
    } else {
        dayBudgetValue.textContent = "Ошибка! Сначала нажмите НАЧАТЬ РАСЧЕТ";
    }
});

potentionalIncome.addEventListener("input", function () {
    let items = potentionalIncome.value;
    appData.income = items.split(", ");
    incomValue.textContent = appData.income;
});

savings.addEventListener("click", function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener("input", function () {
    if (appData.savings == true) {
        let sumValue = chooseSum.value,
            percent = choosePersent.value;

        appData.monthIncome = sumValue / 100 / 12 * percent;
        appData.yearIncome = sumValue / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePersent.addEventListener("input", function () {
    if (appData.savings == true) {
        let sumValue = chooseSum.value,
            percent = choosePersent.value;

        appData.monthIncome = sumValue / 100 / 12 * percent;
        appData.yearIncome = sumValue / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};