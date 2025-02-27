import './card.css';
import {Faction, RGBC} from "../../Factions.ts";

type CardProps = {
    icon: string,
    children: JSX.Element,
    onClick: () => any,
    bg: RGBC,
    title: string,
    total: number,
    nth: number,
    toggle: () => any,
    selected: boolean,
    faction: Faction[]
}
export default function Card({
                                 faction = [],
                                 selected,
                                 icon,
                                 toggle,
                                 children,
                                 onClick,
                                 bg,
                                 title,
                                 nth,
                                 total
                             }: CardProps) {

    const offset = (Math.abs(Math.floor(total / 2) - nth) * 13) + "px";
    const totalRounted = Math.ceil((total - 1) / 2);
    return <div className={`cardOuter ${selected ? "cardToggled" : ""}`}
                style={{"--card-bg": bg, "--nth-card": nth, "--total-card": totalRounted, "--offset": offset}}>

        <div className={"card "} onClick={toggle ? (selected ? toggle : onClick) : onClick}>
            <div className={"cardCost"}>
                1
            </div>
            <div className={"cardHeader"}>
                <div className={"icon"}>{icon}</div>
                <div className={"cardTitle"}>{title}</div>
            </div>
            <div className={"cardContent"}>
                {children}
            </div>
            <div className={"cardLower"}>

            </div>

            <div className={"minipolcom"}>
                {console.log(faction, Faction.CON)}
                <div className={faction.filter(el => el == Faction.COMM).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.NAT).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.FASH).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.SOC).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.CENTR).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.CON).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.GREEN).length ? "active" : "inactive"}></div>
                <div className={faction.filter(el => el == Faction.LIB).length ? "active" : "inactive"}></div>
                <div
                    className={faction.find(el => el == Faction.WILDCARD || el == Faction.FAITH) ? "active" : "inactive"}></div>
            </div>
        </div>
    </div>
}