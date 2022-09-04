import {translateToMorse, translateToText} from "./translator.js";

/* ----- DOM ----- */
const toTranslate = document.querySelector(".input__text");
const outputBox = document.querySelector(".output__text");
const copy = document.querySelector(".output__copy");
const playButton = document.querySelector(".output__play-sound");


/* ----- FUNCTIONS ----- */

// "print" translation to the output box
const addTranslation = () => {
    let translated = "";
    const pattern = /^[-. /]{1,}$/;
    
    if(pattern.test(toTranslate.value)) {
        translated = translateToText(toTranslate.value);
        playButton.style.display = "none";

    } else {
        translated = translateToMorse(toTranslate.value);
        playButton.style.display = "block";
    }
    outputBox.innerHTML = translated;
}

// play sound - using src rather than new sounds for Safari and iOS, otherwise it doesn't work
const playMorseCode = () => {
    const sound = new Audio();
    const string = outputBox.textContent;

    let index = 0;
    const playAudio = (audio) => {
        
        audio.onended = () => {
            if(string[index] === ".") {
                sound.src = "./media/morse-short.wav";
                playAudio(sound);
            } else if(string[index] === "-") {
                sound.src = "./media/morse-long.wav";
                playAudio(sound);
            } else if(string[index] === " ") {
                sound.src = "./media/silent-short.wav";
                playAudio(sound);
            } else if(string[index] === "/") {
                sound.src = "./media/silent-long.wav";
                playAudio(sound);
            }
            index++;
        }
        audio.play();
    }
    sound.src = "./media/silent-short.wav";
    playAudio(sound);
}

/* ----- EVENTS AND BUTTONS ----- */

toTranslate.addEventListener("keyup", addTranslation);

copy.addEventListener("click", () => {
    outputBox.select();
    outputBox.setSelectionRange(0, 99999); // for mobile
    navigator.clipboard.writeText(outputBox.textContent);
});

playButton.addEventListener("click", () => {
    playMorseCode();
    playButton.style.display = "none";
    // disable button anyway, prevents from adding a letter and playing again immediately
    playButton.disabled = true;
    setTimeout(() => playButton.disabled = false, 5000);
});