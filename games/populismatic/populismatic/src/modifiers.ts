import {Kind} from "./Cell.ts";

export type int = number;
export type RecordDefault<T extends string, K> = Record<T, K> & Record<"DEFAULT", K>;
export type Level = {
    size: int,
    factions: int,
    steps: int,
}
export type Modifier = {
    scoring: RecordDefault<any, number>
    levels: Record<string, Level>
    defer: (obj: RecordDefault<any, any>, key: keyof RecordDefault<any, any>) => any
    powerups: {
        max: int
    },
    advisors: {
        max: int
    },
    shop: {
        consumables: int,
        showConsumables: int,
        consumableCost: int
    },
    winConditions: {
        required: int
    },
    generation: {
        kindShare: Record<Kind, number>
    }
}
export const DEFAULT = "DEFAULT" as const;
export const getModifiers = () => {
    return {
        advisors: {
            max: 5,
        },
        defer:
            (obj: RecordDefault<any, any>, key: keyof RecordDefault<any, any>) => {
                return obj[key] ?? obj[DEFAULT]
            },
        generation: {
            kindShare: {
                [Kind.NORMAL]: 200,
                [Kind.DISENFRANCHISED]: 10,
                [Kind.RAINBOW]: 10,
                [Kind.INFLUENCER]: 10,
                [Kind.LUCKY]: 10,
                [Kind.WALL]: 0,
                [Kind.TACTICAL]: 10,
                [Kind.BONUS]: 0,
                [Kind.ACTIVIST]: 10,
                [Kind.SUSPICIOUS]: 0
            }
        },
        levels: {
            '1': {
                size: 8, factions: 3, steps: 13,

            },
            '2': {
                size: 9, factions: 4, steps: 15,

            },
            '3': {
                size: 10, factions: 5, steps: 18,

            },
            '4': {
                size: 11, factions: 6, steps: 20
            },
            '5': {
                size: 12, factions: 6, steps: 24
            },
            '6': {
                size: 13, factions: 7, steps: 26
            },
            '7': {
                size: 14, factions: 8, steps: 28,
            },
            '8': {
                size: 15, factions: 9, steps: 30,
            },
            '9': {
                size: 16, factions: 9, steps: 32,
            },
            '10': {
                size: 17, factions: 9, steps: 32,
            },
            '11': {
                size: 18, factions: 9, steps: 32,
            },
            '12': {
                size: 19, factions: 9, steps: 32,
            },
        },
        powerups: {
            max: 3,
        },
        scoring: {
            [Kind.DISENFRANCHISED]: 0,
            [Kind.BONUS]: 2,
            [Kind.NORMAL]: 1,
            [Kind.RAINBOW]: 0.5,
            [Kind.TACTICAL]: 1.5,
            [Kind.INFLUENCER]: 3,
            [DEFAULT]: 1
        },
        shop: {
            consumables: 11,
            showConsumables: 6,
            consumableCost: 60
        },
        winConditions: {
            required: 100
        }
    } as Modifier;
}
