window.addEventListener("DOMContentLoaded", function () {
    //tabs

    "use strict";

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function (event) {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //timer

    let deadline = "2020-05-12"; //date of finish covid-carantin

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            "total": t,
            "seconds": seconds,
            "minutes": minutes,
            "hours": hours,
        };
    }

    function addZero(num) {
        if (num <= 9) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }
    }

    setClock("timer", deadline);

    //modal window

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close"),
        btnMore = document.querySelectorAll(".description-btn");

    more.addEventListener("click", function () {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function () {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    btnMore.forEach(btn => {
        btn.addEventListener("click", function () {
            overlay.style.display = "block";
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    });

    //form

    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Наши специалисты скоро с вами свяжутся!",
        failed: "Произошла ошибка, попробуйте еще раз",
    };

    let form = document.querySelector(".main-form"),
        contactForm = document.getElementById("form"),
        statusMessage = document.createElement("div");

    statusMessage.classList.add("status");

    form.addEventListener("submit", sendRequest);
    contactForm.addEventListener("submit", sendRequest);

    function sendRequest(event) {
        event.preventDefault();
        this.appendChild(statusMessage);

        let request = new XMLHttpRequest();

        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        let formData = new FormData(this),
            input = this.getElementsByTagName("input");

        request.send(formData);

        request.addEventListener("readystatechange", function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
                setTimeout(closeModal, 4000);
            } else {
                statusMessage.innerHTML = message.failed;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = " ";
        }

        let closeModal = function () {
            if (overlay.style.display == 'block') {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
    }

    //slider

    let sliderIndex = 1,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        wrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

    showSlides(sliderIndex);

    function showSlides(n) {

        if (n > slides.length) {
            sliderIndex = 1;
        }
        if (n < 1) {
            sliderIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = "none");
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[sliderIndex - 1].style.display = "block";
        dots[sliderIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides(sliderIndex += n);
    }

    function currentSlides(n) {
        showSlides(sliderIndex = n);
    }

    prev.addEventListener("click", function () {
        plusSlides(-1);
    });

    next.addEventListener("click", function () {
        plusSlides(1);
    });

    wrap.addEventListener("click", function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains("dot") && event.target == dots[i - 1]) {
                currentSlides(i);
            }
        }
    });
});