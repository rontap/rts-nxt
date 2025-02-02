import React, {useState} from "react";
import {Run} from "../Run.ts";
import {Advisor} from "./Powerup.tsx";
import {Button, Card, HoverCard} from "@radix-ui/themes";

export default function LeaderJSX({run}: { run: Run }) {

    const leader = run.leader.self;
    return <div id={"leaders"}>
        <Card id={"leader"}>
            <div className={"leaderIcon"}>
                {leader.icon} {leader.name}
            </div>
            {run.leader.description()}

            <br/>
            <Button variant="surface" size="3" className={"btn"} onClick={() => run.leader.onAcquireEffect(run)}>
                {leader.action}
            </Button>
        </Card>
        {run.advisors.map(advisor => <SingleLeaderJSX advisor={advisor}/>)}
    </div>
}

export function SingleLeaderJSX({advisor}: { advisor: Advisor<any> }) {
    const [sel, setSel] = useState(false);
    return <>
        <HoverCard.Root>
            <div onClick={() => setSel(sel => !sel)}>
                <HoverCard.Trigger>
                    <div className={"advisors"}>
                        {advisor.self.icon}&nbsp;
                        {advisor.self.name}
                        {sel && <div>
                            <Button size="1" variant="outline" className={"small-btn"}>Sell</Button>
                        </div>}
                    </div>
                </HoverCard.Trigger>
            </div>
            <HoverCard.Content maxWidth="300px" side="right">
                {advisor.description()}
            </HoverCard.Content>
        </HoverCard.Root>
    </>
}