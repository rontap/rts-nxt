import {ReactNode, SyntheticEvent} from "react";
import {Cell, Kind} from "../Cell.ts";
import {KindDescriptions} from "./Powerup.tsx";

export type CellItemProps = {
    children: ReactNode,
    cell: Cell
    click: (evt: SyntheticEvent, cell: Cell) => void,
    onMouseEnter: () => any,
    onMouseLeave: () => any
}

export function CellItem(props: CellItemProps) {
    const getIcon = () => {
        if (props.cell.isSource) return "🎯"
        if (props.cell.inProgress && props.cell.kind !== Kind.ACTIVIST) return "❎"
        if ((!props.cell.owned || props.cell.inProgress)) {
            if (props.cell.kind == Kind.INFLUENCER) return '🤩'
            if (props.cell.kind == Kind.TACTICAL) return '🤡'
            if (props.cell.kind == Kind.ACTIVIST) return '💣'
            if (props.cell.kind == Kind.BONUS) return '🪩'
            if (props.cell.kind == Kind.DISENFRANCHISED) return '🤷‍♀️'
            if (props.cell.kind == Kind.SUSPICIOUS) return '🪨️'
            if (props.cell.kind == Kind.WALL) return '🧱'
            if (props.cell.kind == Kind.DONOR) return '💵'
        }
        if (props.cell.owned && !props.cell.inProgress) {
            return "×"
        } else
            return ""
    }

    return <div className={"grid " + props.cell.getFactionColor}
                onClick={evt => {
                    props.click(evt, props.cell)
                }}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                title={KindDescriptions[props.cell.kind]}>
        {/*<div className={"debug"}>{props.cell.kind} <br/> ${Math.round(props.cell.getScore() * 10) / 10}</div>*/}
        {getIcon()}
    </div>
}