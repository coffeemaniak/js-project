'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const promo = document.querySelectorAll(".promo__adv img"),
        promoGenre = document.querySelector(".promo__genre"),
        background = document.querySelector(".promo__bg"),
        movieList = document.querySelector(".promo__interactive-list"),
        form = document.querySelector(".add"),
        input = form.querySelector(".adding__input"),
        checkbox = form.querySelector("[type='checkbox']");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let newMovie = input.value;
        const favorite = checkbox.checked;

        if (newMovie) {

            if (newMovie.length > 21) {
                newMovie = `${newMovie.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем в любимые фильмы");
            }

            movieDB.movies.push(newMovie);
            sorting(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        form.reset();
    });

    const deletePromo = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    promoGenre.textContent = "драма";

    background.style.backgroundImage = "url('img/bg.jpg')";

    const sorting = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sorting(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${film}
                <div class="delete"></div>
            </li>
        `;
        });

        document.querySelectorAll(".delete").forEach((btn, i) => {
            btn.addEventListener("click", () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }

    deletePromo(promo);
    createMovieList(movieDB.movies, movieList);
});