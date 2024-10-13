import {Faction} from "./Game.ts";

type LocalParties = Record<Faction, string>;
type Country = string;

export const Leaders: Record<Country, { parties: LocalParties }> = {
    "Merkel": {
        parties: {
            [Faction["CON"]]: "CDU",
            [Faction["LIB"]]: "FPD",
            [Faction["SOC"]]: "SPD",
            [Faction["GREEN"]]: "Grünen",
            [Faction["CENTR"]]: "CENTER",
            [Faction["COMM"]]: "Linke",
            [Faction["FASH"]]: "AfD",
            [Faction["NAT"]]: "NAT",
            [Faction["FAITH"]]: "CSU",
            [Faction["FARM"]]: "--"
        }
    }
}

