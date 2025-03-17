import {Board, Run} from "../Board.ts";
import {Faction, Ideologies} from "../Factions.ts";
import React, {Dispatch, SetStateAction} from "react";
import {Cell, Kind} from "../Cell.ts";
import Effect from "../Effects.tsx";
import {Rarity} from "../powerups";
import {Badge} from "@radix-ui/themes";

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

export enum Use {
    SINGLE, // one-time use
    EXHAUST, // one-time per ROUND
    FOREVER // forever in hand
}

type ConsumableCtr = PowerupCtr & {
    cost: number,
    bg?: string,
    factions: Faction[],
    use: Use
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
        return <div className={"powerupChoice grid space-between"}>
            {this.button(props)}
            <div className={"ml-2"}>{this.self.description}</div>
            <div className="manouverCost">Cost {this.self.cost} Manouvers.</div>
        </div>
    }
}

export class Consumable extends Powerup<ConsumableCtr> {
    constructor(props: ConsumableCtr) {
        super(props);

    }
}


export type AdvisorCtr = PowerupCtr & {
    faction: Faction;
    restriction?: Restr[];
    onAcquire: () => void;
    effects: Effect[];
    rarity: Rarity;
}

export class Advisor<T extends AdvisorCtr> extends Powerup<T> {
    constructor(props: {
        onAction: (_, _a) => boolean;
        effects: any[];
        onAcquire: () => boolean;
        faction: Faction;
        icon: string;
        name: string;
        description: string;
        rarity: Rarity
    }) {
        super(props);
    }

    extendedButton(props: PowerupJSX) {
        return <div className={"powerupChoice grid space-between"}>
            {this.button(props)}
            <span>
            <Badge variant="solid" color={["blue", "purple", "orange"][this.self.rarity]}>
                {this.self.rarity === Rarity.COMMON && "Common"}
                {this.self.rarity === Rarity.RARE && "Rare"}
                {this.self.rarity === Rarity.LEGENDARY && "Legendary"}
            </Badge>
            </span>
            <div className={"ml-2"}>{this.self.description}</div>
            <div className={"ml-2 text-left"}>{this.self.effects.map(effect => effect.jsx())}</div>
            <div className="manouverCost">Cost {this.self.cost} Manouvers.</div>
        </div>
    }

    description() {
        return <>
            <div className={"ml-2"}>{this.self.description}</div>
            <div className={"ml-2"}>{this.self.effects.map(effect => effect.jsx())}</div>
        </>
    }

    onAcquireEffect(run: Run) {
        console.log(this.self.effects)
        this.self.effects.map(effect => effect.doAction(run))
    }

    onSell() {

    }
}

export const KindDescriptions: Record<any, string> = {
    [Kind.NORMAL]: "The default voter. No special abilities.",
    [Kind.ACTIVIST]: "Recruit Activist, place a bomb which explodes in a ➕ shape when convinced.",
    [Kind.RAINBOW]: "Recruit a dedicated follower, who will join regardless of your current ideology. They just like you.",
    [Kind.DISENFRANCHISED]: "This voter cannot or will not vote. You dont need them to win the level. ",
    [Kind.TACTICAL]: "This guy does not like you, but will vote for you regardless because they dislike the opposition more. They will not propagate your ideology however.",
    [Kind.INFLUENCER]: "Recruit a voter as an influencer.",
    [Kind.DONOR]: "Recruit a donor that gives you 1 extra maneuver.",
    [Kind.WALL]: "This cell cannot be interacted with. Does not earn score and you dont need to capture it."
} as const
