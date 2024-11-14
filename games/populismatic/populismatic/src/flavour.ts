import {Faction} from "./Board.ts";
import {LeaderNames} from "./powerups/Leaders.tsx";

type Color = `#${string}`;

export type Party = {
    name: string;
    weight: number;
    score?: number;
    right: number;// 0 --> 3
    lib: number;// 0 --> 3
    faction: Faction;
    color: Color;
    order: number;
};
export type LocalParties = Record<Faction, Party>;
type Country = string;

const defaultP = {weight: 10, score: 0, right: 0, lib: 0, faction: Faction.WILDCARD, color: "#FF4400"};
export const Country: Record<Country, { parties: LocalParties }> = {
    [LeaderNames.Merkel]: {
        parties: {
            [Faction["CON"]]: {...defaultP, name: "CDU", weight: 10},
            [Faction["LIB"]]: {...defaultP, name: "FPD", weight: 10},
            [Faction["SOC"]]: {...defaultP, name: "SPD", weight: 10},
            [Faction["GREEN"]]: {...defaultP, name: "Grünen", weight: 10},
            [Faction["CENTR"]]: {...defaultP, name: "CENTER", weight: 10},
            [Faction["COMM"]]: {...defaultP, name: "Linke", weight: 10},
            [Faction["FASH"]]: {...defaultP, name: "AfD", weight: 10},
            [Faction["NAT"]]: {...defaultP, name: "NAT", weight: 10},
            [Faction["WILDCARD"]]: {...defaultP, name: "CSU", weight: 10},
        }
    },
    [LeaderNames.MP]: {
        parties: {
            [Faction["CON"]]: {
                ...defaultP,
                name: "Fidesz",
                weight: 15,
                right: 2.2,
                lib: 0.67,
                faction: Faction.CON,
                color: "#fd8100",
                order: 0
            },
            [Faction["LIB"]]: {
                ...defaultP,
                name: "Momentum",
                weight: 6,
                right: 1.6,
                lib: 2.7,
                faction: Faction.LIB,
                color: "#8e6fcd",
                order: 7
            },
            [Faction["SOC"]]: {
                ...defaultP,
                name: "MSZP",
                weight: 6,
                right: 0.90,
                lib: 1.5,
                faction: Faction.SOC,
                color: "#E71A29",
                order: 2
            },
            [Faction["GREEN"]]: {
                ...defaultP,
                name: "LMP",
                weight: 6,
                right: 0.8,
                lib: 2.4,
                faction: Faction.GREEN,
                color: "#73c92d",
                order: 3
            },
            [Faction["CENTR"]]: {
                ...defaultP,
                name: "Tisza",
                weight: 12,
                right: 1.75,
                lib: 1.5,
                faction: Faction.CENTR,
                color: "#182c5b",
                order: 5
            },
            [Faction["COMM"]]: {
                ...defaultP,
                name: "DK",
                weight: 8,
                right: 0.4,
                lib: 1.2,
                faction: Faction.COMM,
                color: "#007FFF",
                order: 6
            },
            [Faction["FASH"]]: {
                ...defaultP,
                name: "MiHazánk",
                weight: 8,
                right: 2.8,
                lib: 0.4,
                faction: Faction.FAITH,
                color: "#688d1b",
                order: 9
            },
            [Faction["NAT"]]: {
                ...defaultP,
                name: "Jobbik",
                weight: 6,
                right: 1.8,
                lib: 1,
                faction: Faction.NAT,
                color: "#009490",
                order: 4,
            },
            [Faction["WILDCARD"]]: {
                ...defaultP,
                name: "MKKP",
                weight: 8,
                right: 1,
                lib: 2.8,
                faction: Faction.WILDCARD,
                color: "#666666",
                order: 8
            },
        }
    }
}

