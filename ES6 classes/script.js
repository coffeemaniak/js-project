class Options {
    constructor (height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv (text) {
        let newDiv = document.createElement("div");
        document.body.appendChild(newDiv);
        newDiv.innerHTML = `<p>${text}</p>`;
        newDiv.style.cssText = `height: ${this.height};
        width: ${this.width};
        background-color: ${this.bg};
        font-size: ${this.fontSize};
        text-align: ${this.textAlign};        
        `;
    }
}

let red = new Options("100px", "100px", "red", "14px", "center");
red.createDiv("Hellooo");
let yellow = new Options ("100px", "100px", "yellow", "20px", "center");
yellow.createDiv("Funny!");
let green = new Options ("100px", "100px", "green", "18px", "center");
green.createDiv("WeLcOmE");
let blue = new Options ("100px", "100px", "blue", "22px", "center");
blue.createDiv("Blue Box");