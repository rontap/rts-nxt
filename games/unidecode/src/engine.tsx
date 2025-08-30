import type {Emoji} from "unicode-emoji";
import * as ue from 'unicode-emoji';
import {Text} from '@radix-ui/themes'

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
    noClue: (Emoji|undefined)[];

    constructor() {
        this.emojis = emojis;
        this.had = [];
        this.current = undefined;
        this.keywordsCorrect = [];
        this.noClue = [];
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

        if (guess.length < 3) return GUESS.SHORT;

        if (guess === description) return GUESS.CORRECT;

        if (description.includes(guess) || guess.includes(description)) {
            return GUESS.CLOSE_SUBSTR
        }
        if (this.current?.keywords.includes(guess)) {
            if (this.keywordsCorrect.includes(guess)) {
                return GUESS.CLOSE_EXTRA_REPEAT;
            }
            this.keywordsCorrect.push(guess)
            return GUESS.CLOSE_EXTRA;
        }
        return GUESS.WRONG;
    }

}

const prune = (text: string) => {
    return text.replace(/flag: /, "").replace(/’/,"").replace(/'/,"").toLowerCase();
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