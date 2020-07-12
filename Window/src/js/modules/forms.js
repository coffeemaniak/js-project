const forms = () => {
    const form = document.querySelectorAll("form"),
          inputs = document.querySelectorAll("input"),
          phone = document.querySelectorAll("input[name='user_phone']");
    
    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    phone.forEach(item => {
        item.addEventListener("input", () => {
            item.value = item.value.replace(/\D/, "");
        });
    });

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };
    
    const postData = async (url, data) => {
        document.querySelector(".status").textContent = message.loading;

        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    form.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData("assets/server.php", formData)
                .then(res => {
                    statusMessage.textContent = message.success;
                    console.log(res);
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 10000);
                });
        });
    });
};

export default forms;