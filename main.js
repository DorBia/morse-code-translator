import {translateToMorse, translateToText} from "./translator.js";

const translate = document.querySelector(".translate input");
const translationContainer = document.querySelector(".container");

const addTranslation = () => {
    let translated = ""

    const pattern = /^[-. /]{1,}$/;
    if(pattern.test(translate.value)) {
        translated = translateToText(translate.value);
    } else {
        translated = translateToMorse(translate.value);
    }
    translationContainer.innerHTML = `<p>${translated}</p>`
}

translate.addEventListener("keyup", addTranslation);
