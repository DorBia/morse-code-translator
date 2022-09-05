import {alphabet} from './alphabet.js';

export const translateToMorse = (string) => {
    const wordsToArray = string.trim().toLowerCase().split(" ")
    const morseCodeArray = wordsToArray.map(word => {
        const morseWord = word.split("").map(letter => alphabet[letter]).join(" ");
        return morseWord;
    });
    return morseCodeArray.join(" / ");
}


export const translateToText = (string) => {
    const sentence = string.trim().split(" / ");
    const morseText = sentence.map(word => word.split(" "));
    const englishWords = morseText.map(word => {
        const englishLetters = word.map(letter => Object.keys(alphabet).find(key => alphabet[key] === letter));
        return englishLetters.join("");
    });
    return englishWords.join(" ");
};
