export type RandGen = () => number;

export function randGen(seed: number): RandGen {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export function upTo(number: number) {
    return Math.floor(Math.random() * number);
}

export function upToSeed(seeder: RandGen, number: number) {
    return Math.floor(seeder() * number);
}

// @ts-ignore
Math.randInt = function (max = 100, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function twoDimArray(h: number, w: number, map: () => any = () => false) {
    return new Array(h)
        .fill(0)
        .map(() => new Array(w)
            .fill(0)
            .map(map))
}