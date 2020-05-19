"use strict";

let numberOfFilms = prompt ("Сколько фильмов вы уже посмотрели?"),
    personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false,
    };

for (let i = 0; i < 2; i ++) {
    let a = prompt("Один из просмотренных фильмов?"),
        b = prompt("На сколько оцените его?");

        if (a == "" || a == null || a.length > 50 || b == "" || b == null || b.length > 4) {
            i--;
        } else {
            personalMovieDB.movies[a] = b;
        }
};

if(personalMovieDB.count <= 10) {
    console.log("Просмотрено довольно мало фильмов");
} else if(personalMovieDB.count > 10 && personalMovieDB.count <= 30) {
    console.log("Вы классический зритель");
} else if(personalMovieDB.count > 30) {
    console.log("Вы киноман!");
} else {
    console.log("Error");
}