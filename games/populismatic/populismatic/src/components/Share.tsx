import {HoverCard} from "@radix-ui/themes";
import {RGBC} from "../Factions.ts";
import "./Share.css";

type ShareProps = {
    shares: number[]
    colors: RGBC[]
    text: string[]
    upto?: number
    desc?: string[]
}
export default function Share({shares, colors, text, upto, desc}: ShareProps) {
    const share = shares.slice(0, upto || shares.length)
    const sum = share.reduce((acc, cur) => acc + cur, 0)
    const shareProps = share.map(share => share * 100 / sum)
    return <div className={"shareOuter"}>
        <div className={"shareCtr"}>
            {shareProps.map((share, i) => {
                if (share == 0) return null;

                return <HoverCard.Root>
                    <HoverCard.Trigger>
                        <span
                            className={"shareItem"}
                            style={{
                                background: colors[i],
                                width: share + "%"
                            }}>
                            {share > 5 && `${Math.round(share)}%`}
                            &nbsp;
                            {share > 15 && text[i]}
                            </span>
                    </HoverCard.Trigger>
                    <HoverCard.Content maxWidth="300px">
                        Share {Math.round(share)}% <br/>
                        Icon {text[i]}<br/>
                        {desc && desc[i]}
                    </HoverCard.Content>

                </HoverCard.Root>
            })}
        </div>
    </div>
}