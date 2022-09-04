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

// using src rather than new sounds for Safari and iOS, otherwise it doesn't work
const playMorseCode = () => {
    const sound = new Audio()
    
    const string = outputBox.textContent;
    let index = 0;
    const playAudio = (audio) => {
        if (!audio || !(audio instanceof Audio)) return;
        
        audio.onended = () => {
            if(string[index] === ".") {
                sound.src = "./media/morse-short.wav"
                playAudio(sound);
            } else if(string[index] === "-") {
                sound.src = "./media/morse-long.wav"
                playAudio(sound);
            } else if(string[index] === " ") {
                sound.src = "./media/silent-short.wav"
                playAudio(sound);
            } else if(string[index] === "/") {
                sound.src = "./media/silent-long.wav"
                playAudio(sound);
            }
            index++;
        }
        audio.play();
        
    }
    sound.src = "./media/silent-short.wav"
    playAudio(sound)
}

playButton.addEventListener("click", () => {
    playMorseCode();
    playButton.disabled = true;
    setTimeout(() => playButton.disabled = false, 5000);
    playButton.style.display = "none";
});