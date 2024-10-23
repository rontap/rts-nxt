import {PRNG, randGen, RandGen} from "./random.ts";
import {getModifiers, Level, Modifier} from "./modifiers.ts";
import {Consumable, Powerup, PowerupCtr} from "./Powerup.tsx";

export class Run {
    root: PRNG;
    shop: RandGen;
    layout: RandGen;
    bosses: RandGen;
    levelGen: PRNG;
    modifiers: Modifier;
    level: number;
    powerups: Consumable[];

    constructor(seed: number = Math.random()) {
        this.root = new PRNG(seed);
        this.shop = randGen(this.root.next());
        this.layout = randGen(this.root.next());
        this.bosses = randGen(this.root.next());
        this.levelGen = new PRNG(this.root.next());
        this.modifiers = getModifiers();
        this.level = 1;
        this.powerups = [];
    }

    get getCurrentLevel(): Level {
        return this.modifiers.levels[String(this.level)]
    }

    nextLevel(): Level {
        this.level++;
        return this.getCurrentLevel;
    }

    acquirePowerup(powerup: Powerup) {
        if (this.canAcquirePowerup) {
            this.powerups.push(powerup);
        }
    }

    usePowerup(powerup: PowerupCtr): Powerup {
        const i = this.powerups.findIndex(current => current.self.name === powerup.name)
        return this.powerups.splice(i, 1)[0];
    }

    get canAcquirePowerup() {
        return this.powerups.length < this.modifiers.powerups.max
    }
}


export enum Faction {
    "CON",
    "LIB",
    "SOC",
    "GREEN",
    "CENTR",
    "COMM",
    "FASH",
    "NAT",
    "FAITH",
    "FARM" // dyn*
}

type IdeologyH = {
    AUTH: Faction[],
    CENTER: Faction[],
    LIB: Faction[],
}
type Ideology = {
    LEFT: IdeologyH,
    CENTER: IdeologyH,
    RIGHT: IdeologyH,
}

export enum Ideologies {
    AUTH_LEFT,
    AUTH_CENTER,
    AUTH_RIGHT,
    CENTER_LEFT,
    CENTER_CENTER,
    CENTER_RIGHT,
    LIB_LEFT,
    LIB_CENTER,
    LIB_RIGHT
}

const ideology: Ideology = {
    LEFT: {
        AUTH: [Faction.COMM],
        CENTER: [Faction.GREEN],
        LIB: [Faction.SOC]
    },
    CENTER: {
        AUTH: [Faction.NAT],
        CENTER: [Faction.CON],
        LIB: [Faction.CENTR]
    },
    RIGHT: {
        AUTH: [Faction.FASH],
        CENTER: [Faction.FAITH],
        LIB: [Faction.LIB]
    }
}