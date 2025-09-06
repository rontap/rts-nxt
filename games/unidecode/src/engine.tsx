import type {Emoji} from "unicode-emoji";
import * as ue from 'unicode-emoji';
import {Text} from '@radix-ui/themes'
import {difference, intersection, isEqual, uniq} from "lodash";

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
type Emojigroupkw = "japan" | "new" | "flag" | "inclusive"
window.e = emojis;
export default class Engine {
    #emojis: Emoji[];
    emojigroup: Record<Emojigroupkw, Emoji[]>;
    had: number[];
    current: Emoji | undefined;
    keywordsCorrect: string[];
    noClue: (Emoji | undefined)[];
    emojisettings: Record<Emojigroupkw, boolean>

    constructor() {
        this.emojigroup = {};
        this.emojigroup.japan = emojis.filter(emoji => emoji.keywords.includes("Japan"))
        this.emojigroup.new = emojis.filter(emoji => emoji.version === "16.0" || emoji.version === "15.1")
        this.emojigroup.flag = emojis.filter(emoji => emoji.description.includes("flag:"))
        this.emojigroup.inclusive = emojis.map(emoji => ({...emoji, ...emoji.variations})).filter(e => e).flat() as Emoji[]
        this.emojisettings = {hardcore: false, japan: false, new: false, inclusive: false, flag: false}
        this.#emojis = difference(emojis, this.emojigroups);
        this.had = [];
        this.current = undefined;
        this.keywordsCorrect = [];
        this.noClue = [];
    }

    get saved() {
        return JSON.parse(localStorage.trophies || "[]");
    }

    get emojigroups() {
        return uniq([]
            .concat(this.emojigroup.japan)
            .concat(this.emojigroup.flag)
            .concat(this.emojigroup.inclusive)
            .concat(this.emojigroup.new))
    }

    get emojis() {
        return uniq([]
            .concat(this.emojisettings.flag ? this.emojigroup.flag : [])
            .concat(this.emojisettings.flag ? this.emojigroup.new : [])
            .concat(this.emojisettings.inclusive ? this.emojigroup.inclusive : [])
            .concat(this.emojisettings.flag ? this.emojigroup.japan : [])
            .concat(this.#emojis))
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
                alert("BRUH") // # todo all emojis used
                found = 0;
            }
        }
        this.had.push(index);
        this.current = this.emojis[index];
        this.keywordsCorrect = [];
        return this.current;
    }

    get count() {
        return this.emojis.length;
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