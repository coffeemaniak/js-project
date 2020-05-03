"use strict";

let menuItem = document.getElementsByClassName("menu-item"),
    menu = document.getElementsByClassName("menu")[0],
    menuNewItem = document.createElement("li"),
    title = document.getElementById("title"),
    adv = document.getElementsByClassName("adv")[0],
    question = document.getElementById("prompt");

menu.insertBefore(menuItem[2], menuItem[1]);
menuNewItem.classList.add("menu-item");
menuNewItem.textContent = "Пятый элемент";
menu.appendChild(menuNewItem);

title.textContent = "Мы продаем только подлинную технику Apple";

adv.remove();

document.body.style.backgroundImage = "url(img/apple_true.jpg)";

let answer = prompt('Ваше отношение к технике Apple?');
question.textContent = answer;