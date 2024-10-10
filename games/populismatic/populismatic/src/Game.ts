import {RandGen, randGen, twoDimArray, upTo, upToSeed} from "./random.ts";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

export class Run {
    root: RandGen;
    shop: RandGen;
    layout: RandGen;
    bosses: RandGen;
    level: RandGen;

    constructor(seed: number = Math.random()) {
        this.root = randGen(seed);
        this.shop = randGen(this.root());
        this.layout = randGen(this.root());
        this.bosses = randGen(this.root());
        this.level = randGen(this.root());
    }
}


export enum Faction {
    "CON",
    "LIB",
    "SOC",
    "GREEN",
    "CENTR",
    "COMM",
    "FASH",
    "FAITH",
    "FARM",
    "NAT"
}

type RGBC = string;

export function getFactionColor(faction: Faction): RGBC {
    switch (faction) {
        case Faction.CON:
            return '#add5ff';
        case Faction.LIB:
            return '#ffc107';
        case Faction.SOC:
            return '#f44336';
        case Faction.GREEN:
            return '#4caf50';
        case Faction.CENTR:
            return '#00bcd4';
        case Faction.COMM:
            return '#e91e63';
        case Faction.FASH:
            return '#444';
        case Faction.FAITH:
            return '#607d8b';
        case Faction.FARM:
            return '#cddc39';
        case Faction.NAT:
            return '#ede7f6';
    }
}

enum Kind {
    NORMAL,
    DISENFRANCHISED,
    RAINBOW,
    HEALTH,
    LUCKY,
    WALL
}

type Coord = number;

class Cell {
    faction: Faction;
    owned: boolean;
    iterated: boolean;
    kind: Kind;
    valid: boolean;

    constructor(faction: Faction) {
        this.faction = faction
        this.owned = false;
        this.iterated = false;
        this.kind = Kind.NORMAL;
        this.valid = false;
    }
}

export class Board {
    h: Coord;
    w: Coord;
    origin: [Coord, Coord]
    grid: Cell[][];

    constructor(h: Coord, w: Coord, factions = 6, seed: RandGen) {
        this.h = h;
        this.w = w;
        this.grid = twoDimArray(h, w, () => new Cell(upToSeed(seed, factions)));

        const startH = upToSeed(seed, h);
        const startW = upToSeed(seed, w);
        this.grid[startH][startW].owned = true;
        this.origin = [startH, startW];

    }

    doPopulism(faction: Faction) {
        this.forEach(cell => {
            if (cell.owned) {
                cell.faction = faction;
            }
        });
        this.expand(this.origin[0], this.origin[1], faction);
        this.forEach(cell => {
            if (cell.owned) {
                cell.faction = faction;
            }
            cell.iterated = false;
        })
    }

    expand(h: Coord, w: Coord, faction: Faction) { //this does the acual expanding of the project
        this.grid[h][w].owned = true;
        this.grid[h][w].iterated = true;
        //looking in the four main directions
        if (this.isValid(h - 1, w, faction)) this.expand(h - 1, w, faction);
        if (this.isValid(h + 1, w, faction)) this.expand(h + 1, w, faction);
        if (this.isValid(h, w - 1, faction)) this.expand(h, w - 1, faction);
        if (this.isValid(h, w + 1, faction)) this.expand(h, w + 1, faction);
    }

    isValid(h: number, w: number, faction: Faction) {
        let isValid = true;
        if (h < 0 || w < 0) isValid = false;  //out of bounds
        else if (h >= this.h || w >= this.w) isValid = false;  //out of bounds
        else if (this.grid[h][w].faction != faction) isValid = false;

        //invalid faction...
        else if (this.grid[h][w].iterated) isValid = false;  //already checked element


        return isValid;
    }

    forEach(cb: (value: Cell, index: number, array: Cell[]) => void) {
        this.grid.forEach(row => row.forEach(cb));
    }

    map(cb: (cell: Cell) => JSX.Element) {
        return this.grid.flat().map(cb);
    }
}


window._G = {Board, Run};