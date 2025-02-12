import {Advisor} from "../components/Powerup.tsx";
import {Faction, FactionLEFT, FactionRIGHT} from "../Factions.ts";
import Effect, {Affect} from "../Effects.tsx";
import {Kind} from "../Cell.ts";
import {Rarity} from "./index.ts";

export const Advisors: Advisor[] = [
    new Advisor({
        description: "",
        effects: [],
        faction: Faction.COMM,
        icon: "🎅",
        name: "Karl Marx",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.COMMON

    }),
    new Advisor({
        description: "",
        effects: [new Effect(Affect.Personal, -1, "right"),
            new Effect(Affect.Personal, +1, "weight"),
            new Effect(Affect.Kind, -3, "weight", Kind.DISENFRANCHISED)],
        faction: Faction.COMM,
        icon: "🫨",
        name: "Jeremy Corbyn",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.COMMON
    }),
    new Advisor({
        description: "",
        effects: [new Effect(Affect.Personal, -1, "right"),
            new Effect(Affect.Parties, +0.2, "score", Faction.SOC),
            new Effect(Affect.Parties, -0.2, "score", FactionRIGHT),
            new Effect(Affect.Parties, +2, "weight", FactionLEFT)],
        faction: Faction.SOC,
        icon: "🧑‍🎄",
        name: "Noam Chomsky",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.RARE
    }),
    new Advisor({
        description: "",
        effects: [
            new Effect(Affect.Parties, +5, "weight", Faction.LIB),
            new Effect(Affect.Parties, +1, "score", Faction.LIB),
            new Effect(Affect.Parties, -2, "weight", FactionLEFT)
        ],
        faction: Faction.SOC,
        icon: "🤷‍♀️",
        name: "Ayn Rand",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.LEGENDARY
    }),
    new Advisor({
        description: "",
        sellDescription: "+10 Disenfranchised Share, -5 CON Share, -5 LIB Share",
        effects: [new Effect(Affect.Parties, -0.5, "LEFT", "*"),
            new Effect(Affect.Kind, +5, "weight", Kind.DISENFRANCHISED)],
        faction: Faction.CON,
        icon: "🪨",
        name: "Margaret Thatcher",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.RARE
    }),
    new Advisor({
        description: "The People's Revolution",
        sellDescription: "move all parties +0.5Right",
        effects: [new Effect(Affect.Personal, +1, "LEFT"),
            new Effect(Affect.Personal, +1, "AUTH"),
            new Effect(Affect.Parties, +10, "weight", Faction.COMM),
            new Effect(Affect.Parties, +5, "weight", Faction.SOC),
            new Effect(Affect.Parties, -5, "weight", Faction.NAT),
        ],
        faction: Faction.COMM,
        icon: "⭐",
        name: "Vladimir Lenin",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.LEGENDARY
    }),
    new Advisor({
        description: "Woke Pope lololol",
        sellDescription: "",
        effects: [
            new Effect(Affect.Personal, +1, "LEFT"),
            new Effect(Affect.Parties, +1, "LIB", Faction.FAITH),
            new Effect(Affect.Parties, +1, "LEFT", Faction.FAITH),
            new Effect(Affect.Parties, +5, "weight", Faction.FAITH),
            new Effect(Affect.Parties, -0.5, "score", Faction.FAITH),
        ],
        faction: Faction.COMM,
        icon: "✝️",
        name: "Woke Pope",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.COMMON
    }),
    new Advisor({
        description: "Generally just an awful guy",
        sellDescription: "Disenfranchised voters give -0.5",
        effects: [
            new Effect(Affect.Personal, +1, "LEFT"),
            new Effect(Affect.Personal, +1, "AUTH"),
            new Effect(Affect.Kind, 30, "weight", Kind.DISENFRANCHISED),
            new Effect(Affect.Kind, +0.5, "score", Kind.DISENFRANCHISED),
        ],
        faction: Faction.LIB,
        icon: "🏃‍♀️",
        name: "Pol Pot",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.LEGENDARY
    }),
    new Advisor({
        description: "Let the Free market flow through your veins",
        sellDescription: "{Revert} +15 SOC",
        effects: [
            new Effect(Affect.Personal, +1, "RIGHT"),
            new Effect(Affect.Personal, +1, "LIB"),
            new Effect(Affect.Parties, 5, "weight", Faction.LIB),
            new Effect(Affect.Parties, +0.3, "score", Faction.LIB),
            new Effect(Affect.Parties, -0.3, "score", FactionLEFT),
        ],
        faction: Faction.LIB,
        icon: "💶️",
        name: "Milton Friedman",
        onAction: (_, _a) => false,
        onAcquire: () => false,
        rarity: Rarity.RARE
    }),
]