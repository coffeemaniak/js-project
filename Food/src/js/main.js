window.addEventListener("DOMContentLoaded", () => {
    const calc = require("./modules/calc").default,
          cards = require("./modules/cards").default,
          forms = require("./modules/forms").default,
          modal = require("./modules/modal").default,
          slides = require("./modules/slides").default,
          tabs = require("./modules/tabs").default,
          timer = require("./modules/timer").default;

    calc();
    cards();
    forms();
    modal();
    slides();
    tabs();
    timer();
});