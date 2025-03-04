import {Board, Coord, PRE_OWNED} from "./Board.ts";
import {Faction, FactionMatch, matchFaction, NUM_OF_FACTIONS} from "./Factions.ts";
import {randomWeighted, upTo} from "./random.ts";
import {ConsumableTypes} from "./powerups/Consumables.ts";

export  type OnCaptureActions = {
    preventBubbling?: boolean;
}


// ref:: order (modifiers.generation.kindShare)
export enum Kind {
    NORMAL,
    DISENFRANCHISED,
    RAINBOW,
    INFLUENCER,
    DONOR,
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
    _attained: boolean = false;
    _solidarity: boolean = false;

    constructor(faction: undefined | Faction, board: Board, h: Coord, w: Coord) {
        this.faction = faction;
        this.kind = randomWeighted(
            Object.values(board.run.modifiers.generation.kindShare).map(kinds => kinds.weight),
            Object.keys(Kind),
            board.run.levelGen.next()
        ).toLowerCase();
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
        if (this.kind == Kind.DISENFRANCHISED) return true;
        if (this.kind == Kind.WALL) return true;
        // baseline
        return this.isSameFaction(board.getOrigin.faction);
    }

    canConsumableInteract(consumable?: ConsumableTypes): boolean {
        if (this.kind == Kind.WALL) return false;
        if (this.kind == Kind.DISENFRANCHISED) return false;
        if (this.isSource) return false;
        if (!consumable) return true;

        return true;
    }

    isSameFaction(faction: FactionMatch) {
        if (this.kind == Kind.RAINBOW) return true;
        if (this.faction == undefined) return false;
        // baseline
        return matchFaction(faction, this.faction);
    }

    getScore() {
        const pointsFromKind = this.modifiers.defer(this.modifiers.scoring, this.kind);
        const pointFromEffects = this.board.run.parties[this.faction as Faction].score;
        return pointsFromKind + pointFromEffects;
    }

    get modifiers() {
        return this.board.run.modifiers;
    }

    get getFactionColor() {
        return ["g-faction-" + Object.values(Faction)[this.faction],
            "g-type-" + Object.values(Kind)[this.kind],
            "g-owned-" + this.owned,
            "g-tracked-" + this.track,
            "g-source-" + this.isSource
        ].join(" ");
    }

    get canCapture() {
        if (this.kind == Kind.WALL) return false;
        return true;
    }

    onCapture(): OnCaptureActions {

        if (this.kind == Kind.ACTIVIST) {
            setTimeout(() => {
                this.eachNeighbour().forEach(cell => cell.faction = this.faction)
            }, 300, this);
        } else if (this.kind == Kind.SUSPICIOUS) {
            this.faction = Faction[upTo(NUM_OF_FACTIONS)];
        } else if (this.kind == Kind.DONOR) {
            this.board.moves -= 1;
        }
        if (this.kind == Kind.TACTICAL) {
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
        if (this.kind == Kind.ACTIVIST) {
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
