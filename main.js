import {translateToMorse} from "./translator.js";

const translate = document.querySelector(".translate input");
const translationContainer = document.querySelector(".container");

const addTranslation = () => {
    const translated = translateToMorse(translate.value);
    translationContainer.innerHTML = `<p>${translated}</p>`
}

translate.addEventListener("keyup", () => {
    addTranslation();
});
