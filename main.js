import {translateToMorse, translateToText} from "./translator.js";

const translate = document.querySelector(".translate");
const outputBox = document.querySelector(".output");
const copy = document.querySelector(".copy");

const addTranslation = () => {
    let translated = ""
    const pattern = /^[-. /]{1,}$/;
    
    if(pattern.test(translate.value)) {
        translated = translateToText(translate.value);
    } else {
        translated = translateToMorse(translate.value);
    }
    outputBox.innerHTML = translated;
}

translate.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.key === "Enter") {
        void(0);
    }
    addTranslation()
});

copy.addEventListener("click", () => {
    outputBox.select();
    outputBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(outputBox.textContent);
})
