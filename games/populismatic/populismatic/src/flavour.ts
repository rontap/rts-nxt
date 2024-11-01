import {Faction} from "./Game.ts";
import {LeaderNames} from "./Powerup.tsx";

type Party = {
    name: string;
    weight: number;
};
type LocalParties = Record<Faction, Party>;
type Country = string;

export const Country: Record<Country, { parties: LocalParties }> = {
    [LeaderNames.Merkel]: {
        parties: {
            [Faction["CON"]]: {name: "CDU", weight: 10},
            [Faction["LIB"]]: {name: "FPD", weight: 10},
            [Faction["SOC"]]: {name: "SPD", weight: 10},
            [Faction["GREEN"]]: {name: "Grünen", weight: 10},
            [Faction["CENTR"]]: {name: "CENTER", weight: 10},
            [Faction["COMM"]]: {name: "Linke", weight: 10},
            [Faction["FASH"]]: {name: "AfD", weight: 10},
            [Faction["NAT"]]: {name: "NAT", weight: 10},
            [Faction["FAITH"]]: {name: "CSU", weight: 10},
            [Faction["FARM"]]: {name: "--", weight: 10}
        }
    },
    [LeaderNames.MP]: {
        parties: {
            [Faction["CON"]]: {name: "FIDESZ", weight: 16},
            [Faction["LIB"]]: {name: "Momentum", weight: 8},
            [Faction["SOC"]]: {name: "MSZP", weight: 8},
            [Faction["GREEN"]]: {name: "LMP", weight: 6},
            [Faction["CENTR"]]: {name: "TISZA", weight: 12},
            [Faction["COMM"]]: {name: "DK", weight: 8},
            [Faction["FASH"]]: {name: "MiHazánk", weight: 8},
            [Faction["NAT"]]: {name: "Jobbik", weight: 6},
            [Faction["FAITH"]]: {name: "KDNP", weight: 6},
            [Faction["FARM"]]: {name: "--", weight: 10},
        }
    }
}

