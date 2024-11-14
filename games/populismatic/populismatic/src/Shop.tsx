import {Run} from "./Run.ts";
import {Dispatch, SetStateAction, useState} from "react";
import {upTo} from "./random.ts";
import {Consumables} from "./powerups/Consumables.ts";
import {Advisors} from "./powerups/Advisors.ts";

type ShopFC = {
    run: Run,
    setCount: Dispatch<SetStateAction<number>>,
    nextStage: () => void,
}
export default function Shop({run, setCount, nextStage}: ShopFC) {
    return <>
        <h2>Shop</h2>
        <div className="grid x4x4 grid-gap-1">
            {
                Consumables.map(consumable => {
                    return consumable.extendedButton({
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

export function RandomShop({run, setCount, nextStage}: ShopFC) {
    const {shop} = run.modifiers
    const [rndConsumables, setRndConsumables] = useState(new Array(run.modifiers.shop.showConsumables)
        .fill(0)
        .map(() => Consumables[upTo(Consumables.length)]));
    const rndAdvisors = Advisors;
    return <>
        <h2>Shop</h2>
        <div className="grid x4x4 gap-4">
            {
                rndConsumables.map((consumable, i: number) => {
                    return consumable.extendedButton({
                        onSelect: () => {
                            if (run.influence > consumable.self.cost) {
                                run.influence -= consumable.self.cost;
                                run.acquirePowerup(consumable);
                                rndConsumables.splice(i, 1);
                                setRndConsumables(rndConsumables);
                                setCount(count => count + 1);
                            }
                        }
                    })
                })
            }
            <hr/>
            {rndAdvisors.map((advisor => advisor.extendedButton({
                onSelect(): void {
                    if (run.influence > 10) {
                        run.influence -= 10;
                        run.acquireAdvisor(advisor);
                        setCount(count => count + 1);
                        advisor.onAcquireEffect(run)
                    }
                }
            })))}

        </div>
        <hr/>
        <button onClick={nextStage} className="btn primary-btn">Next Stage</button>
    </>;
}