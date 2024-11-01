import {Board, Coord, PRE_OWNED} from "./Game.ts";
import {Faction, NUM_OF_FACTIONS} from "./Factions.ts";
import {upTo} from "./random.ts";

export  type OnCaptureActions = {
    preventBubbling?: boolean;
}

export enum Kind {
    NORMAL,
    DISENFRANCHISED,
    RAINBOW,
    INFLUENCER,
    LUCKY,
    WALL,
    TACTICAL,
    BONUS,
    ACTIVIST,
    SUSPICIOUS
}


export class Cell {
    faction?: Faction;
    owned: boolean | typeof PRE_OWNED;
    iterated: boolean;
    kind: Kind;
    valid: boolean;
    board: Board;
    h: Coord;
    w: Coord;
    inProgress: boolean = false; // is the cell expansion in progress?
    isSource: boolean = false; // does the expansion process start from this cell
    track: boolean = false; // track a citizen between runs

    constructor(faction: undefined | Faction, board: Board, h: Coord, w: Coord) {
        this.faction = faction;
        this.kind = board.run.levelGen.next() > 0.2 ? Kind.NORMAL : [Kind.ACTIVIST, Kind.RAINBOW, Kind.DISENFRANCHISED, Kind.INFLUENCER, Kind.TACTICAL, Kind.SUSPICIOUS][Math.floor(board.run.levelGen.next() * 5)];
        this.valid = false;
        this.board = board;
        this.h = h;
        this.w = w;
        this.restore()
    }

    restore() {
        this.inProgress = false;
        this.isSource = false;
        this.track = false;
        this.owned = false;
        this.iterated = false;
    }

    meetsWinCondition(board: Board) {
        if (this.kind === Kind.DISENFRANCHISED) return true;
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
            "g-owned-" + this.owned,
            "g-tracked-" + this.track
        ].join(" ");
    }

    onCapture(): OnCaptureActions {
        if (this.kind === Kind.ACTIVIST) {
            setTimeout(() => {
                this.eachNeighbour().forEach(cell => cell.faction = this.faction)
            }, 300, this);
        } else if (this.kind === Kind.SUSPICIOUS) {
            this.faction = Faction[upTo(NUM_OF_FACTIONS)];
        }
        if (this.kind === Kind.TACTICAL) {
            return {preventBubbling: true}
        }
        return {};
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
