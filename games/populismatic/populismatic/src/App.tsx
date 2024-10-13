import {ReactNode, SyntheticEvent, useState} from 'react'
import './App.css'
import {Board, Cell, Faction, getFactionColor, Kind, Run} from './Game'
import {Leaders} from "./flavour.ts";
import {Consumable, Consumables, Powerup, PowerupCtr} from "./Powerup.tsx";

const singleRun = new Run(54596);
const baseBoard = new Board(singleRun);

function App() {
    const [count, setCount] = useState(0)
    const [selectTiles, setSelectTiles] = useState<undefined | PowerupCtr>(undefined);
    const expand = async (faction: Faction) => {
        await baseBoard.doPopulism(faction, setCount)
        setCount(() => count + 1)
    }
    const onClickPowerup = (consumable: Consumable) => {
        if (consumable.self.boardInteraction) {
            setSelectTiles(consumable.self);
        } else {
            consumable.self.onAction(undefined, baseBoard, setCount);
            setCount(() => count + 1);
        }
    }

    const onClickCell = (_event: SyntheticEvent, cell: Cell) => {
        if (selectTiles) {
            selectTiles.onAction(cell, baseBoard, setCount);
            setSelectTiles(undefined);
        } else {
            expand(cell.faction);
        }

    }
    return (
        <>
            <div>
                <div>Level {singleRun.level} | {count}</div>
                <button onClick={() => setSelectTiles(undefined)}>TGL</button>
                <div>Step {Math.round(baseBoard.score.step)} | Round {baseBoard.score.round} |
                    Game {baseBoard.score.game}</div>
                <button onClick={() => setCount(() => count + 1)}>steps
                    left {singleRun.getCurrentLevel.steps - baseBoard.moves}</button>
                <h2>Junta</h2>
                <div id={"GB"} className={selectTiles ? 'gb-selection' : ''} style={{
                    display: 'grid',
                    grid: `repeat(${singleRun.getCurrentLevel.size},40px) / repeat(${singleRun.getCurrentLevel.size},40px)`
                }}>
                    {baseBoard.map((cell, i) => {
                        // if (cell.owned) {
                        //     return <div key={i} className={"grid"}
                        //                 style={{background: getFactionColor(cell.faction), border: '2px ridge #f1f1f1'}}>
                        //         *
                        //     </div>
                        // }
                        return (<CellItem key={i} cell={cell} click={onClickCell}>
                            {cell.owned ? '×' : cell.faction}
                        </CellItem>)
                    })}
                </div>
                <div className="card">
                    {Object.values(Faction)
                        .filter(isNaN)
                        .filter((faction, i) => i < singleRun.getCurrentLevel.factions)
                        .map(faction => {
                            return <div className={"populismActivator-outer"}>
                                <button className={"populismActivator"}
                                        style={{background: getFactionColor(Faction[faction])}}
                                        onClick={() => expand(Faction[faction] as Faction)}
                                >
                                    {Leaders.Merkel.parties[Faction[faction] as Faction]}

                                </button>
                            </div>
                        })}

                </div>
                <hr/>
                Powerups<br/>
                <div className="grid x4x4">
                    {
                        Consumables.map(consumable => {
                            return consumable.jsx({onSelect: () => onClickPowerup(consumable)})
                        })
                    }
                </div>

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

        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind === Kind.ACTIVIST) return '💣'
        if ((!props.cell.owned || props.cell.inProgress) && props.cell.kind === Kind.DISENFRANCHISED) return '🤷‍♀️'
        if (props.cell.owned && !props.cell.inProgress) {
            return "×"
        } else
            return ""
    }

    return <div className={"grid " + props.cell.getFactionColor} onClick={evt => props.click(evt, props.cell)}
    >
        {getIcon()}
    </div>
}

export default App
