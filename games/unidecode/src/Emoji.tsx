import type {Emoji} from "unicode-emoji";

export default function EmojiJSX({emoji}: { emoji: Emoji }) {
    return <>{emoji.emoji}</>
}