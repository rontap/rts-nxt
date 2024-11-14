import {Faction} from "../Factions.ts";
import {Board} from "../Board.ts";
import React from "react";
import Effect, {Affect} from "../Effects.tsx";
import {Kind} from "../Cell.ts";
import {Advisor, AdvisorCtr} from "../components/Powerup.tsx";

type LeaderCtr = AdvisorCtr & {
    faction: Faction;
    actionDescr: string;
    action: string;
    lib: number;
    right: number;
}

export enum LeaderNames {
    Merkel, // Angela Merkel
    MP // Magyar Péter
}

export class Leader extends Advisor<LeaderCtr> {
    constructor(props: LeaderCtr) {
        super(props);
    }
}

export const Leaders = {
    [LeaderNames.Merkel]: new Leader({
        onAcquire(): void {
        },
        description: "Angela Merkel",
        faction: Faction.COMM,
        icon: "🫶",
        name: "Angela Merkel",
        action: "Wir Schaffen Das",
        right: 1.3,
        lib: 1.3,
        actionDescr: "Sth Sth Sth",
        effects: [],
        onAction(cell: | undefined, board: Board, update: React.Dispatch<React.SetStateAction<number>>, nextStep: () => void): void {
        }
    }),
    [LeaderNames.MP]: new Leader({
        onAcquire(): void {
        },
        description: "",
        faction: Faction.COMM,
        icon: "🇭🇺",
        name: "Magyar Péter",
        action: "Árad a Tisza",
        right: 1.3,
        lib: 1.3,
        actionDescr: "Add a Rally consumable.",
        effects: [
            new Effect(Affect.Parties, -0.5, "weight", [Faction.LIB, Faction.GREEN, Faction.SOC, Faction.COMM]),
            new Effect(Affect.Personal, 2, "weight"),
            new Effect(Affect.Kind, 2, "weight", Kind.ACTIVIST),
        ],
        onAction(cell: | undefined, board: Board, update: React.Dispatch<React.SetStateAction<number>>, nextStep: () => void): void {
        }
    })
}