import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Board, Cell, Faction, getFactionColor, Kind, Run} from './Game'

const singleRun = new Run(54594);
const baseBoard = new Board(singleRun);

function App() {
    const [count, setCount] = useState(0)
    const [selectTiles, setSelectTiles] = useState(false);
    const expand = (faction: Faction) => {
        setCount(() => count + 1)
        baseBoard.doPopulism(faction, setCount)
    }
    return (
        <>
            <div>
                <div>Level {singleRun.level} | {count}</div>
                <button onClick={() => setSelectTiles(v => !v)}></button>
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
                        return (<CellItem key={i} cell={cell}>
                            {cell.owned ? '×' : cell.faction}
                        </CellItem>)
                    })}
                </div>
                <div className="card">
                    {Object.values(Faction).filter(isNaN).map(faction => {
                        return <button
                            onClick={() => expand(Faction[faction] as Faction)}
                            style={{background: getFactionColor(Faction[faction])}}>
                            {faction}

                        </button>
                    })}

                </div>

            </div>
        </>
    )
}

type CellItemProps = {
    children: React.ReactNode,
    cell: Cell
}

function CellItem(props: CellItemProps) {
    return <div className={"grid " + props.cell.getFactionColor} onClick={() => console.log(props.cell)}
    >
        {props.cell.inProgress && props.cell.kind !== Kind.ACTIVIST && "❎"}
        {props.cell.owned && !props.cell.inProgress ? "×" : ""}
        {(!props.cell.owned || props.cell.inProgress) && props.cell.kind === Kind.ACTIVIST && '💣'}
    </div>
}

export default App
