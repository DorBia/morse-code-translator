import {morseSynth} from "./scripts/morseSynth.js"
import {translateToMorse, translateToText} from "./scripts/translator.js";


/* ----- DOM ----- */
const toTranslate = document.querySelector(".input__text");
const outputBox = document.querySelector(".output__text");
const copy = document.querySelector(".output__copy");
const outputPlayButton = document.querySelector(".output__play-sound");
const inputPlayButton = document.querySelector(".input__play-sound");


/* ----- FUNCTIONS ----- */

// translate the input and return the translation
const translateInput = (input) => {
    let translated = "";
    const pattern = /^[-. /]{1,}$/;
    
    if(pattern.test(input)) {
        translated = translateToText(input);
        outputPlayButton.style.display = "none";
        inputPlayButton.style.display = "none";

    } else {
        translated = translateToMorse(input);
        outputPlayButton.style.display = "block";
        inputPlayButton.style.display = "block";
    }
    return translated;
}

// print the value
const displayTranslation = () => outputBox.innerHTML = translateInput(toTranslate.value);

// play sound - using src rather than new sounds for Safari and iOS, otherwise it doesn't work
const playMorseCode = () => {
    const sound = new Audio();
    const string = outputBox.textContent;

    let index = 0;
    const playAudio = (audio) => {
        
        audio.onended = () => {
            if(string[index] === ".") {
                sound.src = "./assets/audio/morse-short.wav";
                playAudio(sound);
            } else if(string[index] === "-") {
                sound.src = "./assets/audio/morse-long.wav";
                playAudio(sound);
            } else if(string[index] === " ") {
                sound.src = "./assets/audio/silent-short.wav";
                playAudio(sound);
            } else if(string[index] === "/") {
                sound.src = "./assets/audio/silent-long.wav";
                playAudio(sound);
            }
            index++;
        }
        audio.play();
    }
    sound.src = "./assets/audio/silent-short.wav";
    playAudio(sound);
}

/* ----- EVENTS AND BUTTONS ----- */

toTranslate.addEventListener("keyup", displayTranslation);

copy.addEventListener("click", () => {
    outputBox.select();
    outputBox.setSelectionRange(0, 99999); // for mobile
    navigator.clipboard.writeText(outputBox.textContent);
});

const disableButton = (button) => {
    button.style.display = "none";

    // disable button anyway, prevents from adding a letter and playing again immediately
    button.disabled = true;
    setTimeout(() => button.disabled = false, 5000);
}

// playing sound using audio files - based on the morse code
outputPlayButton.addEventListener("click", () => {
    playMorseCode();
    disableButton(outputPlayButton);
});


// playing sound using computer sounds rather than audio files - based on the text
inputPlayButton.addEventListener("click", () => {
    const morse = new morseSynth();
    morse.play(toTranslate.value);

    disableButton(inputPlayButton);
});