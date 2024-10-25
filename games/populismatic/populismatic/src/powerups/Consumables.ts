import {Kind, PRE_OWNED} from "../Game.ts";
import {Consumable, KindDescriptions} from "../Powerup.tsx";

export const Consumables: Consumable[] = [
    new Consumable({
        name: "Recruit Activist",
        icon: "💣",
        description: KindDescriptions[Kind.ACTIVIST],
        onAction: (cell, _board) => {
            cell.kind = Kind.ACTIVIST;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Dedicated Follower",
        icon: "🌈",
        description: KindDescriptions[Kind.RAINBOW],
        onAction:
            (cell, _board) => {
                cell.kind = Kind.RAINBOW;
            },
        boardInteraction:
            true,
    }),
    new Consumable({
        name: "Disenfranchised Voter",
        icon: "🤷",
        description: KindDescriptions[Kind.DISENFRANCHISED],
        onAction: (cell, _board) => {
            cell.kind = Kind.DISENFRANCHISED;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Tactical Voter",
        icon: "🤡",
        description: KindDescriptions[Kind.TACTICAL],
        onAction: (cell, _board) => {
            cell.kind = Kind.TACTICAL;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "VP",
        icon: "👮",
        description: "Pick a VP. They will be able to campaign for you at a different part of the country, changing ideologies as you do.",
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
        onAction: (_cell, board) => {
            const addMoves = 4;
            board.moves += addMoves;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Recruit Influencer",
        icon: "🤩",
        description: KindDescriptions[Kind.INFLUENCER],
        onAction: (cell, _board) => {
            cell.kind = Kind.INFLUENCER;
        },
        boardInteraction: true,
    }),
    new Consumable({
        name: "Anonymus Donation",
        icon: "💶💷💵",
        description: "Arrange an anonymous donation. Earn 5 maneuvers.",
        onAction: (_cell, board) => {
            board.moves += 5;
        },
        boardInteraction: false,
    }),

] as const;