import {Run} from "../Run.ts";
import {Board} from "../Board.ts";
import {Stage} from "../App.tsx";
import './Header.css';
import {useState} from "react";
import PolCompass from "./PoliticalCompass.tsx";
import Share from "./Share.tsx";
import {Party} from "../flavour.ts";

interface HeaderProps {
    stage: Stage,
    run: Run,
    board: Board
}

export default function Header({stage, run, board}: HeaderProps) {
    const [polComp, setPolComp] = useState(false);
    const ownedPercent = Math.floor(board.filter(cell => cell.owned).length * 100 / board.length());
    const kinds = Object.values(run.modifiers.generation.kindShare)
    const parties = Object.values(run.parties).filter((party: Party) => party.order <= run.getCurrentLevel.factions);
    return <div id="header">
        <div id="title">Vox populi</div>
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

                    <h2>Voter Types</h2>
                    <Share shares={kinds.map(sh => sh.weight)}
                           desc={kinds.map(sh => sh.description || "")}
                           colors={kinds.map(kind => kind.color)}
                           text={kinds.map(kind => kind.icon)}/>
                    <h2>Party Share</h2>
                    <Share shares={parties.map(sh => sh.weight)}
                           colors={parties.map(party => party.color)}
                           text={parties.map(sh => sh.name)}/>
                    <h2>Political Compass</h2>

                    <PolCompass parties={Object.values(run.parties)} run={run}/>
                    <br/><br/>
                </div>
            </div>}

    </div>
};