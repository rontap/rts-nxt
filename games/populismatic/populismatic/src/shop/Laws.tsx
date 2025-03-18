import './shop.css';
import {Faction} from "../Factions.ts";
import {Run} from "../Run.ts";
import {enactFactionLaw, lawCombinations, lawDescriptions} from "./Laws.ts";
import {useState} from "react";
import {int} from "../modifiers.ts";

export default function Laws({run}: { run: Run }) {
    const [count, setCount] = useState(0);
    const onUpdate = () => {
        setCount(count => count + 1);
    }
    return <div id={"polCompRegions"} className={"polCompLaws"}>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.COMM} name={"COMMUNIST"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.NAT} name={"NATIONALIST"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.FASH} name={"F*SCIST"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.SOC} name={"SOCIALIST"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.CENTR} name={"CENTER"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.CON} name={"CONSERVATIVE"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.GREEN} name={"GREEN"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.LIB} name={"LIBERAL"}></LawItem>
        </div>
        <div><LawItem run={run} count={count} onUpdate={onUpdate} faction={Faction.WILDCARD}
                      name={"LIBERTARIAN"}></LawItem></div>
    </div>
}
type LawItemProps = {
    faction: Faction
    name: string
    run: Run
    onUpdate: (level) => void
    count: int
}

const getLocked = (run: Run, faction: Faction): string | false => {
    const e = run.modifiers.laws.enacted;
    switch (faction) {
        case Faction.FASH:
            return e[Faction.NAT] + e[Faction.CON] ? false : "{NAT} or {CON}"
        case Faction.COMM:
            return e[Faction.SOC] + e[Faction.NAT] ? false : "{SOC} or {NAT}"
        case Faction.GREEN:
            return e[Faction.SOC] + e[Faction.LIB] ? false : "{SOC} or {LIB}"
        case Faction.WILDCARD:
            return e[Faction.CON] + e[Faction.LIB] ? false : "{LIB} or {CON}"
        default:
            return false;
    }
}

function LawItem({name, run, faction, onUpdate, count}: LawItemProps) {

    const [level, setLevel] = useState(run.modifiers.laws.enacted[faction])
    const currentLaw = lawCombinations[faction][level];

    const locked = getLocked(run, faction);
    const lockedText = <i>To pass a law here, you need to pass a {locked} law first. Move the overton window, yknow.</i>

    return <div className={locked && "locked"} onClick={() => {
        if (!locked) {
            setLevel(level => level + 1);
            enactFactionLaw(run, faction, currentLaw)
            onUpdate(level);
        }
    }}>
        <b>{name}</b>
        <div className={"lawDescription"}>
            {locked ? lockedText : lawDescriptions[currentLaw]}
        </div>
        {
            !locked && <div className={"lawLevels"}>
                <div className={level > 0 ? "acquired" : "notacquired"}>{" "}</div>
                <div className={level > 1 ? "acquired" : "notacquired"}>{" "}</div>
                <div className={level > 2 ? "acquired" : "notacquired"}>{" "}</div>
                <div className={level > 3 ? "acquired" : "notacquired"}>{" "}</div>
                <div className={level > 4 ? "acquired" : "notacquired"}>{" "}</div>
            </div>
        }

    </div>
}