const images = () => {
    const parentSection = document.querySelector(".works"),
          imgPopup = document.createElement("div"),
          imgBig = document.createElement("img");
    
    imgPopup.classList.add("popup");
    parentSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = "center";
    imgPopup.style.alignItems = "center";
    imgPopup.style.display = "none";

    imgPopup.appendChild(imgBig);

    parentSection.addEventListener("click", (e) => {
        e.preventDefault();

        const target = e.target;

        if(target && target.classList.contains("preview")) {
            imgPopup.style.display = "flex";
            document.body.style.overflow = "hidden";
            const path = target.parentNode.getAttribute("href");
            imgBig.setAttribute("src", path);
        }

        if(target && target.matches("div.popup")) {
            imgPopup.style.display = "none";
            document.body.style.overflow = "";
        }
    });
};

export default images;