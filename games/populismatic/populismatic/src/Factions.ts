export enum Faction {
    "CON",
    "LIB",
    "SOC",
    "GREEN",
    "CENTR",
    "COMM",
    "FASH",
    "NAT",
    "WILDCARD",
    "FAITH"
}

export type FactionMatch = Faction | Faction[] | undefined;
export const matchFaction = (faction: FactionMatch, to: Faction | Faction[]) => {
    if (faction === undefined) {
        return false;
    }
    if (Array.isArray(faction)) {
        if (Array.isArray(to)) {
            return to.some(el => faction.includes("" + el));
        }
        return faction.includes(to);
    }
    if (Array.isArray(to)) {
        return to.includes(faction);
    }
    return faction == to;
}
export const unwrapFaction = (faction: FactionMatch): Faction => {
    if (faction == undefined) {
        throw ("Cannot unwrap undefined faction");
    }
    if (Array.isArray(faction) && faction.length) {
        return faction[0];
    }
    return faction as Faction;
}


export const FactionLIB = [Faction.LIB, Faction.GREEN, Faction.FAITH];
export const FactionLEFT = [Faction.COMM, Faction.GREEN, Faction.SOC];
export const FactionAUTH = [Faction.COMM, Faction.NAT, Faction.FASH];
export const FactionRIGHT = [Faction.CON, Faction.FASH, Faction.FAITH];
export const FactionC_AUTH_LIB = [Faction.SOC, Faction.CENTR, Faction.CON];
export const FactionC_RIGHT_LEFT = [Faction.NAT, Faction.CENTR, Faction.LIB];
export const FactionALL = [...FactionLIB, ...FactionC_AUTH_LIB, ...FactionAUTH, Faction.WILDCARD];
export const NUM_OF_FACTIONS = 9 as const;

type IdeologyH = {
    AUTH: Faction[],
    CENTER: Faction[],
    LIB: Faction[],
}
type Ideology = {
    LEFT: IdeologyH,
    CENTER: IdeologyH,
    RIGHT: IdeologyH,
}

export enum Ideologies {
    AUTH_LEFT,
    AUTH_CENTER,
    AUTH_RIGHT,
    CENTER_LEFT,
    CENTER_CENTER,
    CENTER_RIGHT,
    LIB_LEFT,
    LIB_CENTER,
    LIB_RIGHT
}

const ideology: Ideology = {
    LEFT: {
        AUTH: [Faction.COMM],
        CENTER: [Faction.GREEN],
        LIB: [Faction.SOC]
    },
    CENTER: {
        AUTH: [Faction.NAT],
        CENTER: [Faction.CON],
        LIB: [Faction.CENTR]
    },
    RIGHT: {
        AUTH: [Faction.FASH],
        CENTER: [Faction.FAITH],
        LIB: [Faction.LIB]
    }
}

export type RGBC = string | `#${string}`;

export function getFactionColor(faction: Faction): RGBC {
    switch (faction) {
        case Faction.CON:
            return '#add5ff';
        case Faction.LIB:
            return '#ffc107';
        case Faction.SOC:
            return '#f3594c';
        case Faction.GREEN:
            return '#5dc561';
        case Faction.CENTR:
            return '#00bcd4';
        case Faction.COMM:
            return '#9575CD';
        case Faction.FASH:
            return '#959595';
        case Faction.WILDCARD:
            return '#7ea1b3';
        case Faction.NAT:
            return '#ede7f6';
        case Faction.FAITH:
            return '#ede7f6';
        default:
            throw Error(`getFactionColor: Unknown Faction ${faction}`);
    }
}

