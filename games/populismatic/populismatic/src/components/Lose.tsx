import {Button} from "@radix-ui/themes";
import {Run} from "../Run.ts";

type LoseFC = {
    run: Run
}
export default function Lose({run}: LoseFC) {
    return <>
        🚧🚧🚧
        <h1>You lost bruh</h1>
        {run.level} Level <br/>

        <br/>
        <Button size={"4"} variant={"surface"} onClick={() => window.alert("Sike!")}>Watch an ad to revive</Button>
        <br/>
        <br/>
        <Button size={"4"} variant={"solid"}>Miért, Gyurcsány Jobb volt?</Button>
    </>
}