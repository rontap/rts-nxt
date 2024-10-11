import {PRNG, RandGen, randGen, twoDimArray, upTo, upToSeed} from "./random.ts";
import {Dispatch, ReactNode, SetStateAction} from "react";
import {getModifiers, Level, Modifier} from "./modifiers.ts";

export class Run {
    root: PRNG;
    shop: RandGen;
    layout: RandGen;
    bosses: RandGen;
    levelGen: PRNG;
    modifiers: Modifier;
    level: number;

    constructor(seed: number = Math.random()) {
        this.root = new PRNG(seed);
        this.shop = randGen(this.root.next());
        this.layout = randGen(this.root.next());
        this.bosses = randGen(this.root.next());
        this.levelGen = new PRNG(this.root.next());
        this.modifiers = getModifiers();
        this.level = 1;
    }

    get getCurrentLevel(): Level {
        return this.modifiers.levels[String(this.level)]
    }

    nextLevel(): Level {
        this.level++;
        return this.getCurrentLevel;
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
    "NAT",
    "FAITH",
    "FARM" // dyn*
}

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
type RGBC = string;

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
            return '#e65385';
        case Faction.FASH:
            return '#444';
        case Faction.FAITH:
            return '#7ea1b3';
        case Faction.FARM:
            return '#cddc39';
        case Faction.NAT:
            return '#ede7f6';
    }
}

export enum Kind {
    NORMAL,
    DISENFRANCHISED,
    RAINBOW,
    HEALTH,
    LUCKY,
    WALL,
    TACTICAL,
    BONUS,
    ACTIVIST
}

type Coord = number;

export class Cell {
    faction: Faction;
    owned: boolean;
    iterated: boolean;
    kind: Kind;
    valid: boolean;
    board: Board;
    private h: Coord;
    private w: Coord;
    inProgress: boolean;

    constructor(faction: Faction, board: Board, h: Coord, w: Coord) {
        this.faction = faction
        this.owned = false;
        this.iterated = false;
        this.kind = board.run.levelGen.next() > 0.1 ? Kind.NORMAL : [Kind.ACTIVIST, Kind.RAINBOW][Math.floor(board.run.levelGen.next() * 2)];
        this.valid = false;
        this.board = board;
        this.h = h;
        this.w = w;
        this.inProgress = false;
    }

    meetsWinCondition(board: Board) {
        // baseline
        return this.isSameFaction(board.getOrigin.faction);
    }

    isSameFaction(faction: Faction) {
        if (this.kind === Kind.RAINBOW) return true;
        // baseline
        return this.faction === faction;
    }

    getScore() {
        return this.modifiers.defer(this.modifiers.scoring, this.kind)
    }

    get modifiers() {
        return this.board.run.modifiers;
    }

    get getFactionColor() {
        return ["g-faction-" + Object.values(Faction)[this.faction],
            "g-type-" + Object.values(Kind)[this.kind],
            "g-owned-" + this.owned
        ].join(" ");
    }

    onCapture() {
        if (this.kind === Kind.ACTIVIST) {
            setTimeout(() => {
                this.eachNeighbour().forEach(cell => cell.faction = this.faction)
            }, 300, this);
        }
    }

    eachNeighbour(): Cell[] {
        return [
            this.board.maybeGrid(this.h - 1, this.w),
            this.board.maybeGrid(this.h + 1, this.w),
            this.board.maybeGrid(this.h, this.w - 1),
            this.board.maybeGrid(this.h, this.w + 1),
        ].filter((value): value is Cell => value);
    }

    onCaptureDelay() {
        if (this.kind === Kind.ACTIVIST) {
            return 400;
        }
        return 110;
    }
}

interface Score {
    step: number;
    round: number;
    game: number;
}

export class Board {
    h: Coord;
    w: Coord;
    origin: [Coord, Coord]
    grid: Cell[][];
    score: Score;
    run: Run;
    moves: number = 0;
    private inProgress: number;


    constructor(run: Run) {
        this.run = run;
        const level: Level = this.run.getCurrentLevel;
        this.inProgress = 0;
        this.genBoard(level.size, level.size, level.factions);
        this.score = {
            game: 0, round: 0, step: 0
        };

    }

    private genBoard(h: number, w: number, factions: number) {
        this.grid = twoDimArray(h, w, (i: number, j: number) => new Cell(upToSeed(this.run.levelGen.next(), factions), this, i, j));
        const level: Level = this.run.getCurrentLevel;
        this.h = level.size;
        this.w = level.size;
        const startH = upToSeed(this.run.levelGen.next(), h);
        const startW = upToSeed(this.run.levelGen.next(), w);
        this.grid[startH][startW].owned = true;
        this.grid[startH][startW].kind = Kind.NORMAL;
        this.origin = [startH, startW];
        this.moves = 0;
        this.inProgress = 0;
    }

    nextRound() {
        this.score.game += this.score.round;
        this.score.step = 0;
        this.score.round = 0;
        const level: Level = this.run.nextLevel();
        this.genBoard(level.size, level.size, level.factions)
    }

    get getOrigin(): Cell {
        return this.grid[this.origin[0]][this.origin[1]]
    }

    doPopulism(faction: Faction, setCount: Dispatch<SetStateAction<number>>) {
        this.score.step = 0;
        this.moves++;
        this.forEach(cell => {
            if (cell.owned) {
                cell.faction = faction;
            }
        });
        this.expand(this.origin[0], this.origin[1], faction, setCount);
        this.forEach(cell => {
            if (cell.owned) {
                cell.faction = faction;
            }
            cell.iterated = false;
        })
        this.score.step **= 1.5;
        this.score.round += Math.floor(this.score.step);


    }

    checkStatus(setCount: Dispatch<SetStateAction<number>>) {
        if (this.map(cell => cell.inProgress).every(value => value === false)) {
            if (this.win() && this.inProgress === 0) {
                this.inProgress = 1;
                setTimeout(() => {
                    alert('you won lmao');
                    this.nextRound();
                    setCount(count => count + 1);
                }, 600);
            }
            const lose = this.lose();
            if (lose) {
                alert('you loser\n' + lose);
            }
            setCount(count => count + 1);
        }
    }

    async expand(h: Coord, w: Coord, faction: Faction, setCount: Dispatch<SetStateAction<number>>) { //this does the acual expanding of the project
        const cell = this.grid[h][w];
        cell.iterated = true;
        cell.faction = faction;
        let timeout: number = 0;
        if (!cell.owned) {
            cell.owned = true;
            this.score.step += cell.getScore();
            cell.onCapture();
            timeout = cell.onCaptureDelay();
            setCount(count => count + 1);
            cell.inProgress = true;

        }
        cell.owned = true;


        //looking in the four main directions
        await new Promise(resolve => setTimeout(resolve, timeout));
        if (this.isValid(h - 1, w, faction)) this.expand(h - 1, w, faction, setCount);
        if (this.isValid(h + 1, w, faction)) this.expand(h + 1, w, faction, setCount);
        if (this.isValid(h, w - 1, faction)) this.expand(h, w - 1, faction, setCount);
        if (this.isValid(h, w + 1, faction)) this.expand(h, w + 1, faction, setCount);
        cell.inProgress = false;
        this.checkStatus(setCount);

    }

    maybeGrid(h: Coord, w: Coord): Cell | false {
        if (h < 0 || w < 0 || h >= this.h || w >= this.w) return false;
        return this.grid[h][w];
    }

    isValid(h: number, w: number, faction: Faction
    ) {
        let isValid = true;
        if (!this.maybeGrid(h, w)) isValid = false;
        else if (!this.grid[h][w].isSameFaction(faction)) isValid = false; //invalid faction...
        else if (this.grid[h][w].iterated) isValid = false;  //already checked element

        return isValid;
    }

    forEach(cb: (value: Cell, index: number, array: Cell[]) => void) {
        this.grid.forEach(row => row.forEach(cb));
    }

    map(cb: (cell: Cell, i?: number) => ReactNode | boolean) {
        return this.grid.flat().map(cb);
    }

    win(): boolean {

        return this.map((cell: Cell) => {
            return cell.meetsWinCondition(this);
        }).every(value => value === true);
    }

    lose(): boolean | string {
        if (this.win()) return false;

        if (this.moves > this.run.getCurrentLevel.steps) {
            return "Out of Moves";
        } else return false;

    }
}


window._G = {Board, Run};