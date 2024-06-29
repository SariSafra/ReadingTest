import Data from '../../jsonData/AuditoryProcessingData.json';

export default class InitExData {
    constructor(setCurrentData){
        this.setCurrentData = setCurrentData;
    }
    ex1() {
        this.setCurrentData(Data.letters);
    }
    ex2() {
        this.setCurrentData(Data.letters.sort(() => Math.random() - 0.5));
    }
    ex3() {
        this.setCurrentData(Data.letters.map(letter => {
            const { firstChar, diacritic } = extractFirstCharAndDiacritic(letter.toSpeak);
            return {
                toSpeak: `${firstChar}${diacritic}ַ`,
                toWrite: letter.toWrite
            };
        }));
    }
    ex4() {
        this.setCurrentData(Data.letters.map(letter => {
            const { firstChar, diacritic } = extractFirstCharAndDiacritic(letter.toSpeak);
            return {
                toSpeak: `${firstChar}${diacritic}ֵ`,
                toWrite: letter.toWrite
            };
        }));
    }
    ex5() {
        this.setCurrentData(Data.letters.map(letter => {
            const { firstChar, diacritic } = extractFirstCharAndDiacritic(letter.toSpeak);
            return {
                toSpeak: `${firstChar}${diacritic}ִ`,
                toWrite: letter.toWrite
            };
        }));
    }
    ex6() {
        this.setCurrentData(Data.letters.map(letter => {
            const { firstChar, diacritic } = extractFirstCharAndDiacritic(letter.toSpeak);
            return {
                toSpeak: `${firstChar}${diacritic}ֹו`,
                toWrite: letter.toWrite
            };
        }));
    }
    ex7() {
        this.setCurrentData(Data.letters.map(letter => {
            const { firstChar, diacritic } = extractFirstCharAndDiacritic(letter.toSpeak);
            return {
                toSpeak: `${firstChar}${diacritic}ֻּ`,
                toWrite: letter.toWrite
            };
        }));
    }
    ex8() {
        const transformedLetters = Data.letters.map(letter => {
            console.log("case 8 : " + {
                toSpeak: letter.toSpeak[0] + getRandomElement(diacriticalMarks),
                toWrite: letter.toWrite
            })
            return {
                toSpeak: letter.toSpeak[0] + getRandomElement(diacriticalMarks),
                toWrite: letter.toWrite
            };
        });
        this.setCurrentData(transformedLetters.sort(() => Math.random() - 0.5));
    }
    ex9() {
        const transformedLetters = Array.from({ length: 10 }, () => {
            const randomLetter1 = getRandomElement(Data.easyLetters).toWrite;
            console.log("case 9, randomLetter1: " + randomLetter1 + "\n")
            const randomLetter2 = getRandomElement(Data.easyLetters).toWrite;
            console.log("case 9, randomLetter2: " + randomLetter2 + "\n")
            const randomDiacritic1 = getRandomElement(diacriticalMarks);
            console.log("case 9, randomDiacritic1: " + randomDiacritic1 + "\n")
            const randomDiacritic2 = getRandomElement(diacriticalMarks);
            console.log("case 9, randomDiacritic2: " + randomDiacritic2 + "\n")
            // Assuming Data.easyLetters contains strings and diacriticalMarks contains strings
            return {
                toSpeak: `${randomLetter1}${randomDiacritic1}${randomLetter2}${randomDiacritic2}`,
                toWrite: `${randomLetter1}${randomLetter2}`
            };
        });
        this.setCurrentData(transformedLetters.sort(() => Math.random() - 0.5));
    }
    ex10() {
        const transformedLetters = Data.letters.map((letter, index) => {
            const nextLetter = Data.letters[(index + 1) % Data.letters.length];
            return {
                toSpeak: letter.toSpeak,
                toWrite: nextLetter.toWrite
            };
        });
        const transformedLettersWithoutLast = transformedLetters.slice(0, -1);
        this.setCurrentData(transformedLettersWithoutLast.sort(() => Math.random() - 0.5));
    }
    ex11() {
        console.log("case 11: ")
        const transformedLetters = Array.from({ length: 10 }, () => {
            const randomLetter1 = getRandomElement(Data.easyLetters).toWrite;
            const randomLetter2 = getRandomElement(Data.easyLetters).toWrite;
            const randomDiacritic1 = getRandomElement(diacriticalMarks);
            const randomDiacritic2 = getRandomElement(diacriticalMarks);
            return {
                toSpeak: `${randomLetter1}${randomDiacritic1}${randomLetter2}${randomDiacritic2}`,
                toWrite: `${randomDiacritic1}${randomDiacritic2}`
            };
        });
        this.setCurrentData(transformedLetters);
    }
}

function extractFirstCharAndDiacritic(toSpeak) {
    const firstCharWithDiacritic = toSpeak.split(" ")[0];
    const firstChar = firstCharWithDiacritic[0];
    const diacritic = firstCharWithDiacritic[1] || '';
    return { firstChar, diacritic };
  }

  const diacriticalMarks = ['ִ', 'ְ', 'ֵ', 'וֹ', 'ֻּ', 'ַ']; // חיריק, שווא, צירה, חולם, שורוק, פתח
  const easyLetters = ['ש', 'ל', 'ג', 'מ', 'ד', 'ב', 'ת'];

  const getRandomElement = (arr) => {
    console.log("getRandomeElement function: " + arr[Math.floor(Math.random() * arr.length)]);
    return arr[Math.floor(Math.random() * arr.length)];
  };