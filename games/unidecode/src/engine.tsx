import type {BaseEmoji, Emoji} from "unicode-emoji";
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
    CLOSE_EXTRA_REPEAT,
    MATCH_PARTIAL
}

export enum DIFFUCULTY {
    COMMON,
    UNCOMMON,
    RARE,
    LEGENDARY
}

const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 1.2em;'

console.warn("%cDID YOU THINK YOU CAN JUST GET ALL OF THE ANWSERS FROM THE CONSOLE???? I MEAN, YES, BUT BAD DOG!!! They are in the global variable i_am_a_bad_person", style)

const emojis = ue.getEmojis();
// console.log(emojis);
type Emojigroupkw = "japan" | "new" | "flag" | "inclusive"
window.i_am_a_bad_person_emojis = emojis;
export default class Engine {
    #emojis: Emoji[];
    emojigroup: Record<Emojigroupkw, Emoji[]>;
    had: number[];
    current: Emoji | undefined;
    keywordsCorrect: string[];
    partialGuesses: string[];
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
        this.partialGuesses = [];
    }

    get saved() {
        return JSON.parse(localStorage.trophies || "[]");
    }

    getByEmoji(emoji: string) {
        const e = emojis.find(e => e.emoji === emoji);
        if (!e) return {
            emoji,
            rarity: DIFFUCULTY.LEGENDARY
        }
        else return e
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
        this.partialGuesses = [];
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

        const guessAndPrev = guess + " " + this.partialGuesses.join(" ")

        // if the two guesses are identical, CORRECT

        if (compare(guessAndPrev, description)) {
            this.partialGuesses = [];
            return GUESS.CORRECT;
        }


        // if the whole text section has partial match, CLOSE_SUBSTR
        if (description.includes(guess) || guess.includes(description)) {
            // if this was already a guess, do not include it.
            console.log(guess, description)
            if (this.partialGuesses.includes(guess)) {
                return GUESS.CLOSE_EXTRA_REPEAT;
            } else if (partiallyIncludes(guess, description)) {
                console.log("partmatch")
                this.partialGuesses.push(guess)
                return GUESS.MATCH_PARTIAL
            }
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

    static difficulty(emoji: BaseEmoji): DIFFUCULTY {
        const easy = "👻👽❤️🩷🧡💛💚💙🩵💜🤎🖤🩶🤍🦵🦶👂👁️🦴👃👄👅🏠🧱🚕⚓🛹⛺🌈⚾\n" +
            "🏀👓🎸🔋💊🚬🪦🔴🟠🟡🟢🔵🟣🟤⚫⚪🏳️🏴🏳️‍🌈🫁🧠🫀📅🔨🔑🚽🧬🧺🪣🧼🪒📎🎀🎄🎈🎫🏆🧵👕👖🥁🎺🎧🖱️⌨️🖨️🕯️🪙🧲🪜🔬🚪🩻🧽🪥🚭"
        const hard = "🙊🙉🙈🐲🦕💮🪷🌺🍃☘️🏵️🐠🥀🫔🥮🍥🍶💒🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦⛄"
        if (emoji.rarity) {
            return emoji.rarity
        }
        if (easy.includes(emoji.emoji)) {
            return DIFFUCULTY.COMMON
        }
        if (hard.includes(emoji.emoji)) {
            return DIFFUCULTY.RARE
        }
        if (emoji.category === "food-drink") {
            return DIFFUCULTY.COMMON
        }
        if (emoji.category === "animals-nature") {
            return DIFFUCULTY.COMMON
        }
        if (emoji.group === "activities") {
            return DIFFUCULTY.UNCOMMON
        }
        if (emoji.group === "flags") {
            return DIFFUCULTY.RARE
        }
        if (emoji.group === "symbols") {
            return DIFFUCULTY.RARE
        }
        if (emoji.description?.split(" ").length > 3) {
            return DIFFUCULTY.RARE
        }
        return DIFFUCULTY.UNCOMMON
    }

    static sortRarity(a: Emoji, b: Emoji) {
        return Engine.difficulty(a) - Engine.difficulty(b)
    }

    static difficultyText(d: DIFFUCULTY) {
        switch (d) {
            case DIFFUCULTY.COMMON:
                return "common"
            case DIFFUCULTY.UNCOMMON:
                return "uncommon"
            case DIFFUCULTY.RARE:
                return "rare"
            case DIFFUCULTY.LEGENDARY:
                return "legendary"

        }
    }

}

export const prune = (text: string) => {
    return text
        .replace(/flag: /, "")
        .replace(/’/g, "")
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/:/g, "")
        .replace(/[ \t]+$/g, "") //trailing spaces
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
