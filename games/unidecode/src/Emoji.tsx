import type {Emoji} from "unicode-emoji";
import Engine from "./engine.tsx";
import {HoverCard, Text} from "@radix-ui/themes";

export default function EmojiJSX({emoji}: { emoji: Emoji }) {
    const rarity = Engine.difficultyText(Engine.difficulty(emoji))
    return <HoverCard.Root>
        <HoverCard.Trigger>
            <div className={"emojictr rarity rarity-" + rarity}>
                {emoji.emoji}</div>
        </HoverCard.Trigger>
        <HoverCard.Content size="1" maxWidth="240px">
            <Text as="div" size="1" trim="both" className={"capitalize"}>
                {emoji.description} <br/>
                Rarity: {rarity}
            </Text>
        </HoverCard.Content>
    </HoverCard.Root>

}