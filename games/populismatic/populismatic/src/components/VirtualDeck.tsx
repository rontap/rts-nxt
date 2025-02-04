import {Consumable} from "./Powerup.tsx";
import {Party} from "../flavour.ts";
import Card from "./card/Card.tsx";
import React, {useState} from "react";
import {Faction} from "../Factions.ts";

type CardAble = Party | Consumable;

function isParty(party: CardAble): party is Party {
    return party?.name != undefined;
}

type DeckJSX = {
    expand: (f: Faction) => any,
    onClickPowerup: (c: Consumable, i: number, cb: () => void) => any
    setPowerup: (a: any) => void
    setSelectTiles: (a: any) => void
    initialCards: CardAble[]
}
const sorter = (a: CardAble, b: CardAble) => {
    if (a instanceof Consumable && !(b instanceof Consumable)) return 1;
    if (isParty(a) && isParty(b)) {
        return a.order - b.order;
    }
    if (a instanceof Consumable && b instanceof Consumable) {
        return a.self.cost - b.self.cost;
    }
    return 1;
}

export function Deck({initialCards, expand, onClickPowerup, setPowerup, setSelectTiles}: DeckJSX) {

    const scards = initialCards;
    const handSize = 4;
    const [cards, setCards] = useState(scards.slice(0, handSize));
    const [drawPile, setDrawPile] = useState(scards.slice(handSize));
    const sortedCards = cards.sort(sorter)
    const [selected, setSelected] = useState<number | null>(null);

    const playCard = (i) => {
        if (drawPile.length + cards.length <= handSize) {
            // do nothing
        } else {
            setDrawPile(drawPile.concat(cards.filter((_, ii) => ii == i)).slice(1));
            setCards(cards.filter((_, ii) => ii != i).concat(drawPile[0]));
        }
        setSelected(null);
    }
    const useCard = (i) => {
        if (drawPile.length + cards.length <= handSize) {
            // do nothing
        } else {
            setDrawPile(drawPile.slice(1));
            setCards(cards.filter((_, ii) => ii != i).concat(drawPile[0]));

        }
        setSelected(null);
    }


    return <>
        <div id={"decktainer"}>
            Hand Size <span>{handSize}</span><br/>
            Deck <span>{cards.length}</span><br/>
            Draw Pile <span>{drawPile.length}</span>
        </div>
        {sortedCards.map((card, i) => {
            if (card instanceof Consumable) {
                return <Card
                    bg={"#444"}
                    onClick={() => {
                        onClickPowerup(card, i, () => useCard(i))
                        setSelected(i);
                    }}
                    toggle={() => {
                        setPowerup(undefined)
                        setSelectTiles(undefined)
                    }}
                    icon={card.self.icon}
                    title={"Powerup"}
                    total={cards.length}
                    nth={i}
                    key={i}

                    selected={i === selected}
                >
                    <>{card.self.name}</>
                </Card>
            } else if (isParty(card)) {
                return <Card
                    nth={i}
                    key={i}
                    total={cards.length}
                    bg={card.color}
                    title={card.name}
                    selected={i === selected}
                    icon={"👀"} onClick={() => {
                    playCard(i)
                    expand(card.faction)
                }}>
                    <>Political Party {card.name}</>
                </Card>
            } else {
                console.log("unknown type", card);
            }
        })}
    </>

}