import {Board, Cell, Faction, Kind, PRE_OWNED} from "./Game.ts";
import {Ideologies} from "./Run.ts";
import {Dispatch, SetStateAction} from "react";

export type PowerupCtr = {
    name: string,
    icon: string,
    description: string,
    onAction: (cell: Cell | undefined, board: Board, update: Dispatch<SetStateAction<number>>, nextStep: () => void) => void,
    boardInteraction?: boolean,
    that?: Powerup,
    rarity?: number[],

}

type Restr = Faction | Ideologies;

type ConsumableCtr = PowerupCtr & {}
type TeamCtr = PowerupCtr & {
    faction: Faction;
    restriction: Restr[];
}


type ActCtr = PowerupCtr & {}
type PowerupJSX = {
    onSelect: (consumable: Consumable) => void,
}

export class Powerup {
    self: PowerupCtr

    constructor(powerupCtr: PowerupCtr) {
        this.self = powerupCtr;
        this.self.that = this;
    }

    jsx(props: PowerupJSX) {
        return <button className="powerup" onClick={() => props.onSelect(this.self)}>
            {this.self.icon}
            {this.self.name}
        </button>
    }
}

export class Consumable extends Powerup {
    constructor(props: ConsumableCtr) {
        super(props);

    }
}


class Team extends Powerup {
    constructor(props: TeamCtr) {
        super(props);


    }
}

export const Consumables: Consumable[] = [
    new Consumable({
        name: "Recruit Activist",
        icon: "💣",
        description: "Recruit Activist, place a bomb which explodex in a + shape when convinced.",
        onAction: (cell, _board) => {
            cell.kind = Kind.ACTIVIST;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Dedicated Follower",
        icon: "🌈",
        description: "Recruit a dedicated follower, who will join regardless of your current ideology. They just like you. Earns 1/2 Score",
        onAction: (cell, _board) => {
            cell.kind = Kind.RAINBOW;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Disenfranchised Voter",
        icon: "🤷",
        description: "This voter cannot or will not vote. You dont need them to win the level. Earns 0 Score.",
        onAction: (cell, _board) => {
            cell.kind = Kind.DISENFRANCHISED;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "VP",
        icon: "👮",
        description: "Pick a VP. They will be able to campaign for you at a different part of the country.",
        onAction: (cell, _board) => {
            cell.source = true;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Hold Rally",
        icon: "🏟️",
        description: "Hold a rally. People at the periphery of your control may join your ideology.",
        onAction: (_cell, board, update, nextStage) => {
            board.forEach(baseCell => {
                if (baseCell.owned) {
                    baseCell.eachNeighbour().forEach(cell => {
                        const shouldJoin = Math.random() > 0.33;
                        if (!cell.owned && shouldJoin) {
                            cell.owned = PRE_OWNED;
                            cell.faction = board.getOrigin.faction;
                        }
                    })
                }
            })
            setTimeout(() => {
                board.doPopulism(board.getOrigin.faction, update, nextStage).then(() => false);
            }, 300)
        },
        boardInteraction: false,
    }),
    new Consumable({
        name: "Recruit Donor",
        icon: "📈",
        description: "Recruit a voter as a donor. When capturing it, it will give you extra maneuvers (steps).",
        onAction: (cell, board) => {
            console.log('>>', cell, board)
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Recruit Influencer",
        icon: "🧑‍🎤",
        description: "Recruit a voter as an influencer. Earns 3 score.",
        onAction: (cell, board) => {
            console.log('>>', cell, board)
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Anonymus Donation",
        icon: "💶💷💵",
        description: "Arrange an anonymous donation. Earn 5 maneuvers.",
        onAction: (_cell, board) => {
            board.moves -= 5;
        },
        boardInteraction: false,
    }),

] as const;