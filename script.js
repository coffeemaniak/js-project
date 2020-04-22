'use strict';

const money = +prompt("Ваш бюджет на месяц?");
const time = prompt("Введите дату в формате YYYY-MM-DD");
const expensesItemOne = prompt("Введите обязательную статью расходов в этом месяце");
const expensesValueOne = +prompt("Во сколько обойдется?");
const expensesItemTwo = prompt("Введите обязательную статью расходов в этом месяце");
const expensesValueTwo = +prompt("Во сколько обойдется?");
const appData = {
          budget: money,
          timeData: time,
          expenses: {
              [expensesItemOne]: [expensesValueOne],
              [expensesItemTwo]: [expensesValueTwo],
          },
          optionalExpenses: {},
          income: [],
          savings: false,
      };
const bugetPerDay = (money - expensesValueOne - expensesValueTwo)/30;
      alert("Ваш бюджет на один день: " + bugetPerDay.toFixed(2));

