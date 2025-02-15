import './results.css';
import {Button} from "@radix-ui/themes";
import {Board} from "../Board.ts";
import Share from "./Share.tsx";
import {Stage} from "../App.tsx";

type ResultsFC = {
    nextStage: (next?: Stage) => any;
    board: Board;
}
export default function Results(props: ResultsFC) {
    const {board} = props;
    return <div id={"results"}>
        <h2>Results</h2>
        <br/>

        {board.stats.levelTable.map((step, i) => <Share shares={step.map(s => s[1])} tiny
                                                        style={{
                                                            "--delays": i + "s",
                                                            opacity: (i / board.stats.levelTable.length) / 3 + 0.66
                                                        }}
                                                        colors={["#67A"].concat(board.run.getCurrentParties.map(party => party.color))}
        />)}
        <div className={"controlPercent"}>

        </div>
        <Button variant={"surface"} size={"4"} onClick={() => props.nextStage()}>Next</Button>
    </div>
}