"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: true,
    start: function() {
        while (personalMovieDB.count == null || personalMovieDB.count == "" || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = prompt("Сколько фильмов вы уже посмотрели?");
        }
    },
    rememberMyFilms: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt("Один из просмотренных фильмов?"),
                b = prompt("На сколько оцените его?");

            if (a == "" || a == null || a.length > 50 || b == "" || b == null || b.length > 4) {
                i--;
            } else {
                personalMovieDB.movies[a] = b;
            }
        }
    },
    countLevel: function () {
        if (personalMovieDB.count <= 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count > 10 && personalMovieDB.count <= 30) {
            console.log("Вы классический зритель");
        } else if (personalMovieDB.count > 30) {
            console.log("Вы киноман!");
        } else {
            console.log("Error");
        }
    },
    showMyDB: function (hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },
    toggleVisibleMeDB: function() {
        if(personalMovieDB.privat) {
            personalMovieDB.privat = false;
        } else {
            personalMovieDB.privat = true;
        }
    },
    writeYourGenres: function () {
        for (let i = 1; i <= 3; i++) {
            const genre = prompt(`Ваш любимый жанр под номером ${i}`);
            if(genre != null || genre != "") {
                personalMovieDB.genres[i - 1] = genre;
                personalMovieDB.genres.forEach((item, i) => {
                    console.log(`Любимый жанр #${i + 1} - это ${item}`);
                });
            } else {
                i--;
            }
            
        }
    }
};