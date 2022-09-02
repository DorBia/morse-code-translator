const alphabet =  { a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', 
    g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', 
    n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', 
    u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....',
    6: '-....', 7: '--...',  8: '---..', 9: '----.', 
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ':': '---...',
    '"': '.-..-.', "'": '.----.', '=': '-...-', '(': '-.--.', ')': '-.--.-',
    ą: '.-.-', ć: '-.-..', ę: '..-..', ł: '.-..-', ń: '--.--', ó: '---.', ś: '...-...', ź: '--..-.', ż: '--..-'}

export const translateToMorse = (string) => {
    const wordsToArray = string.trim().toLowerCase().split(" ")
    const morseCodeArray = wordsToArray.map(word => {
        const morseWord = word.split("").map(letter => alphabet[letter]).join(" ");
        return morseWord;
    });
    return morseCodeArray.join(" / ");
}

