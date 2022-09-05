"use strict";

var _morseSynth = require("./scripts/morseSynth.js");

var _translator = require("./scripts/translator.js");

/* ----- DOM ----- */
var toTranslate = document.querySelector(".input__text");
var outputBox = document.querySelector(".output__text");
var copy = document.querySelector(".output__copy");
var outputPlayButton = document.querySelector(".output__play-sound");
var inputPlayButton = document.querySelector(".input__play-sound");
/* ----- FUNCTIONS ----- */
// "print" translation to the output box

var addTranslation = function addTranslation() {
  var translated = "";
  var pattern = /^[-. /]{1,}$/;

  if (pattern.test(toTranslate.value)) {
    translated = (0, _translator.translateToText)(toTranslate.value);
    outputPlayButton.style.display = "none";
    inputPlayButton.style.display = "none";
  } else {
    translated = (0, _translator.translateToMorse)(toTranslate.value);
    outputPlayButton.style.display = "block";
    inputPlayButton.style.display = "block";
  }

  outputBox.innerHTML = translated;
}; // play sound - using src rather than new sounds for Safari and iOS, otherwise it doesn't work


var playMorseCode = function playMorseCode() {
  var sound = new Audio();
  var string = outputBox.textContent;
  var index = 0;

  var playAudio = function playAudio(audio) {
    audio.onended = function () {
      if (string[index] === ".") {
        sound.src = "./assets/media/morse-short.wav";
        playAudio(sound);
      } else if (string[index] === "-") {
        sound.src = "./assets/media/morse-long.wav";
        playAudio(sound);
      } else if (string[index] === " ") {
        sound.src = "./assets/media/silent-short.wav";
        playAudio(sound);
      } else if (string[index] === "/") {
        sound.src = "./assets/media/silent-long.wav";
        playAudio(sound);
      }

      index++;
    };

    audio.play();
  };

  sound.src = "./assets/media/silent-short.wav";
  playAudio(sound);
};
/* ----- EVENTS AND BUTTONS ----- */


toTranslate.addEventListener("keyup", addTranslation);
copy.addEventListener("click", function () {
  outputBox.select();
  outputBox.setSelectionRange(0, 99999); // for mobile

  navigator.clipboard.writeText(outputBox.textContent);
});

var disableButton = function disableButton(button) {
  button.style.display = "none"; // disable button anyway, prevents from adding a letter and playing again immediately

  button.disabled = true;
  setTimeout(function () {
    return button.disabled = false;
  }, 5000);
}; // playing sound using audio files - based on the morse code


outputPlayButton.addEventListener("click", function () {
  playMorseCode();
  disableButton(outputPlayButton);
}); // playing sound using computer sounds rather than audio files - based on the text

inputPlayButton.addEventListener("click", function () {
  var morse = new _morseSynth.morseSynth();
  morse.play(toTranslate.value);
  disableButton(inputPlayButton);
});