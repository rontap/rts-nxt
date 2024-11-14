import React, {useState} from "react";
import {Run} from "../Run.ts";
import {Advisor} from "./Powerup.tsx";

export default function LeaderJSX({run}: { run: Run }) {

    const leader = run.leader.self;
    return <div id={"leaders"}>
        <div id={"leader"}>
            <div className={"leaderIcon"}>
                {leader.icon} {leader.name}
            </div>
            {run.leader.description()}

            <br/>
            <button className={"btn"}>
                {leader.action}
            </button>
        </div>
        {run.advisors.map(advisor => <SingleLeaderJSX advisor={advisor}/>)}
    </div>
}

export function SingleLeaderJSX({advisor}: { advisor: Advisor<any> }) {
    const [sel, setSel] = useState(false);
    return <>
        <div onClick={() => setSel(sel => !sel)}>
            <div className={"hover-container advisors"}>
                {advisor.self.icon}&nbsp;
                {advisor.self.name}
                {sel && <div>
                    <button className={"small-btn"}>Sell</button>
                </div>}
            </div>
            <div className={"hover leaderCard"}>
                {advisor.description()}
            </div>

        </div>
    </>
}