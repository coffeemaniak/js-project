'use strict';

const money = +prompt("Ваш бюджет на месяц?");
const time = prompt("Введите дату в формате YYYY-MM-DD");

const appData = {
          budget: money,
          timeData: time,
          expenses: {},
          optionalExpenses: {},
          income: [],
          savings: false,
      };

    enterValue: for (let i = 0; i < 2; i++) {
        const a = prompt("Введите обязательную статью расходов в этом месяце");
        const b = +prompt("Во сколько обойдется?");

        if ((typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
            console.log("Done!");
            appData.expenses[a] = b;
        } else {
            alert("Ведите корректное значение!");
            continue enterValue;
        }
    }

    // let i = 0;
    // while (i < 2) {
    //     const a = prompt("Введите обязательную статью расходов в этом месяце");
    //     const b = +prompt("Во сколько обойдется?");
    //     i++;
    //     if ((typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
    //         console.log("Done!");
    //         appData.expenses[a] = b;
    //     } else {
    //         alert("Ведите корректное значение!");
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
    //         alert("Ведите корректное значение!");
    //     }
    // } while (i < 2);


    appData.budgetPerDay = appData.budget / 30;
      alert("Ваш бюджет на один день: " + appData.budgetPerDay.toFixed(2));

