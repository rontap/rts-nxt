import {Faction} from "./Run.ts";
import {Board, Coord, Kind, PRE_OWNED} from "./Game.ts";

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
        this.kind = board.run.levelGen.next() > 0.2 ? Kind.NORMAL : [Kind.ACTIVIST, Kind.RAINBOW, Kind.DISENFRANCHISED][Math.floor(board.run.levelGen.next() * 3)];
        this.valid = false;
        this.board = board;
        this.h = h;
        this.w = w;
        this.inProgress = false;
        this.isSource = false;
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
