import {translateToMorse} from "./translator";

describe("Testing translateToMorse", () => {
    it("should translate single letters, eg. 'a' should be '.-'", () => {
        //Arrange and act
        const result = translateToMorse("a");
        //Assert
        expect(result).toBe(".-");
    });

    it("should translate simple words, eg. 'welcome' should be '.-- . .-.. -.-. --- -- .'", () => {
        const result = translateToMorse("welcome");
        expect(result).toBe(".-- . .-.. -.-. --- -- .");
    });

    it("should translate numbers, eg. '123' should be '.---- ..--- ...--'", () => {
        const result = translateToMorse("123");
        expect(result).toBe(".---- ..--- ...--");
    });

    it("should accept capital letters, eg. 'HELLO' should be '.... . .-.. .-.. ---'", () => {
        const result = translateToMorse("HELLO");
        expect(result).toBe(".... . .-.. .-.. ---");
    });

    it("should translate simple sentence", () => {
        const result = translateToMorse("Hello from the VS Code side");
        expect(result).toBe(".... . .-.. .-.. --- / ..-. .-. --- -- / - .... . / ...- ... / -.-. --- -.. . / ... .. -.. .");
    });

});

// What should translateToMorse function actually be able to do?

// - Receive letters and translate those letters into morse code ✔️
// - Take into consideration capital letters - these also need to translate to morse code ✔️
// - Take into consideration spaces between words and translate them ✔️
// - Numbers!!! ✔️
// - Symbols?? 
// - Extension - different language