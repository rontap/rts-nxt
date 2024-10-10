import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Board, Faction, getFactionColor, Run} from './Game'

const singleRun = new Run(15);
const baseBoard = new Board(10, 10, 6, singleRun.level);

function App() {
    const [count, setCount] = useState(0)
    const expand = (faction: Faction) => {
        setCount(() => count + 1)
        baseBoard.doPopulism(faction)
    }
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <button onClick={() => setCount(() => count + 1)}>fr {count}</button>
            <h1>Vite + React</h1>
            <div id={"GB"} style={{display: 'grid', grid: `repeat(${baseBoard.w},30px) / repeat(${baseBoard.h},30px)`}}>
                {baseBoard.map(cell => {
                    if (cell.owned) {
                        return <div className={"grid"}
                                    style={{background: getFactionColor(cell.faction), border: '2px ridge #f1f1f1'}}>
                            *
                        </div>
                    }
                    return (<div className={"grid"}
                                 style={{background: getFactionColor(cell.faction)}}>
                        {cell.faction}
                    </div>)
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

                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
