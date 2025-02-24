import {Board, PRE_OWNED} from "../Board.ts";
import {Consumable, KindDescriptions} from "../components/Powerup.tsx";
import {Cell, Kind} from "../Cell.ts";
import React from "react";

export const Consumables: Consumable[] = [
    new Consumable({
        name: "Recruit Activist",
        icon: "💣",
        description: KindDescriptions[Kind.ACTIVIST],
        onAction: (cell, _board) => {
            cell.kind = Kind.ACTIVIST;
        },
        boardInteraction: true,
        cost: 60
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
        cost: 60
    }),
    new Consumable({
        name: "Disenfranchised Voter",
        icon: "🤷",
        description: KindDescriptions[Kind.DISENFRANCHISED],
        onAction: (cell, _board) => {
            cell.kind = Kind.DISENFRANCHISED;
        },
        boardInteraction: true,
        cost: 20
    }),
    new Consumable({
        name: "Tactical Voter",
        icon: "🤡",
        description: KindDescriptions[Kind.TACTICAL],
        onAction: (cell, _board) => {
            cell.kind = Kind.TACTICAL;
        },
        boardInteraction: true,
        cost: 20
    }),
    new Consumable({
        name: "VP",
        icon: "👮",
        description: "Pick a VP. They will be able to campaign for you at a different part of the country, changing ideologies as you do.",
        onAction: (cell, _board) => {
            cell.source = true;
        },
        boardInteraction: true,
        cost: 180
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
            }, 400)
        },
        boardInteraction: false,
        cost: 150
    }),
    new Consumable({
        name: "Recruit Donor",
        icon: "📈",
        description: "Recruit a voter as a donor. When capturing it, it will give you extra influence.",
        onAction: (_cell, board) => {
            const addMoves = 10;
            board.run.influence += addMoves;
        },
        boardInteraction: true,
        cost: 80
    }),
    new Consumable({
        name: "Recruit Influencer",
        icon: "🤩",
        description: KindDescriptions[Kind.INFLUENCER],
        onAction: (cell, _board) => {
            cell.kind = Kind.INFLUENCER;
        },
        boardInteraction: true,
        cost: 60
    }),
    new Consumable({
        name: "Anonymus Donation",
        icon: "💷",
        description: "Arrange an anonymous donation. Earn 5 maneuvers.",
        onAction: (_cell, board) => {
            board.moves -= 5;
        },
        boardInteraction: false,
        cost: 60
    }),
    new Consumable({
        description: "Track Citzen, select a single tie to 'Keep' between rounds",
        icon: "",
        name: "Track Citizen",
        cost: 60,
        onAction(cell: Cell | undefined, board: Board, _update: React.Dispatch<React.SetStateAction<number>>, _nextStep: () => void): void {
            cell?.restore();
            cell.track = true;
            board.run.tracked.push(cell as Cell);
        },
        boardInteraction: true
    }),
    new Consumable({
        description: "Intimidate Citizen. They will vote for you out of fear for their life.",
        icon: "🔫",
        name: "intimidate",
        cost: 60,
        onAction(cell: Cell | undefined, board: Board, _update: React.Dispatch<React.SetStateAction<number>>, _nextStep: () => void): void {
            cell.owned = true;
        },
        boardInteraction: true
    }),
    new Consumable({
        cost: 40,
        description: "Use gerrymandering techniques to lower your needed control by -1%. Increases disenfrenchised voter weight.",
        icon: "",
        name: "Gerrymander",
        onAction(_cell: Cell | undefined, board: Board, _update: React.Dispatch<React.SetStateAction<number>>, _nextStep: () => void): void {
            board.run.modifiers.winConditions.required -= 1;
        }
    })

] as const;