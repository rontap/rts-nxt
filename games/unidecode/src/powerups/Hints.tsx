import {Badge} from "@radix-ui/themes";
import Engine, {safeHints, toText} from "../engine.tsx";
import {difference} from "lodash";
import {useEffect, useState} from "react";

const HINT_TIMER = 5000;
export default function Hints({engine, upTo}: { engine: Engine, upTo: number }) {
    const [showUpTo, setShowUpTo] = useState(0);
    const [timer, setTimer] = useState(new Date().getTime())
    const hints = difference(safeHints(engine.current), engine.keywordsCorrect)
    const hintsShowed = hints.filter((_, i) => i < Math.min(showUpTo, upTo));
    engine.hintsShowed = hintsShowed
    useEffect(() => {
        setShowUpTo(0);
        let intval: number | undefined;

        if (upTo > showUpTo) {
            intval = setInterval(function () {
                    setShowUpTo(v => v + 1)
                    setTimer(new Date().getTime())
                }, HINT_TIMER, setTimer, setShowUpTo
            )
        }

        return () => clearInterval(intval);
    }, [engine.current?.emoji])
    return <>
        <hr className={"extend-hr my-4"}/>
        <span className="my-2 flex gap-2  mr-2">
            <span>Keywords</span>
            {hints.length > hintsShowed.length && <Next timer={timer}/>}
            {hints.length === hintsShowed.length && <Empty/>}
            <span className={"flex gap-2 animate-last-left"}>

            {
                engine.keywordsCorrect.map((kw, i) => {
                    return <Badge size="3" color="teal" className="capitalize" key={i}>{toText(kw)}</Badge>
                })
            }
                {
                    hintsShowed.map((kw, i) => {
                        return <Badge size="3" className="capitalize" key={i}>{toText(kw)}</Badge>
                    })

                }
            </span>


        </span>

    </>
}

function Empty() {
    return <Badge size="3" variant="outline" color="red">No More Hints</Badge>
}

function Next({timer}: { timer: number }) {
    const t = Math.round(-1 * (-HINT_TIMER + new Date().getTime() - timer) / 1000);
    return <Badge size="3" variant="outline" color="amber">
        Next Clue in {Math.max(t, 0)}
    </Badge>
}