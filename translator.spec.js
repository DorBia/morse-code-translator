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

    it("should translate special characters, eg. '?!()' should be '..--.. -.-.-- -.--. -.--.-'", () => {
        const result = translateToMorse("?!()");
        expect(result).toBe("..--.. -.-.-- -.--. -.--.-");
    });

    it("should translate sentences that contain special characters", () => {
        const result = translateToMorse("Hey, how are you?");
        expect(result).toBe(".... . -.-- --..-- / .... --- .-- / .- .-. . / -.-- --- ..- ..--..");
    });

    it("should return a string", () => {
        const result = translateToMorse("25");
        expect(typeof result).toBe("string");
    });

    it("should strip whitespace, eg. '     hello   ', should be '.... . .-.. .-.. ---", () => {
        const result = translateToMorse("     hello   ");
        expect(result).toBe(".... . .-.. .-.. ---");
    })

    it("should translate Polish letters", () => {
        const result = translateToMorse("ąćęłńóśźż");
        expect(result).toBe(".-.- -.-.. ..-.. .-..- --.-- ---. ...-... --..-. --..-")
    });

    it("should translate Polish sentences with capital Polish letters", () => {
        const result = translateToMorse("Żółte źdźbła pszenicy");
        expect(result).toBe("--..- ---. .-..- - . / --..-. -.. --..-. -... .-..- .- / .--. ... --.. . -. .. -.-. -.--");
    });

});
