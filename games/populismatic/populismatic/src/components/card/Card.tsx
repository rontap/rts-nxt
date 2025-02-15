import './card.css';
import {RGBC} from "../../Factions.ts";

type CardProps = {
    icon: string,
    children: JSX.Element,
    onClick: () => any,
    bg: RGBC,
    title: string,
    total: number,
    nth: number,
    toggle: () => any,
    selected: boolean
}
export default function Card({selected, icon, toggle, children, onClick, bg, title, nth, total}: CardProps) {

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
        </div>
    </div>
}