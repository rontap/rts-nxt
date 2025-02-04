import './card.css';
import {RGBC} from "../../Factions.ts";
import {useState} from "react";

type CardProps = {
    icon: string,
    children: JSX.Element,
    onClick: () => any,
    bg: RGBC,
    title: string,
    total: number,
    nth: number,
    toggle: () => any
}
export default function Card({icon, toggle, children, onClick, bg, title, nth, total}: CardProps) {
    const [toggled, setToggled] = useState(false);
    const offset = (Math.abs(Math.floor(total / 2) - nth) * 13) + "px";
    const totalRounted = Math.floor(total / 2);
    return <div className={`cardOuter ${toggled ? "cardToggled" : ""}`} onClick={() => toggle && setToggled(v => !v)}
                style={{"--card-bg": bg, "--nth-card": nth, "--total-card": totalRounted, "--offset": offset}}>
        <div className={"card "} onClick={toggle ? (toggled ? toggle : onClick) : onClick}>

            <div className={"cardHeader"}>
                <div className={"icon"}>{icon}</div>
                <div className={"cardCost"}>{title}</div>
            </div>
            <div className={"cardContent"}>
                {children}
            </div>
            <div className={"cardLower"}>

            </div>
        </div>
    </div>
}