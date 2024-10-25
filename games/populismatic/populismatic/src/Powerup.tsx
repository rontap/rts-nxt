import {Board, Cell, Faction, Kind} from "./Game.ts";
import {Ideologies} from "./Run.ts";
import React, {Dispatch, SetStateAction} from "react";

export type PowerupCtr = {
    name: string,
    icon: string,
    description: string,
    onAction: (cell: Cell | undefined, board: Board, update: Dispatch<SetStateAction<number>>, nextStep: () => void) => void,
    boardInteraction?: boolean,
    that?: Powerup,
    rarity?: number[],

}

type Restr = Faction | Ideologies;

type ConsumableCtr = PowerupCtr & {}
type AdvisorCtr = PowerupCtr & {
    faction: Faction;
    restriction?: Restr[];
    onAcquire: () => void;
}


type ActCtr = PowerupCtr & {}
type PowerupJSX = {
    onSelect: (consumable: ConsumableCtr) => void,
}

export class Powerup<T extends PowerupCtr> {
    self: T

    constructor(powerupCtr: T) {
        this.self = powerupCtr;
        this.self.that = this;
    }

    button(props: PowerupJSX) {
        return <button className="powerup" onClick={() => props.onSelect(this.self)}>
            {this.self.icon}
            {this.self.name}
        </button>
    }

    extendedButton(props: PowerupJSX) {
        return <div className={"powerupChoice"}>
            {this.button(props)}
            <div>{this.self.description}</div>
        </div>
    }
}

export class Consumable extends Powerup<ConsumableCtr> {
    constructor(props: ConsumableCtr) {
        super(props);

    }
}


export class Advisor extends Powerup<AdvisorCtr> {
    constructor(props: AdvisorCtr) {
        super(props);
    }

}

export const KindDescriptions: Record<any, string> = {
    [Kind.ACTIVIST]: "Recruit Activist, place a bomb which explodex in a + shape when convinced.",
    [Kind.RAINBOW]: "Recruit a dedicated follower, who will join regardless of your current ideology. They just like you. Earns 1/2 Score",
    [Kind.DISENFRANCHISED]: "This voter cannot or will not vote. You dont need them to win the level. Earns 0 Score.",
    [Kind.TACTICAL]: "This guy does not like you, but will vote for you regardless because they dislike the opposition more. They will not propagate your ideology however. Earns 2 Score.",
    [Kind.INFLUENCER]: "Recruit a voter as an influencer. Earns 3 score."
} as const
