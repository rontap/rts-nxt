import {Run} from "./Run.ts";
import {Consumables} from "./Powerup.tsx";
import {Dispatch, SetStateAction} from "react";

type ShopFC = {
    run: Run,
    setCount: Dispatch<SetStateAction<number>>,
    nextStage: () => void,
}
export default function Shop({run, setCount, nextStage}: ShopFC) {
    return <>
        <h2>Shop</h2>
        <div className="grid x4x4">
            {
                Consumables.map(consumable => {
                    return consumable.jsx({
                        onSelect: () => {
                            run.acquirePowerup(consumable)
                            setCount(count => count + 1)
                        }
                    })
                })
            }
        </div>
        <hr/>
        <button onClick={nextStage} className="btn">Next Stage</button>
    </>;
}