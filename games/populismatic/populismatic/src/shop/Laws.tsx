import './shop.css';

export default function Laws() {
    return <div id={"polCompRegions"} className={"polCompLaws"}>
        <div><LawItem name={"COMMUNIST"}></LawItem></div>
        <div><LawItem name={"NATIONALIST"}></LawItem></div>
        <div><LawItem name={"F*SCIST"}></LawItem></div>
        <div><LawItem name={"SOCIALIST"}></LawItem></div>
        <div><LawItem name={"CENTER"}></LawItem></div>
        <div><LawItem name={"CONSERVATIVE"}></LawItem></div>
        <div><LawItem name={"GREEN"}></LawItem></div>
        <div><LawItem name={"LIBERAL"}></LawItem></div>
        <div><LawItem name={"LIBERTARIAN"}></LawItem></div>
    </div>
}
type LawItemProps = {
    name: string
}

function LawItem({name}: LawItemProps) {
    return <>
        <b>{name}</b>

        <div className={"lawLevels"}>
            <div className={"acquired"}>{" "}</div>
            <div className={"acquired"}>{" "}</div>
            <div className={"notacquired"}>{" "}</div>
            <div className={"notacquired"}>{" "}</div>
            <div className={"notacquired"}>{" "}</div>
        </div>

    </>
}