import {Button, Callout} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import Engine, {prune} from "./engine.tsx";

export default function Examples({engine}: { engine: Engine }) {
    const [example, setExample] = useState(0);
    const [rand, setR] = useState(0)

    useEffect(() => {
        Math.floor(Math.random() * engine.emojis.length)
    }, [])

    const updateEx = () => {
        setExample(e => e + 1)
        setR(Math.floor(Math.random() * engine.emojis.length))
    }
    const emo = engine.emojis[rand];
    return <>
        <div>
            <Callout.Root>
                <b className={"capitalize"}>Example Emoji: {prune(emo.description)}</b>
                keywords: ({emo?.keywords.join(", ")})

                <div className={"flr-emoji"}> {emo.emoji}</div>
                {
                    example < 4 ? <span><Button onClick={updateEx}>Another</Button></span> : <br/>
                }
            </Callout.Root>

        </div>
    </>
}