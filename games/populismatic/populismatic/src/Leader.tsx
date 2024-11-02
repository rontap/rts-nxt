import React from "react";
import {Run} from "./Run.ts";

export default function LeaderJSX({run}: { run: Run }) {
    const leader = run.leader.self;
    return <div id={"leaders"}>
        <div id={"leader"}>
        <div className={"leaderIcon"}>
            {leader.icon}  {leader.name}
        </div>
        {run.leader.description()}

        <br/>
        <button className={"btn"}>
            {leader.action}
        </button>
        </div>
        {run.advisors.map(advisor => <>
                <div className={"hover-container advisors"}>
                    {advisor.self.icon}&nbsp;
                    {advisor.self.name}

                </div>
                <div className={"hover leaderCard"}>
                    {advisor.description()}
                </div>
            </>
        )}

    </div>
}