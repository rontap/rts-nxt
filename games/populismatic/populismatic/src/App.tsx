import React, {SyntheticEvent, useState} from 'react'
import './App.css'
import {Board, Faction, Run} from './Board.ts'
import {Consumable, KindDescriptions, PowerupCtr} from "./components/Powerup.tsx";
import {RandomShop} from "./Shop.tsx";
import LeaderJSX from "./components/Leader.tsx";
import {Cell, Kind} from "./Cell.ts";
import {CellItem} from "./components/CellItem.tsx";
import Header from "./components/Header.tsx";
import Share from "./components/Share.tsx";
import {Party} from "./flavour.ts";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";

const singleRun = new Run(555);
const baseBoard = new Board(singleRun);

export enum Stage {
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

    const opacity = "cc";
    const injectCSS = {
        "--faction-CON": singleRun.parties[Faction.CON].color + opacity,
        "--faction-LIB": singleRun.parties[Faction.LIB].color + opacity,
        "--faction-SOC": singleRun.parties[Faction.SOC].color + opacity,
        "--faction-GREEN": singleRun.parties[Faction.GREEN].color + opacity,
        "--faction-CENTR": singleRun.parties[Faction.CENTR].color + opacity,
        "--faction-COMM": singleRun.parties[Faction.COMM].color + opacity,
        "--faction-FASH": singleRun.parties[Faction.FASH].color + opacity,
        "--faction-WILDCARD": singleRun.parties[Faction.WILDCARD]?.color + opacity,
        "--faction-FAITH": singleRun.parties[Faction.FAITH]?.color + opacity,
        "--faction-NAT": singleRun.parties[Faction.NAT].color + opacity,
    }

    const kinds = Object.values(singleRun.modifiers.generation.kindShare)
    const parties = Object.values(singleRun.parties).filter((party: Party) => party.order <= singleRun.getCurrentLevel.factions);

    return (
        <>
            <Theme>
                <div onKeyDown={expandKeyboard} tabIndex={0} style={injectCSS}>

                    <div id="bleed"></div>
                    {stage === Stage.Game &&
                        <div>
                            <div id={"GB"}>
                                <Share shares={kinds.map(sh => sh.weight)}
                                       desc={kinds.map(sh => sh.description || "")}
                                       colors={kinds.map(kind => kind.color)}
                                       text={kinds.map(kind => kind.icon)}/>
                                <Share shares={parties.map(sh => sh.weight)}
                                       colors={parties.map(party => party.color)}
                                       text={parties.map(sh => sh.name)}/>

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
                                        "--sh-bg": singleRun.parties[baseBoard.getOrigin.faction].color
                                    }}></div>
                                </div>

                            </div>
                            <div className="center">
                                <div className="card">
                                    {Object.values(singleRun.parties)
                                        .filter((party, i) => party.order <= singleRun.getCurrentLevel.factions)
                                        .map((party, i) => {
                                            return <div className={"populismActivator-outer"}>
                                                <button className={"populismActivator"}
                                                        style={{background: party.color}}
                                                        onClick={() => expand(Faction[party.faction] as Faction)}
                                                >
                                                    {party.name},
                                                    {i},{party.weight}

                                                </button>
                                            </div>
                                        })}

                                </div>
                            </div>
                        </div>
                    }
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
                    <Header stage={stage} run={singleRun} board={baseBoard}/>

                    {
                        stage === Stage.Shop && <>
                            {singleRun.powerups.length} / {singleRun.modifiers.powerups.max} Powerup Slots
                            <RandomShop run={singleRun} setCount={setCount} nextStage={nextStage}/>
                        </>
                    }

                </div>
            </Theme>
        </>
    )
}


export default App
