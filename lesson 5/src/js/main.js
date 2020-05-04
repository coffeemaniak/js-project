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

startBtn.addEventListener('click', function() {
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
});

let sum;

expensesBtn.addEventListener('click', function() {
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

optionalBtn.addEventListener('click', function() {
    for (let i = 0; i < inputOptional.length; i++) {
        let opt = inputOptional[i].value;
        appData.optionalExpenses[i] = opt;
        optionalValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

countBtn.addEventListener('click', function() {
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
});

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,

    detectDayBudget: function () {
        appData.budgetPerDay = appData.budget / 30;
        alert("Ваш бюджет на один день: " + appData.budgetPerDay.toFixed(2));
    },
    detectLevel: function () {
        if (appData.budgetPerDay < 1000) {
            console.log("Минимальный уровень достатка");
        } else if (appData.budgetPerDay > 1000 && appData.budgetPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.budgetPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Что-то пошло не так!");
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt("Сумма накоплений?");
            let percent = +prompt("Под какой процент?");

            appData.monthIncome = save / 100 / 12 * percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },

    chooseIncome: function () {
        let items = prompt("Что принесет дополнительный доход? (Введите через запятую)");
        if (items != "" && items != null && isNaN(items)) {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может, что-то еще?"));
            appData.income.sort();
            appData.income.forEach(function (items, i) {
                alert("Способы дополнительного заработка: " + (i + 1) + ") " + items);
            });
        } else {
            alert("Введите категорию дополнительного дохода! (через запятую)");
        }
    },
};
