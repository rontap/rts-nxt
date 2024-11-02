import React, {ReactNode, SyntheticEvent, useState} from 'react'
import './App.css'
import {Board, Faction, Run} from './Game'
import {Country} from "./flavour.ts";
import {Consumable, KindDescriptions, LeaderNames, PowerupCtr} from "./Powerup.tsx";
import {RandomShop} from "./Shop.tsx";
import {getFactionColor} from "./Factions.ts";
import LeaderJSX from "./Leader.tsx";
import {Cell, Kind} from "./Cell.ts";
import PolCompass from "./PoliticalCompass.tsx";

const singleRun = new Run(344);
const baseBoard = new Board(singleRun);

enum Stage {
    Game,
    Shop
}

function App() {
    const [count, setCount] = useState(0)
    const [selectTiles, setSelectTiles] = useState<undefined | PowerupCtr>(undefined);
    const [powerup, setPowerup] = useState<undefined | PowerupCtr>(undefined);
    const [stage, setStage] = useState<Stage>(Stage.Game);
    const expand = async (faction: Faction) => {
        await baseBoard.doPopulism(faction, setCount, nextStage)
        setCount(() => count + 1)
    }

    const nextStage = () => {
        if (stage === Stage.Game) {
            setStage(Stage.Shop);
        } else if (stage === Stage.Shop) {
            setStage(Stage.Game);
            baseBoard.nextLevel();
        }
    }


    function PowerupDescription() {
        return <div className="slip">
            <div className="slip-inner">
                Powerup Selected
                {powerup?.icon}
                {powerup?.name}
                <br/>{powerup?.description}<br/>
                <div>
                    <button onClick={() => onActivatePowerup()}>Activate</button>
                </div>
                <div>
                    <button onClick={() => {
                        setPowerup(undefined)
                        setSelectTiles(undefined)
                    }}>Cancel
                    </button>
                </div>
            </div>
        </div>;
    }

    const onClickPowerup = (consumable: Consumable, _i: number) => {
        setPowerup(consumable.self);
        if (consumable.self.boardInteraction) {
            setSelectTiles(consumable.self);
        }
    }
    const onActivatePowerup = () => {
        if (powerup) {
            const currentPowerup = singleRun.usePowerup(powerup);
            currentPowerup.self.onAction(undefined, baseBoard, setCount, nextStage);
            setCount(() => count + 1);
            setPowerup(undefined);
        }
    }

    const onClickCell = (_event: SyntheticEvent, cell: Cell) => {
        if (selectTiles && powerup) {
            const currentPowerup = singleRun.usePowerup(powerup);
            currentPowerup.self.onAction(cell, baseBoard, setCount, nextStage);
            setSelectTiles(undefined);
            setPowerup(undefined);
        } else {
            expand(cell.faction);
        }
    }
    const expandKeyboard = (event: React.KeyboardEvent) => {
        const {key} = event;
        if (!isNaN(Number(key))) {
            const faction = Number(key);
            if (faction >= 0 && faction < singleRun.modifiers.levels[singleRun.level].factions) {
                expand(faction);
            }
        }
    }

    const ownedPercent = Math.floor(baseBoard.filter(cell => cell.owned).length * 100 / baseBoard.map(cell => cell).length);
    return (
        <>
            <div onKeyDown={expandKeyboard} tabIndex={0}>
                <div id="header">
                    <div id="title">Populism Trainer</div>
                    <span id="scoreboard">
                         {stage === Stage.Game && <span className="divider">
                                 <div>
                                {ownedPercent}% / {singleRun.modifiers.winConditions.required}% Control

                                 </div>
                             </span>
                         }
                        <span className="divider">
                            {stage === Stage.Game && <>
                                Step {Math.round(baseBoard.score.step)} | Round {baseBoard.score.round} |&nbsp;
                            </>}
                            Influence {baseBoard.run.influence}
                        </span>
                        <span className="divider">
                             Level {singleRun.level}
                        </span>
                            <span>
                             Maneuvers {singleRun.getCurrentLevel.steps - baseBoard.moves}
                        </span>
                    </span>

                </div>

                <div id="bleed"></div>
                {stage === Stage.Game &&
                    <div>
                        <div id={"GB"}>
                            <div className={selectTiles ? 'gb-selection' : ''}
                                 id={"GB-inner"}
                                 style={{
                                     display: 'grid',
                                     grid: `repeat(${singleRun.getCurrentLevel.size},40px) / repeat(${singleRun.getCurrentLevel.size},40px)`
                                 }}>
                                {baseBoard.map((cell, i) => {

                                    return (<CellItem key={i} cell={cell} click={onClickCell}>
                                        {cell.owned ? '×' : cell.faction}
                                    </CellItem>)
                                })}
                                <div className={"sourceHighlight"} style={{
                                    "--sh-top": baseBoard.origin[0] * 40 + "px",
                                    "--sh-left": (baseBoard.origin[1]) * 40 + "px",
                                    "--sh-bottom": (baseBoard.w - baseBoard.origin[0] - 1) * 40 + "px",
                                    "--sh-right": (baseBoard.h - baseBoard.origin[1] - 1) * 40 + "px",
                                    "--sh-bg": getFactionColor(baseBoard.getOrigin.faction)
                                }}></div>
                            </div>

                        </div>
                        <div className="center">
                            <div className="card">
                                {Object.values(Faction)
                                    .filter(isNaN)
                                    .filter((faction, i) => i < singleRun.getCurrentLevel.factions)
                                    .map((faction, i) => {
                                        return <div className={"populismActivator-outer"}>
                                            <button className={"populismActivator"}
                                                    style={{background: getFactionColor(Faction[faction])}}
                                                    onClick={() => expand(Faction[faction] as Faction)}
                                            >
                                                {Country[LeaderNames.MP].parties[Faction[faction] as Faction].name},
                                                {i},{singleRun.parties[Faction[faction] as Faction].weight}

                                            </button>
                                        </div>
                                    })}

                            </div>
                        </div>
                    </div>
                }
                <PolCompass/>
                <div className="powerupCtr">
                    Powerups<br/>
                    {
                        powerup ? <PowerupDescription/> : singleRun.powerups.map(((consumable, i) => {
                            return consumable.button({
                                onSelect: () => {
                                    onClickPowerup(consumable, i)
                                }
                            })
                        }))
                    }
                </div>
                <LeaderJSX run={singleRun}/>

                {stage === Stage.Shop && <>
                    {singleRun.powerups.length} / {singleRun.modifiers.powerups.max} Powerup Slots
                    <RandomShop run={singleRun} setCount={setCount} nextStage={nextStage}/>
                </>}

            </div>
        </>
    )
}

type CellItemProps = {
    children: ReactNode,
    cell: Cell
    click: (evt: SyntheticEvent, cell: Cell) => void
}

function CellItem(props: CellItemProps) {
    const getIcon = () => {
        if (props.cell.isSource) return "🎯"
        if (props.cell.inProgress && props.cell.kind !== Kind.ACTIVIST) return "❎"
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind == Kind.INFLUENCER) return '🤩'
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind == Kind.TACTICAL) return '🤡'
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind == Kind.ACTIVIST) return '💣'
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind == Kind.BONUS) return '💵'
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind == Kind.DISENFRANCHISED) return '🤷‍♀️'
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind == Kind.SUSPICIOUS) return '🪨️'
        if (props.cell.owned && !props.cell.inProgress) {
            return "×"
        } else
            return ""
    }

    return <div className={"grid " + props.cell.getFactionColor} onClick={evt => props.click(evt, props.cell)}
                title={KindDescriptions[props.cell.kind]}>
        <div className={"debug"}>{props.cell.kind} <br/> ${Math.round(props.cell.getScore() * 10) / 10}</div>
        {getIcon()}
    </div>
}

export default App
