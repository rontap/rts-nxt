import {Board} from "../Board.ts";
import {Cell, Kind} from "../Cell.ts";

export class BoardStats {
    board: Board;
    public levelTable = [];

    constructor(board: Board) {
        this.board = board;
        this.saveLevel(board.grid);
    }

    saveLevel(grid: Cell[][]) {
        const table = Object.values(Object.groupBy(grid.flat(2), ({
                                                                      faction, owned, kind
                                                                  }: Cell) => (kind == Kind.WALL ? "attained" : owned === false ? faction : "owned")))
            .map((factionList: Cell[]) => {

                return [factionList[0].kind === Kind.WALL ? "attained" : factionList[0].owned === true ? "owned" : factionList[0].faction, factionList.length]
            })
        table.sort((a, b) => b[0] - a[0]);
        this.levelTable.push(
            table.reverse()
        )
        console.log(this.levelTable, table);
    }
}