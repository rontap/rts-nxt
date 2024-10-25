import {PRNG, randGen, RandGen} from "./random.ts";
import {getModifiers, Level, Modifier} from "./modifiers.ts";
import {Advisor, Consumable, Powerup, PowerupCtr} from "./Powerup.tsx";

export class Run {
    root: PRNG;
    shop: RandGen;
    layout: RandGen;
    bosses: RandGen;
    levelGen: PRNG;
    modifiers: Modifier;
    level: number;
    powerups: Consumable[];
    advisors: Advisor[];

    constructor(seed: number = Math.random()) {
        this.root = new PRNG(seed);
        this.shop = randGen(this.root.next());
        this.layout = randGen(this.root.next());
        this.bosses = randGen(this.root.next());
        this.levelGen = new PRNG(this.root.next());
        this.modifiers = getModifiers();
        this.level = 1;
        this.powerups = [];
        this.advisors = [];
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

    acquireLeader(advisor: Advisor) {
        if (this.canAcquireAdvisor) {
            this.advisors.push(advisor);
            advisor.self.onAcquire();
        }
    }

    get canAcquireAdvisor() {
        return this.advisors.length < this.modifiers.advisors.max
    }
}