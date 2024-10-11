import {Faction, Ideologies} from "./Game.ts";

type PowerupCtr = {
    name: string,
    icon: string,
    description: string,

}

type Restr = Faction | Ideologies;

type ConsumableCtr = PowerupCtr & {}
type TeamCtr = PowerupCtr & {
    faction: Faction;
    restriction: Restr[];
}


type ActCtr = PowerupCtr & {}

class Powerup {
    constructor(powerupCtr: PowerupCtr) {
    }
}

class Consumable extends Powerup {
    constructor(props: ConsumableCtr) {
        super(props);

    }
}


class Team extends Powerup {
    constructor(props: TeamCtr) {
        super(props);


    }
}