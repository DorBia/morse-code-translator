import {translateToMorse} from "./translator";

describe("Testing translateToMorse", () => {
    it("a should translate to be *-", () => {
        //Arange
        let string;
        //Act
        string = "a";
        let result = translateToMorse(string);
        //Assert
        expect(result).toBe("*-");
    });

    it("should translate rob to be .-. --- -...", () => {
        //Arange
        let string;
        //Act
        string = "rob";
        let result = translateToMorse(string);
        //Assert
        expect(result).toBe(".-. --- -...");
    });
});

// What should translateToMorse function actually be able to do?

// - Receive letters and translate those letters into morse code
// - Take into consideration capital letters - these also need to translate to morse code
// - Take into consideration spaces between words and translate them
// - Numbers!!!
// - Symbols??
// - Extension - different language