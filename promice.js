"use strict";

console.log("Запрос данных...");

const req = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("Подготовка данных...");

        const prod = {
            name: "TV",
            price: 2000
        };

        reject(prod);

    }, 2000);
});

req.then((prod) => {
    setTimeout(() => {
        prod.status = "order";
        console.log(prod);
    }, 2000);
}).then(() => {
    setTimeout(() => {
        console.log("another");
    }, 5000);
}).catch(() => {
    console.log("Problem!");
});

const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
};

// Promise.all([test(1000), test(5000)]).then(() => {
//     console.log("All!");
// });

Promise.race([test(1000), test(2000)]).then(() => {
    console.log("All!");
});
