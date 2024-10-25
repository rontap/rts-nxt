import {Kind} from "./Game.ts";

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
        consumables: int
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
                size: 10, factions: 5, steps: 24
            },
            '4': {
                size: 11, factions: 5, steps: 26
            },
            '5': {
                size: 12, factions: 6, steps: 28
            },
            '6': {
                size: 13, factions: 7, steps: 32
            },
            '7': {
                size: 14, factions: 8, steps: 36
            },
            '8': {
                size: 13, factions: 8, steps: 38
            },
        },
        powerups: {
            max: 3,
        },
        advisors: {
            max: 5,
        },
        shop: {
            consumables: 9,
        },
        defer:
            (obj: RecordDefault<any, any>, key: keyof RecordDefault<any, any>) => {
                return obj[key] ?? obj[DEFAULT]
            }
    } as Modifier;
}
