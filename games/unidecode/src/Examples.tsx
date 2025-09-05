import {Button, Callout} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import Engine, {prune} from "./engine.tsx";

export default function Examples({engine}: { engine: Engine }) {
    const [example, setExample] = useState(0);
    let rand = Math.floor(Math.random() * engine.emojis.length)
    useEffect(() => {
        rand = Math.floor(Math.random() * engine.emojis.length)
    }, [example])
    const emo = engine.emojis[rand];
    return <>
        <div>
            <Callout.Root>
                <b className={"capitalize"}>Example Emoji: {prune(emo.description)}</b>
                keywords: ({emo?.keywords.join(", ")})

                <div className={"flr-emoji"}> {emo.emoji}</div>
                {
                    example < 4 ? <span><Button onClick={() => setExample(e => e + 1)}>Another</Button></span> : <br/>
                }
            </Callout.Root>

        </div>
    </>
}