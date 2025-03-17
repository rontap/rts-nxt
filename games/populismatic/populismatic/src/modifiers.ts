import {Kind} from "./Cell.ts";
import {Faction, RGBC} from "./Factions.ts";
import {KindDescriptions} from "./components/Powerup.tsx";

export type int = number;
export type RecordDefault<T extends string, K> = Record<T, K> & Record<"DEFAULT", K>;
export type Level = {
    size: int,
    factions: int,
    steps: int,
}
export type KindShare = {
    weight: number
    icon: string
    color: RGBC
    description?: string
    name: string
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
        consumableCost: int,
        rerolls: int // number of rerolls allowed in the shop
    },
    winConditions: {
        required: int
        extraSteps: int
    },
    laws: {
        solidarity: int,
        traditionalism: int,
        freeMarket: int,
        centrist: int,
        enacted: Record<Faction, int>
        modifierForSolidarityAndTraditionalism: int
    },
    generation: {
        kindShare: Record<Kind, KindShare>,
        spawnBias: int
    },
    handSize: int
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
                [Kind.NORMAL]: {
                    weight: 250,
                    icon: 'Standard',
                    name: 'Standard',
                    color: '#c5c5c5',
                    description: KindDescriptions[Kind.NORMAL]
                },
                [Kind.DISENFRANCHISED]: {
                    weight: 10,
                    icon: '🤷‍♀️',
                    name: 'Disenfranchised',
                    color: '#454545',
                    description: KindDescriptions[Kind.DISENFRANCHISED]
                },
                [Kind.RAINBOW]: {
                    weight: 10,
                    icon: '🌈',
                    name: 'Dedicated',
                    color: "linear-gradient(   60deg,    #F44336, #FF9800, #FFEB3B, #4CAF50, #2196F3, #9C27B0)",
                    description: KindDescriptions[Kind.RAINBOW]
                },
                [Kind.INFLUENCER]: {
                    weight: 10,
                    icon: '🤩',
                    name: 'Influencer',
                    color: '#4488FF',
                    description: KindDescriptions[Kind.INFLUENCER]
                },
                [Kind.DONOR]: {
                    weight: 3,
                    icon: '💵',
                    name: 'Donor',
                    color: '#5dc561',
                    description: KindDescriptions[Kind.DONOR]
                },
                [Kind.WALL]: {
                    weight: 10,
                    icon: '🧱',
                    name: 'Wall',
                    color: '#353535',
                },
                [Kind.TACTICAL]: {
                    weight: 10,
                    icon: '🤡',
                    name: 'Tactical',
                    color: '#f36492',
                    description: KindDescriptions[Kind.TACTICAL]
                },
                [Kind.BONUS]: {
                    weight: 0,
                    icon: '💵',
                    name: 'standard',
                    color: '#5dc561',
                },
                [Kind.ACTIVIST]: {
                    weight: 10,
                    icon: '💣',
                    color: '#8fb2f3',
                    name: 'activist',
                    description: KindDescriptions[Kind.ACTIVIST]
                },
                [Kind.SUSPICIOUS]: {
                    weight: 0,
                    icon: '🪨️',
                    name: 'suspicious',
                    color: '#e65385',
                }
            },
            spawnBias: 0,
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
                size: 12, factions: 7, steps: 22
            },
            '6': {
                size: 13, factions: 8, steps: 24
            },
            '7': {
                size: 14, factions: 8, steps: 26,
            },
            '8': {
                size: 15, factions: 9, steps: 28,
            },
            '9': {
                size: 16, factions: 9, steps: 28,
            },
            '10': {
                size: 17, factions: 9, steps: 28,
            },
            '11': {
                size: 18, factions: 9, steps: 28,
            },
            '12': {
                size: 19, factions: 9, steps: 28,
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
            consumables: 6,
            showConsumables: 6,
            consumableCost: 60,
            rerolls: 0 // Law.FreeMarket
        },
        laws: {
            solidarity: 1, // Law.Solidarity
            traditionalism: 1, // Law.Traditionalism
            enacted: {
                [Faction.CON]: 0, // or Redlining or Szalámitaktika or Census
                [Faction.LIB]: 0, // RW solidarity
                [Faction.SOC]: 0, // LF solidarity
                [Faction.GREEN]: 0, // +1 handsize
                [Faction.CENTR]: 0, // + maneuvers
                [Faction.COMM]: 0, // [+maneuvers, <negative>card, +card in shop]
                [Faction.FASH]: 0, // [+1reroll, +1card in shop, <sponsored>card]
                [Faction.NAT]: 0, //
                [Faction.WILDCARD]: 0, //
                [Faction.FAITH]: 0, //
            },
            centrist: 0,
            freeMarket: 0,
            modifierForSolidarityAndTraditionalism: 0.08

        },
        winConditions: {
            required: 100, // Law.Gerrymander
            extraSteps: 0
        },
        handSize: 4 // @deprecate!
    } as Modifier;
}
