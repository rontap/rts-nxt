import React, {useState} from "react";
import Engine from "./engine.tsx";
import type {Emoji} from "unicode-emoji";
import {Button} from "@radix-ui/themes";
import EmojiJSX from "./Emoji.tsx"

const PreviousCollection = React.memo(function PreviousCollection() {
    const [showEmojisUpTo, setShowEmojisUpTo] = useState(32 - 8);
    const saved = Engine.saved;
    return <div className={"medText"}>
        <div className={"mb-2"}>Previously Collected {saved.length} emojis</div>

        <div className={"grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-1 largeText"}>
            {saved
                .slice(0, showEmojisUpTo)
                .map(Engine.getByEmoji)
                .sort(Engine.sortRarity)
                .map((emoji: Emoji, i: number) => {
                    return <EmojiJSX key={i} emoji={emoji}/>

                })}
        </div>
        {saved.length > showEmojisUpTo &&
            <Button variant="outline" className={"!mt-2 !ml-0.5"}
                    onClick={() => setShowEmojisUpTo(e => e + 18)}>
                Show 18 more
            </Button>
        }
    </div>
})
export default PreviousCollection;
