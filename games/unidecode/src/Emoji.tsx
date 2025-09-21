import type {Emoji} from "unicode-emoji";
import Engine from "./engine.tsx";
import {HoverCard, Text} from "@radix-ui/themes";

export default function EmojiJSX({emoji, highlight, addText}: { addText?: string, highlight: boolean, emoji: Emoji }) {
    const rarity = Engine.difficultyText(Engine.difficulty(emoji))
    return <HoverCard.Root>
        <HoverCard.Trigger>
            <div className={`emojictr rarity rarity-${rarity} ${highlight ? "highlighted" : ""}`}>
                {emoji.emoji}</div>
        </HoverCard.Trigger>
        <HoverCard.Content size="1" maxWidth="240px">
            <Text as="div" size="1" trim="both" className={"capitalize"}>
                {emoji.description} <br/>
                Rarity: {rarity} <br/>
                {addText}
            </Text>
        </HoverCard.Content>
    </HoverCard.Root>

}