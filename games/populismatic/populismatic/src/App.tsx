import React, {SyntheticEvent, useState} from 'react'
import './App.css'
import {Board, Faction, Run} from './Board.ts'
import {Consumable, KindDescriptions, PowerupCtr} from "./components/Powerup.tsx";
import {RandomShop} from "./Shop.tsx";
import LeaderJSX from "./components/Leader.tsx";
import {Cell} from "./Cell.ts";
import {CellItem} from "./components/CellItem.tsx";
import Header from "./components/Header.tsx";
import Share from "./components/Share.tsx";
import {Party} from "./flavour.ts";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import Card from "./components/card/Card.tsx";

const singleRun = new Run(6945);
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
    const [hoveredCell, setHoveredCell] = useState<null | Cell>(null);
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
                <b> Powerup Selected
                    {powerup?.icon}
                    {powerup?.name}
                </b>
                <br/>{powerup?.description}<br/>
                {!powerup?.boardInteraction && <div>
                    <button onClick={() => onActivatePowerup()}>Activate</button>
                </div>}
                <div>
                    <button className={"btn"} onClick={() => {
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
                <div className={`powerupCtr ${powerup && "powerupCtrOn"}`}>
                    {
                        powerup && <PowerupDescription/>
                    }
                </div>
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
                                        return (<CellItem key={i} cell={cell}
                                                          onMouseEnter={() => setHoveredCell(cell)}
                                                          onMouseLeave={() => setHoveredCell(null)}
                                                          click={onClickCell}>
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
                                <div className="cards">
                                    {parties.map((party, i, arr) => {
                                        return <Card
                                            nth={i}
                                            total={parties.length + singleRun.powerups.length}
                                            bg={party.color}
                                            title={party.name}
                                            icon={"👀"} onClick={() => expand(party.faction)}>
                                            Political Party {party.name}

                                        </Card>
                                    })}
                                    {
                                        singleRun.powerups.map(((consumable, i) => {
                                            return <Card
                                                bg={"#444"}
                                                onClick={() => onClickPowerup(consumable, i)}
                                                toggle={() => {
                                                    setPowerup(undefined)
                                                    setSelectTiles(undefined)
                                                }}
                                                icon={consumable.self.icon}
                                                title={"Powerup"}
                                                total={parties.length + singleRun.powerups.length}
                                                nth={parties.length + i}
                                            >
                                                <>{consumable.self.name}</>
                                            </Card>
                                        }))
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {hoveredCell && <div className={"cellDescription"}>
                        <b style={{color: singleRun.parties[hoveredCell?.faction].color}}>
                            {singleRun.parties[hoveredCell?.faction || 0].name}
                        </b>
                        <br/>
                        score: {hoveredCell?.getScore()} {" | "}
                        {hoveredCell?.owned ? "Owned" : "Not owned"}
                        <br/>
                        <div className={"cellKindDescription"}>{KindDescriptions[hoveredCell?.kind || 0] || ""}</div>

                    </div>}

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
