import {translateToMorse, translateToText} from "./translator.js";

const translate = document.querySelector(".translate");
const outputBox = document.querySelector(".output");
const copy = document.querySelector(".copy");
const playButton = document.querySelector(".play-sound");

const addTranslation = () => {
    let translated = ""
    const pattern = /^[-. /]{1,}$/;
    
    if(pattern.test(translate.value)) {
        translated = translateToText(translate.value);
        playButton.style.display = "none";

    } else {
        translated = translateToMorse(translate.value);
        playButton.style.display = "block";
    }
    outputBox.innerHTML = translated;
}

translate.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.key === "Enter") void(0);
    addTranslation()
});

copy.addEventListener("click", () => {
    outputBox.select();
    outputBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(outputBox.textContent);
});

const playMorseCode = () => {
    const short = new Audio('./media/morse-short.wav')
    const long = new Audio('./media/morse-long.wav')
    const shortBreak = new Audio('./media/silent-short.wav')
    const longBreak = new Audio('./media/silent-long.wav')
    
    const string = outputBox.textContent;
    let index = 0;
    const playAudio = (audio) => {
        if (!audio || !(audio instanceof Audio)) return;
        audio.onended = () => {
            if(string[index] === ".") {
                playAudio(short);
            } else if(string[index] === "-") {
                playAudio(long);
            } else if(string[index] === " ") {
                playAudio(shortBreak);
            } else if(string[index] === "/") {
                playAudio(longBreak);
            }
            index++;
        }
        audio.play();
    }
    playAudio(shortBreak)
}

playButton.addEventListener("click", () => {
    playMorseCode();
    playButton.disabled = true;
    setTimeout(() => playButton.disabled = false, 5000);
    playButton.style.display = "none";
});