window.addEventListener("DOMContentLoaded", () => {

    // tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");

    function hideContent () {

        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        });

        tabs.forEach (item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showContent(i = 0) {
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideContent();
    showContent();

    tabsParent.addEventListener("click", function(event) {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });
});