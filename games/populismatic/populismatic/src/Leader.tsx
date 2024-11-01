import React from "react";
import {Run} from "./Run.ts";

export default function LeaderJSX({run}: { run: Run }) {
    const leader = run.leader.self;
    console.log(leader);
    return <div id={"leaders"}>
        <div className={"leaderIcon"}>
            {leader.icon}
        </div>
        {leader.name}
        <br/>
        <button>
            {leader.action}
        </button>
    </div>
}