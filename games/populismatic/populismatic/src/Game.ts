import {PRNG, RandGen, randGen, twoDimArray, upTo, upToSeed} from "./random.ts";
import {Dispatch, ReactNode, SetStateAction} from "react";
import {getModifiers, Level, Modifier} from "./modifiers.ts";
import {Faction, Run} from "./Run.ts";

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
            return '#959595 ';
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
    STEPS,
    LUCKY,
    WALL,
    TACTICAL,
    BONUS,
    ACTIVIST
}

type Coord = number;
export const PRE_OWNED: string = "" as const;

export class Cell {
    faction: Faction;
    owned: boolean | typeof PRE_OWNED;
    iterated: boolean;
    kind: Kind;
    valid: boolean;
    board: Board;
    h: Coord;
    w: Coord;
    inProgress: boolean;
    isSource: boolean;

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
        this.isSource = false;
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

    set source(to: boolean) {
        this.isSource = to;
        this.owned = to;
        this.kind = Kind.NORMAL;
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
        this.grid[startH][startW].source = true;
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


    async doPopulism(faction: Faction, setCount: Dispatch<SetStateAction<number>>) {
        this.score.step = 0;
        this.moves++;
        this.forEach(cell => {
            if (cell.owned) {
                cell.faction = faction;
            }
        });
        this.forEach(cell => {
            if (cell.isSource) {
                this.expand(cell.h, cell.w, faction, setCount);
            }
        })
        this.forEach(cell => {
            if (cell.owned) {
                cell.faction = faction;
            }
            cell.iterated = false;
        })
        this.score.step **= 1.5;
        this.score.round += Math.floor(this.score.step);
        this.score.step = 0;
    }

    checkStatus(setCount: Dispatch<SetStateAction<number>>) {
        if (this.map(cell => cell.inProgress).every(value => value === false)) {
            if (this.win() && this.inProgress === 0) {
                this.inProgress = 1;
                setTimeout(() => {
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

export {Faction, Run}
// @ts-ignore
window._G = {Board, Run};