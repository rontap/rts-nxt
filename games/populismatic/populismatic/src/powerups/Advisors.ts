import {Faction} from "../Run.ts";
import {Advisor} from "../Powerup.tsx";

export const Advisors: Advisor[] = [
    new Advisor({
        description: "",
        faction: Faction.COMM,
        icon: "",
        name: "",
        onAction: (_, _a) => false,
        onAcquire: () => false,
    })
]