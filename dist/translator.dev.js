"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateToText = exports.translateToMorse = void 0;

var _alphabet = require("./alphabet.js");

var translateToMorse = function translateToMorse(string) {
  var wordsToArray = string.trim().toLowerCase().split(" ");
  var morseCodeArray = wordsToArray.map(function (word) {
    var morseWord = word.split("").map(function (letter) {
      return _alphabet.alphabet[letter];
    }).join(" ");
    return morseWord;
  });
  return morseCodeArray.join(" / ");
};

exports.translateToMorse = translateToMorse;

var translateToText = function translateToText(string) {
  var sentence = string.trim().split(" / ");
  var morseText = sentence.map(function (word) {
    return word.split(" ");
  });
  var englishWords = morseText.map(function (word) {
    var englishLetters = word.map(function (letter) {
      return Object.keys(_alphabet.alphabet).find(function (key) {
        return _alphabet.alphabet[key] === letter;
      });
    });
    return englishLetters.join("");
  });
  return englishWords.join(" ");
};

exports.translateToText = translateToText;