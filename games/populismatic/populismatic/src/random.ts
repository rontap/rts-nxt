export type RandGen = () => number;

export function randGen(seed: number): RandGen {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export class PRNG {
    private seed: number;
    private readonly modulus: number;
    private readonly multiplier: number;
    private readonly increment: number;

    constructor(seed: number) {
        this.seed = seed; // Initialize seed
        this.modulus = 0x80000000; // 2^31
        this.multiplier = 0x4A39B70D; // Arbitrary multiplier
        this.increment = 0x3D; // Arbitrary increment
    }

    // Generate the next pseudorandom number
    next(): number {
        this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
        return this.seed / this.modulus; // Return a float between 0 and 1
    }

    // Set a new seed for the generator
    setSeed(newSeed: number) {
        this.seed = newSeed;
    }
}

export function upTo(number: number) {
    return Math.floor(Math.random() * number);
}

export function upToSeed(seeder: number, number: number) {

    return Math.floor(seeder * number);
}

// @ts-ignore
Math.randInt = function (max = 100, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function twoDimArray(h: number, w: number, map: (i: number, j: number) => any = () => false) {
    return new Array(h)
        .fill(0)
        .map((_v, i) => new Array(w)
            .fill(0)
            .map((_vv, j) => map(i, j)))
}