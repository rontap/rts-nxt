import {Consumables} from "../powerups/Consumables.ts";
import Card from "../components/card/Card.tsx";
import {Consumable} from "../components/Powerup.tsx";

export default function CardShop() {
    return <>
        <div className={"shopCardSelection"}>
        {
            Object.values(Consumables).map((el: Consumable) => {
                return <>
                    <Card icon={el.self.icon} onClick={() => false} bg={"#444666"} title={el.self.name}
                          standalone={true} total={0} nth={0} toggle={() => false} selected={false}
                          faction={el.self.factions}>
                        {el.self.description}
                    </Card>
                </>
            })
        }
        </div>
    </>
}