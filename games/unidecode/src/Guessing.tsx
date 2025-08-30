import {Button, Callout, Card, Heading, Progress, TextField} from "@radix-ui/themes";
import Engine, {GUESS} from "./engine.tsx";
import {calloutRootPropDefs} from "@radix-ui/themes/dist/esm/components/callout.props";
import {useState} from "react";
import type {Emoji} from "unicode-emoji";

const saved = JSON.parse(localStorage.trophies || "[]");
const TIME = 300;
const PENALTY = 30;
const timeLost = (score) => ((100 - score) / 100) * PENALTY

export function Guessing({engine}: { engine: Engine }) {
    const [text, setText] = useState<string>("");
    const [curr, setCurr] = useState<Emoji | undefined>();
    const [guess, setGuess] = useState<GUESS>();
    const [score, setScore] = useState<number>(100);
    const [totalTime, setTotalTime] = useState<number>(TIME);
    const [correctGuesses, setCorrectGuesses] = useState<(string | undefined)[]>([]);
    const [isStarted, setStarted] = useState(false);
    const [fail, setFail] = useState(false);
    const [begin, setBegin] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const doFail = () => {
        setCorrectGuesses(guesses => {
            console.log(saved, [...new Set(saved.concat(guesses))], guesses)
            localStorage.trophies = JSON.stringify([...new Set(saved.concat(guesses))]);
            return guesses;
        })

        const end = new Date();
        setFail(true);
        setTotalTime(undefined);
    }
    const onNext = (penalty = true) => {
        setCurr(engine.next());
        setTotalScore(prev => prev + score)
        if (score === 0) {
            engine.noClue.push(curr);
        }
        if (penalty) {
            setTotalTime(totalTime => totalTime - timeLost(score))
        }
        setScore(0);
        setGuess(undefined);
        setText("")
    }
    const start = () => {
        onNext();
        setBegin(new Date());
        setStarted(true)
        const intval = setInterval(function () {
            setTotalTime(totalTime => {
                if (totalTime < 0) {
                    if (totalTime < 1) {
                        doFail();
                        clearInterval(intval)
                        return 0
                    }
                } else return totalTime - 0.5
            });

        }, 495, totalTime);
        return () => clearInterval(intval);
    };
    const onKey = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const result = engine.submit(event.target.value);
            setGuess(result);
            if (result == GUESS.CORRECT) {
                setText("");
                setCorrectGuesses(correctGuesses.concat(engine.current?.emoji))
                setTotalTime(totalTime => totalTime + 6);
                setTimeout(function () {
                    onNext(false);
                }, 450)
            } else if (result == GUESS.CLOSE_SUBSTR) {
                setScore(score => score + 40 > 80 ? 80 : score + 40)
            } else if (result == GUESS.CLOSE_EXTRA) {
                setScore(score => score + 20 > 80 ? 80 : score + 20)
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            onNext();
        }
    }
    const progress = Math.round(totalTime / TIME * 100)
    return <>
        <Card id={"gameCard"}>
            {!fail && <>
                <div>Time Left ( Each unsolved puzzle subtracts from the time )</div>
                <Progress size="3" color={progress > 40 ? "green" : progress > 15 ? "orange" : "red"}
                          value={progress > 100 ? 100 : progress}/>
                <div id={"emojictr"}>
                    {curr?.emoji}
                </div>
            </>}
            {!isStarted &&
                <><Callout.Root>The goal of the game is to guess the offical UNICODE name of the emoji. You have 5
                    minutes to
                    name as many as you can.<br/>
                    If you skip an emoji, you get up to 30 seconds deducted. You can lower the deducted seconds by:

                    <li>Guessing partially the name of the emoji (40% reduction in penalty)</li>
                    <li>Emojis also have keywords (example: people wrestling has keywords such as duel, combat, ring).
                        Each correct keyword reduces the penalty by a further 20%.<br/> However, the minimum
                        penalty is 6 seconds (80% total reduction).
                    </li>
                    <li>
                        If you guess an emoji correct, you gain 6 seconds.
                    </li>
                </Callout.Root>
                    <br/>
                    <br/>
                    <Button onClick={start} size={"4"} color={"green"}>BEGIN</Button>
                </>}
            <br/>


            {isStarted && !fail && <>
                <TextField.Root radius="large" placeholder="Emoji Name. Press ENTER to submit"
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                                onKeyDown={onKey}/>
                <br/>
                {guess && <Guesswork guess={guess}/>}

                <Progress value={score} size="2" color={score >= 79 ? "purple" : "blue"}/>
                <br/>
                <br/>
                <Button onClick={onNext}>[TAB] SKIP (lose {Math.ceil(timeLost(score))} seconds)</Button>


            </>}
            {fail && <>
                Game over. Total score {totalScore}. Total correct guesses: {correctGuesses.length}
            </>}

        </Card>
        <br/>
        <br/>
        {
            correctGuesses.length > 0 && <>
                <hr/>
                <Heading
                    className={"trophies"}>Trophies: {correctGuesses.length} (total {correctGuesses.concat(saved).length})
                    / {engine.emojis.length}</Heading>
                <span className={"largeText"}>{correctGuesses}</span><br/>
            </>

        }
        <span className={"largeText"}>Collection {saved.length} emojis: {saved}</span>


        {fail && <>
            <Heading className={"trophies"}>You had no clue about {engine.noClue.length} Emojis</Heading>
            Here are some of them:
            <table>
                <thead>
                <tr>
                    <th>Emoji</th>
                    <th>Name</th>
                    <th>Keywords</th>
                </tr>
                </thead>
                {engine.noClue.slice(0, 5).map(el => <tr>
                    <td className={"large"}>{el?.emoji}</td>
                    <td>{el?.description}</td>
                    <td>{el?.keywords.join(", ")}</td>
                </tr>)}
            </table>

        </>}
    </>
}


const getColorFromGuess = (guess: GUESS): (typeof calloutRootPropDefs.color.default) => {
    switch (guess) {
        case GUESS.CORRECT:
            return "green"
        case GUESS.CLOSE_EXTRA:
            return "orange"
        case GUESS.CLOSE_EXTRA_REPEAT:
            return "red"
        case GUESS.CLOSE_SUBSTR:
            return "blue"
        case GUESS.WRONG:
            return "red"
        case GUESS.SHORT:
            return "red"
    }
}

const getTextFromGuess = (guess: GUESS): string => {
    switch (guess) {
        case GUESS.CORRECT:
            return "CORRECT! +5 Seconds"
        case GUESS.CLOSE_EXTRA:
            return "This is not the main emoji name, but a keyword"
        case GUESS.CLOSE_EXTRA_REPEAT:
            return "This is not the main emoji name, but a keyword (and you already used it)"
        case GUESS.CLOSE_SUBSTR:
            return "Your guess is part of the emoji name."
        case GUESS.WRONG:
            return "Incorrect word"
        case GUESS.SHORT:
            return "Your guess is too short"
    }
}

function Guesswork({guess}: { guess: GUESS }) {
    return <Callout.Root color={getColorFromGuess(guess)}>
        <Callout.Text>
            {getTextFromGuess(guess)}
        </Callout.Text>
    </Callout.Root>
}
