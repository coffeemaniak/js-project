window.addEventListener("DOMContentLoaded", () => {

// tabs

const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

function hideContent() {

    tabsContent.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show");
    });

    tabs.forEach(item => {
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

tabsParent.addEventListener("click", function (event) {
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

//timer


const deadline = "2020-06-12";

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}

function addZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = addZero(t.days);
        hours.innerHTML = addZero(t.hours);
        minutes.innerHTML = addZero(t.minutes);
        seconds.innerHTML = addZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock(".timer", deadline);

// Modal

const btnToggle = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalInterval);
}

btnToggle.forEach(btn => {
    btn.addEventListener("click", openModal);
});

function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

const modalInterval = setTimeout(openModal, 10000);

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener("scroll", showModalByScroll);
    }
}

window.addEventListener("scroll", showModalByScroll);

//Card 

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const elem = document.createElement("div");

        if (this.classes.length === 0) {
            this.elem = "menu__item";
            elem.classList.add(this.elem);
        } else {
            this.classes.forEach(className => elem.classList.add("menu__item"));
        }

        elem.innerHTML = `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                `;
        this.parent.append(elem);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    ".menu .container"
).render();

//Forms

const forms = document.querySelectorAll("form");
const messages = {
    loading: "img/form/original.svg",
    success: "Спасибо! скоро мы с вами свяжемся",
    failure: "Что-то пошло не так!"
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("img");
        statusMessage.src = messages.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
        form.insertAdjacentElement("afterend", statusMessage);

        const formData = new FormData(form);

        fetch("server.php", {
                method: "POST",
                body: formData
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(messages.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(messages.failure);
            }).finally(() => {
                form.reset();
            });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        closeModal();
    }, 5000);
}

//slider

const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidefields = document.querySelector(".offer__slider-inner"),
    wrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(wrapper).width;
let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidefields.style.width = 100 * slides.length + "%";
slidefields.style.display = "flex";
slidefields.style.transition = "0.5s all";

wrapper.style.overflow = "hidden";

slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = "relative";

const indicators = document.createElement("ol"),
      dots = [];

indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
}

function deleteDigits (str) {
    return +str.replace(/\D/g, "");
}

next.addEventListener("click", () => {
    if (offset == deleteDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteDigits(width);
    }

    slidefields.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener("click", () => {
    if (offset == 0) {
        offset = deleteDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteDigits(width);
    }

    slidefields.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
});

dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute("data-slide-to");

        slideIndex = slideTo;
        offset = deleteDigits(width) * (slideTo - 1);

        slidefields.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });
});

// showSlides(slideIndex);

// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlides(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }

//     if (n < 1) {
//         slideIndex = slides.length;
//     }

//     slides.forEach(item => item.style.display = "none");
//     slides[slideIndex - 1].style.display = "block";

//     if (slides.length < 10) {
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// }

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// prev.addEventListener("click", () => {
//     plusSlides(-1);
// });

// next.addEventListener("click", () => {
//     plusSlides(1);
// });
});