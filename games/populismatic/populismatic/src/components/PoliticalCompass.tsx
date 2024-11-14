import '../polcomp.css';
import {Party} from "../flavour.ts";
import {Faction} from "../Factions.ts";
import {Run} from "../Run.ts";

export default function PolCompass({parties, run}: { run: Run, parties: Party[] }) {
    const leader = run.leader.self;
    return <>
        <div className={""} id={"polComp"}>
            <div id={"polCompRegions"}>
                <div><span>COMMUNIST</span></div>
                <div><span>NATIONALIST</span></div>
                <div><span>F*SCIST</span></div>
                <div><span>SOCIALIST</span></div>
                <div><span>CENTER</span></div>
                <div><span>CONSERVATIVE</span></div>
                <div><span>GREEN</span></div>
                <div><span>LIBERAL</span></div>
                <div><span>LIBERTARIAN</span></div>
            </div>
            {parties
                .filter(party => party.order <= run.getCurrentLevel.factions)
                .map(party => <PartyJSX party={party}/>)}
            <div
                style={{
                    left: pad(leader.right) - 32 + "px",
                    top: pad(leader.lib) - 10 + "px",
                    "--blop-outline": `var(--q-${Math.floor(leader.lib)}-${Math.floor(leader.right)}`,
                    background: "#444444ee"
                }} className={"blop blop-you"}>
                {run.leader.self.icon} You
            </div>
        </div>

    </>
}
type PartyJSXProps = { party: Party };
const pad = (value: number) => {
    let padded = value;
    if (padded > 2.7) padded = 2.7;
    if (padded < .3) padded = .3;
    return padded * 150
}

export function PartyJSX({party}: PartyJSXProps) {

    return <>
        <div
            style={{
                left: pad(party.right) - 32 + "px",
                top: pad(party.lib) - 10 + "px",
                transform: `scale(${0.90 + party.weight / 40})`,
                "--blop-outline": `var(--q-${Math.floor(party.lib)}-${Math.floor(party.right)}`,
                background: party.color
            }}
            className={`blop g-faction-${Object.values(Faction)[party.faction]}`}>{party.name}/{party.weight}
        </div>
    </>
}