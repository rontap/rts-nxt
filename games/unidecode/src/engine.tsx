import type {Emoji} from "unicode-emoji";
import * as ue from 'unicode-emoji';
import {Text} from '@radix-ui/themes'
import {intersection, isEqual} from "lodash";

export enum GUESS {
    _BRUH_REACT,
    WRONG,
    SHORT,
    CORRECT,
    CLOSE_SUBSTR,
    CLOSE_EXTRA,
    CLOSE_EXTRA_REPEAT
}

const emojis = ue.getEmojis();
console.log(emojis);

window.e = emojis;
export default class Engine {
    emojis: Emoji[];
    had: number[];
    current: Emoji | undefined;
    keywordsCorrect: string[];
    noClue: (Emoji | undefined)[];

    constructor() {
        this.emojis = emojis;
        this.had = [];
        this.current = undefined;
        this.keywordsCorrect = [];
        this.noClue = [];
    }

    get saved() {
        return JSON.parse(localStorage.trophies || "[]");
    }

    next() {
        let found = 1;
        let index = -1;
        while (found > 0) {
            index = Math.floor(Math.random() * this.emojis.length)
            const repeat = this.had.includes(index);
            if (repeat) found++;
            else found = 0;
            if (found > this.emojis.length - 5) {
                alert("BRUH")
                found = 0;
            }
        }
        this.had.push(index);
        this.current = this.emojis[index];
        this.keywordsCorrect = [];
        return this.current;
    }

    submit(guess: string): GUESS {
        console.log(guess, this.current?.description, this.current?.keywords);
        guess = prune(guess);
        const description = prune(this.current?.description);

        if (guess.length < 2) return GUESS.SHORT;

        // if the two guesses are identical, CORRECT
        if (compare(guess, description)) return GUESS.CORRECT;


        // if the whole text section has partial match, CLOSE_SUBSTR
        if (description.includes(guess) || guess.includes(description)) {
            // if this was already a guess, do not include it.
            if (this.keywordsCorrect.includes(guess)) {
                return GUESS.CLOSE_EXTRA_REPEAT;
            }
            this.keywordsCorrect.push(guess)
            return GUESS.CLOSE_SUBSTR
        }

        // if the intersection of the tokenisation is not ZERO, CLOSE_SUBSTR
        if (partiallyIncludes(guess, description)) {
            return GUESS.CLOSE_SUBSTR
        }

        // if any keyword completely match, CLOSE EXTRA
        if (this.current?.keywords.includes(guess)) {

            // if this was already a guess, do not include it.
            if (this.keywordsCorrect.includes(guess)) {
                return GUESS.CLOSE_EXTRA_REPEAT;
            }
            this.keywordsCorrect.push(guess)
            return GUESS.CLOSE_EXTRA;
        }
        return GUESS.WRONG;
    }

}

export const prune = (text: string) => {
    return text
        .replace(/flag: /, "")
        .replace(/’/g, "")
        .replace(/'/g, "")
        .replace(/:/g, "")
        .toLowerCase()
}
const tokenize = (text: string) => {
    return prune(text)
        .split(" ")
        .sort()
}
const compare = (a: string, b: string) => {
    return isEqual(tokenize(a), tokenize(b))
}
const partiallyIncludes = (a: string, b: string) => {
    return intersection(tokenize(a), tokenize(b)).length
}

export function Emojis() {
    return <table>
        {emojis.map((emoji) => {
            return <tr>
                <td><Text size="7">{emoji.emoji}</Text></td>
                <td>{emoji.description}</td>
                <td>{emoji.version}</td>
                <td>{emoji.group}</td>
                <td>{emoji.category}</td>
            </tr>
        })
        }</table>
}