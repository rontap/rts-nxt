import {Faction} from "./Game.ts";
import {LeaderNames} from "./Powerup.tsx";

export type Party = {
    name: string;
    weight: number;
    score?: number;
};
export type LocalParties = Record<Faction, Party>;
type Country = string;

const defaultP = {weight: 10, score: 0};
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
            [Faction["FAITH"]]: {...defaultP, name: "CSU", weight: 10},
            [Faction["FARM"]]: {...defaultP, name: "--", weight: 10}
        }
    },
    [LeaderNames.MP]: {
        parties: {
            [Faction["CON"]]: {...defaultP, name: "FIDESZ", weight: 15},
            [Faction["LIB"]]: {...defaultP, name: "Momentum", weight: 8},
            [Faction["SOC"]]: {...defaultP, name: "MSZP", weight: 8},
            [Faction["GREEN"]]: {...defaultP, name: "LMP", weight: 6},
            [Faction["CENTR"]]: {...defaultP, name: "TISZA", weight: 12},
            [Faction["COMM"]]: {...defaultP, name: "DK", weight: 8},
            [Faction["FASH"]]: {...defaultP, name: "MiHazánk", weight: 8},
            [Faction["NAT"]]: {...defaultP, name: "Jobbik", weight: 6},
            [Faction["FAITH"]]: {...defaultP, name: "KDNP", weight: 6},
            [Faction["FARM"]]: {...defaultP, name: "--", weight: 10},
        }
    }
}

