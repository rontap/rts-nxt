import {Run} from "../Run.ts";
import {Board} from "../Board.ts";
import {Stage} from "../App.tsx";
import './Header.css';
import React, {useState} from "react";
import PolCompass from "./PoliticalCompass.tsx";

interface HeaderProps {
    stage: Stage,
    run: Run,
    board: Board
}

export default function Header({stage, run, board}: HeaderProps) {
    const [polComp, setPolComp] = useState(false);
    const ownedPercent = Math.floor(board.filter(cell => cell.owned).length * 100 / board.map(cell => cell).length);

    return <div id="header">
        <div id="title">Populism Trainer</div>
        <span id="scoreboard">
                         {stage === Stage.Game && <span className="divider">
                                 <div>
                                {ownedPercent}% / {run.modifiers.winConditions.required}% Control

                                 </div>
                             </span>
                         }
            <span className="divider">
                            {stage === Stage.Game && <>
                                Step {Math.round(board.score.step)} | Round {board.score.round} |&nbsp;
                            </>}
                Influence {board.run.influence}
                        </span>
                        <span className="divider">
                             Level {run.level}
                        </span>
                            <span>
                             Maneuvers {run.getCurrentLevel.steps - board.moves}
                        </span>

                    </span>
        <button id={"polComp"} onClick={() => setPolComp(c => !c)}>Political Compass</button>

        {polComp &&
            <div id={"polCompCtr"}>
                <div id={"polCompCtrInner"}>
                    <PolCompass parties={Object.values(run.parties)} run={run}/>
                </div>
            </div>}

    </div>
};