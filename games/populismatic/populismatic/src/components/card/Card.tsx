import './card.css';
import {Faction, RGBC} from "../../Factions.ts";
import {int} from "../../modifiers.ts";

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
    cost: int
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
                                 total,
                                 cost
                             }: CardProps) {

    const offset = (Math.abs(Math.floor(total / 2) - nth) * 13) + "px";
    const totalRounted = Math.ceil((total - 1) / 2);
    const alt = bg.startsWith("linear-gradient")
    return <div className={`cardOuter ${selected ? "cardToggled" : ""} ${alt ? "alt" : ""}`}
                style={{
                    "--card-bg-alt": bg,
                    "--card-bg": bg,
                    "--nth-card": nth,
                    "--total-card": totalRounted,
                    "--offset": offset
                }}>

        <div className={"card "} onClick={toggle ? (selected ? toggle : onClick) : onClick}>
            <div className={"cardCost"}>
                {cost}
            </div>
            <div className={"cardHeader"}>
                <div className={"cardTitle"}>{title}</div>
            </div>
            <div className={"cardContent"}>
                <div className={"cardImage"}>
                    <div className={"icon"}>{icon}</div>
                </div>
                {children}
            </div>
            <div className={"cardLower"}>

            </div>

            <div className={"minipolcom"}>
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