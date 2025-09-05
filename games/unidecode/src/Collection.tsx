import type {Emoji} from "unicode-emoji";
import type Engine from "./engine.tsx";
import {Card, SegmentedControl} from "@radix-ui/themes";
import {startTransition, Suspense, useState} from "react";
import EmojiJSX from "./Emoji.tsx";

export default function Collection({saved, engine}: { saved: Emoji[], engine: Engine }) {
    const groupped = Object.groupBy(engine.emojis, el => el.group)
    const [selected, setSelected] = useState(Object.keys(groupped)[0]);
    return <>
        <SegmentedControl.Root value={selected} onValueChange={value => startTransition(() => {
            setSelected(value)
        })}>
            {Object.keys(groupped).map(name => {
                return <SegmentedControl.Item value={name}>{name.replace("-", " ")}</SegmentedControl.Item>
            })}
        </SegmentedControl.Root>
        <Card className={"m-2 p-4"}>
            <div className={"grid grid-cols-6 lg:grid-cols-8 text-3xl text-center"}>
                {
                    groupped[selected].map((emoji: Emoji) => <span className={"grid p-1 emojism"}>
                        <Suspense fallback={<></>}>
                            <EmojiJSX emoji={emoji}/>
                        </Suspense>
                </span>
                    )
                }
            </div>
        </Card>
    </>
}