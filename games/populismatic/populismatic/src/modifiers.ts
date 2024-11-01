import {Kind} from "./Cell.ts";

export type int = number;
export type RecordDefault<T extends string, K> = Record<T, K> & Record<"DEFAULT", K>;
export type Level = {
    size: int,
    factions: int,
    steps: int
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
    }
}
export const DEFAULT = "DEFAULT" as const;
export const getModifiers = () => {
    return {
        scoring: {
            [Kind.DISENFRANCHISED]: 0,
            [Kind.BONUS]: 2,
            [Kind.NORMAL]: 1,
            [Kind.RAINBOW]: 0.5,
            [DEFAULT]: 1
        },
        levels: {
            '1': {
                size: 8, factions: 3, steps: 13
            },
            '2': {
                size: 9, factions: 4, steps: 18
            },
            '3': {
                size: 10, factions: 5, steps: 10
            },
            '4': {
                size: 11, factions: 5, steps: 22
            },
            '5': {
                size: 12, factions: 6, steps: 26
            },
            '6': {
                size: 13, factions: 7, steps: 28
            },
            '7': {
                size: 14, factions: 8, steps: 32
            },
            '8': {
                size: 14, factions: 9, steps: 34
            },
            '9': {
                size: 15, factions: 9, steps: 34
            },
            '10': {
                size: 16, factions: 9, steps: 34
            },
            '11': {
                size: 17, factions: 9, steps: 34
            },
            '12': {
                size: 18, factions: 9, steps: 34
            },
        },
        powerups: {
            max: 3,
        },
        advisors: {
            max: 5,
        },
        shop: {
            consumables: 11,
            showConsumables: 14,
            consumableCost: 60
        },
        winConditions: {
            required: 100
        },
        defer:
            (obj: RecordDefault<any, any>, key: keyof RecordDefault<any, any>) => {
                return obj[key] ?? obj[DEFAULT]
            }
    } as Modifier;
}
