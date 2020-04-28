'use strict';

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?");
    time = prompt("Введите дату в формате YYYY-MM-DD");

    while (isNaN(money) || money == null || money == "") {
        money = +prompt("Ваш бюджет на месяц?");
    }
}

start();

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце");
        let b = +prompt("Во сколько обойдется?");

        if ((typeof (a) != null) && (typeof (b) != null) && a != '' && b != '' && a.length < 50) {
            console.log("Done!");
            appData.expenses[a] = b;
        } else {
            i = i - 1;
        }
    }
}

chooseExpenses();

// let i = 0;
// while (i < 2) {
//     const a = prompt("Введите обязательную статью расходов в этом месяце");
//     const b = +prompt("Во сколько обойдется?");
//     i++;
//     if ((typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
//         console.log("Done!");
//         appData.expenses[a] = b;
//     } else {
//         i = i - 1;
//     }
// }

// do {
//     const a = prompt("Введите обязательную статью расходов в этом месяце");
//     const b = +prompt("Во сколько обойдется?");
//     i++;
//     if ((typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
//         console.log("Done!");
//         appData.expenses[a] = b;
//     } else {
//         i = i- 1;
//     }
// } while (i < 2);

function detectDayBudget() {
    appData.budgetPerDay = appData.budget / 30;
    alert("Ваш бюджет на один день: " + appData.budgetPerDay.toFixed(2));
}

detectDayBudget();

function detectLevel() {
    if (appData.budgetPerDay < 1000) {
        console.log("Минимальный уровень достатка");
    } else if (appData.budgetPerDay > 1000 && appData.budgetPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if (appData.budgetPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Что-то пошло не так!");
    }
}

detectLevel();

function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Сумма накоплений?");
        let percent = +prompt("Под какой процент?");

        appData.monthIncome = save / 100 / 12 * percent;
        alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
    }
}

checkSavings();

function chooseOptExpenses() {
    for (let i = 0; i < 3; i++) {
        let a = prompt("Статья необязательных расходов?");
        if (a != "" && a != null && a.length < 50) {
            appData.optionalExpenses[i + 1] = a;
            console.log("done!");
        } else {
            i--;
        }
    }
}

chooseOptExpenses();