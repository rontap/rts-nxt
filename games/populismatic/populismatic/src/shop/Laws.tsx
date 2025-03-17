import './shop.css';
import {Faction} from "../Factions.ts";
import {Run} from "../Run.ts";
import {enactFactionLaw, lawCombinations} from "./Laws.ts";
import {useState} from "react";

export default function Laws({run}: { run: Run }) {
    return <div id={"polCompRegions"} className={"polCompLaws"}>
        <div><LawItem run={run} faction={Faction.COMM} name={"COMMUNIST"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.NAT} name={"NATIONALIST"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.FASH} name={"F*SCIST"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.SOC} name={"SOCIALIST"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.CENTR} name={"CENTER"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.CON} name={"CONSERVATIVE"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.GREEN} name={"GREEN"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.LIB} name={"LIBERAL"}></LawItem></div>
        <div><LawItem run={run} faction={Faction.WILDCARD} name={"LIBERTARIAN"}></LawItem></div>
    </div>
}
type LawItemProps = {
    faction: Faction
    name: string
    run: Run
}

function LawItem({name, run, faction}: LawItemProps) {
    const [level, setLevel] = useState(run.modifiers.laws.enacted[faction])
    const currentLaw = lawCombinations[faction][level];

    return <div onClick={() => {
        setLevel(level => level + 1);
        enactFactionLaw(run, faction, currentLaw)
    }}>
        <b>{name}</b>

        <div className={"lawLevels"}>
            <div className={level > 0 ? "acquired" : "notacquired"}>{" "}</div>
            <div className={level > 1 ? "acquired" : "notacquired"}>{" "}</div>
            <div className={level > 2 ? "acquired" : "notacquired"}>{" "}</div>
            <div className={level > 3 ? "acquired" : "notacquired"}>{" "}</div>
            <div className={level > 4 ? "acquired" : "notacquired"}>{" "}</div>
        </div>

    </div>
}