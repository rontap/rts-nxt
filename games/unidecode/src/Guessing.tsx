import {Badge, Button, Callout, Card, Flex, Progress, Switch, Text, TextField} from "@radix-ui/themes";
import Engine, {GUESS} from "./engine.tsx";
import {useState} from "react";
import type {Emoji} from "unicode-emoji";
import Examples from "./Examples.tsx";
import EmojiJSX from "./Emoji.tsx";


const TIME = 300;
const PENALTY = 30;
const timeLost = (score) => ((100 - score) / 100) * PENALTY

export function Guessing({engine}: { engine: Engine }) {
    const saved = engine.saved;
    const [text, setText] = useState<string>("");
    const [curr, setCurr] = useState<Emoji | undefined>();
    const [guess, setGuess] = useState<GUESS>();
    const [score, setScore] = useState<number>(100);
    const [totalTime, setTotalTime] = useState<number>(TIME);
    const [correctGuesses, setCorrectGuesses] = useState<(string | undefined)[]>([]);
    const [isStarted, setStarted] = useState(false);
    const [fail, setFail] = useState(false);
    const [begin, setBegin] = useState(false);
    const [update, setUpdate] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [showEmojisUpTo, setShowEmojisUpTo] = useState(32 - 8);
    const [pause, setPause] = useState(false);
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
        if (score === 0 && penalty) {
            // if we dont have a penalty, we have guessed it correctly, so no need to add it
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
                    setPause(pause => {
                        if (!pause) {
                            setTotalTime(totalTime => {
                                if (totalTime < 0) {
                                    if (totalTime < 1) {
                                        doFail();
                                        clearInterval(intval)
                                        return 0
                                    }
                                } else return totalTime - 0.5
                            });
                        }
                        return pause;
                    })
                }, 495, totalTime, pause
            )
        ;
        return () => clearInterval(intval);
    };
    const onKey = (event: React.ChangeEvent<HTMLInputElement>, enter = false) => {
        if (enter || event.key === 'Enter') {
            const result = engine.submit(enter ? text : event.target.value);
            setGuess(result);
            if (result == GUESS.CORRECT) {
                setText("");
                setScore(100);
                setCorrectGuesses(correctGuesses.concat(engine.current?.emoji))
                setTotalTime(totalTime => totalTime + 6);
                setTimeout(function () {
                    onNext(false);
                }, 450)
            } else if (result == GUESS.MATCH_PARTIAL) {
                setText("")
                const length = 100 / (engine.current.description.split(" ").length)
                setScore(score => score + length > 95 ? 95 : score + length)
            } else if (result == GUESS.CLOSE_EXTRA) {
                const GUESSED_KEYWORD = 15
                setScore(score => score + GUESSED_KEYWORD > 80 ? 80 : score + GUESSED_KEYWORD)
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            onNext();
        }
    }
    const progress = Math.round(totalTime / TIME * 100)
    const scoreprogress = 565.48 - (score * 5.6548)
    return <>
        <Card className={"gameCard"}>
            {!fail && isStarted && <>
                <div className={"text-center font-200"}>Time Left - Each unsolved puzzle subtracts from the
                    time {pause && "- Paused"}</div>
                <Progress size="3" color={pause ? "blue" : progress > 33 ? "green" : progress > 10 ? "orange" : "red"}

                          value={progress > 100 ? 100 : progress}/>

                <svg id="progress" width="200" height="200" viewBox="-25 -25 250 250" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     style={{transform: "rotate(-90deg)"}}>
                    <circle r="90" cx="100" cy="100" fill="transparent" stroke="#e0e0e0" strokeWidth="16px"></circle>
                    <circle r="90" cx="100" cy="100" stroke="#48F" strokeWidth="16px" strokeLinecap="round"
                            strokeDashoffset={scoreprogress + "px"} fill="transparent"
                            stroke-dasharray={"565.48px"}></circle>
                </svg>


                <div id={"emojictr"}>
                    {pause ? "❓" : curr?.emoji}
                </div>
            </>}
            {!isStarted &&
                <>
                    <div className={"m-2"}>
                        <h3 className={"text-center text-3xl mb-4"}>Welcome to&nbsp;
                            <span
                                className={"underline decoration-dotted decoration-neutral-300 decoration-2 underline-offset-2"}
                                title={"Unicode + Decode = Unidecode"}>Unidecode</span></h3>
                        The goal of the game is to guess the offical UNICODE name of the emoji. You have 5
                        minutes to name as many as you can.<br/>
                        This is harder than it sounds, 😃 is "grinning face with big eyes". If you guess a part of the
                        emoji name correct, you get some points, but you only
                        catch the <s>pokemon</s> emoji if you guess the full name correct.<br/>

                        If you skip an emoji by pressing <Badge>TAB</Badge>, you get up to 30 seconds removed from your
                        time.<br/>
                        You can also cut your losses by guessing keywords correctly. For 😃 some are: "happy, laugh,
                        nice, smile, smiling, teeth"<br/>
                        After your time runs out, you get to keep all of the emojis you collected so far and view it in
                        your collection.
                        <br/>
                        <br/>
                        Happy Hunting!

                    </div>
                    <hr className={"extend-hr mt-3"}/>
                    <br/>


                    <Examples engine={engine}/>


                    <Button className={"!w-full !mt-3"} onClick={start} size={"4"} color={"green"}>BEGIN
                        GUESSING {engine.count} EMOJIS</Button>
                    {saved.length > 20 && <>
                        <Callout.Root color={"amber"} className={"mt-3"}>
                            <Text as="label" size="3">
                                <Flex gap="2">
                                    <Switch size="2"
                                            onCheckedChange={val => {
                                                setUpdate({})
                                                engine.emojisettings.flag = val
                                            }}/> Hard Mode
                                    Mode
                                    (+{engine.emojigroup.flag.length + engine.emojigroup.flag.length + engine.emojigroup.japan.length + engine.emojigroup.new.length} Emojis)
                                </Flex>
                            </Text>
                            You have now more than 20 emojis unlocked, so you can play in hard mode too.<br/>
                            Hard mode adds back all emojis: original japanese emojis like 🈯, flags like 🇬🇷, new emojis
                            like 🧑‍🦼‍➡️ or 🪾.
                        </Callout.Root>
                    </>
                    }

                    {saved.length > 100 && <>
                        <Callout.Root color={"mint"} className={"mt-3"}>
                            <Text as="label" size="3">
                                <Flex gap="2">
                                    <Switch size="2"/> Does not Work yet . Equality Mode
                                    (+{engine.emojigroup.inclusive.length} Emojis)
                                </Flex>
                            </Text>
                            <b>You have now more than 50 emojis unlocked, so you can play in equality mode too.</b>
                            Emojis can have modifiers attached to them, such as skin tone. 👨‍💼 "man office worker" can
                            be 👨🏽‍💼👨🏾‍💼 - skintones range from: light, medium-light, medium, medium-dark to dark. So
                            👨🏿‍💼 is "man office worker dark skin tone"<br/>
                            Emojis with multiple people can be constructed with skin tone modifier and gender modifier.
                            For example
                            💏 "kiss" can be 🧑🏽‍❤️‍💋‍🧑🏼 "kiss person, person, medium skin tone, medium-light skin tone",
                            and adding gender:
                            👩🏻‍❤️‍💋‍👨🏼 "kiss woman, man, light skin tone, medium-light skin tone". <br/>
                            Sometimes, the number of people is flexible, from 🧑‍🧒 "family adult, child" 👩‍👩‍👦‍👦 "family
                            woman, woman, boy, boy"
                            <br/>
                            20% of the emojis will be of this type.
                        </Callout.Root>
                    </>
                    }
                    {saved.length > 200 && <>
                        <Callout.Root color={"red"} className={"mt-3"}>
                            <Text as="label" size="3">
                                <Flex gap="2">
                                    <Switch size="2"/> Does Not Work Yet. Completionist Mode (-N Emojis)
                                </Flex>
                            </Text>
                            You have now more than 250 emojis unlocked, so you can play in completionist mode too.
                            <br/>
                            Only emojis that you do not already know will be asked.
                        </Callout.Root>
                    </>
                    }
                    {saved.length > 100 && <>
                        <Callout.Root color={"purple"} className={"mt-3"}>
                            <Text as="label" size="3">
                                <Flex gap="2">
                                    <Switch size="2"
                                            onCheckedChange={val => {
                                                setUpdate({})
                                                engine.emojisettings.flag = val
                                            }}/> <b>Seeded Run (Does not work yet)</b>
                                </Flex>
                            </Text>
                            <span><TextField.Root variant="surface"/></span>
                            Send this to a friend to have the same emojis and compare skill! Or paste a code
                            already sent to you.
                        </Callout.Root>
                    </>
                    }
                </>}

            {isStarted && !fail && <>
                <TextField.Root radius="large" placeholder="Emoji Name. Press ENTER to submit"
                                value={text}
                                disabled={pause}
                                className={"!mb-3"}
                                onChange={(event) => setText(event.target.value)}
                                onKeyDown={onKey}>
                    <TextField.Slot>
                        {engine.partialGuesses.join(" ")}
                    </TextField.Slot>
                </TextField.Root>

                {guess && <Guesswork guess={guess}/>}
                <div>
                    <Button className={"!w-full"} disabled={pause} onClick={() => onKey(undefined, true)}>GUESS [ENTER]
                    </Button>

                    <Button
                        variant={"outline"}
                        color={"red"}
                        className={"!w-full !mt-3"} onClick={onNext}>SKIP [TAB]
                        (lose {Math.ceil(timeLost(score))} seconds)</Button>

                    <Button className={"!mt-3"} variant={"outline"}
                            onClick={() => setPause(p => !p)}>{pause ? "Continue" : "Pause"}
                    </Button>
                </div>


            </>}
            {fail && <>
                Game over. Total score {Math.round(totalScore)}. Total correct guesses: {correctGuesses.length}
            </>}

        </Card>
        <br/>
        <Card className={"gameCard"}>
            {
                correctGuesses.length > 0 && <>
                    <span
                        className={"medText"}>New Findings {correctGuesses.length}
                    </span>
                    <br/>
                    <span className={"largeText"}>
                         <div className={"grid grid-cols-3 md:grid-cols-4 gap-1"}>
                        {correctGuesses
                            .map(engine.getByEmoji)
                            .sort(Engine.sortRarity)
                            .map((emoji: Emoji, i: number) => {
                                return <EmojiJSX key={i} emoji={emoji}/>

                            })}
                         </div>
                    </span>
                    <div className={"mdText mb-3"}>
                        <br/>In total you now gathered {correctGuesses.concat(saved).length} out of
                        / {engine.emojis.length} emojis
                    </div>
                    <hr className={"extend-hr"}/>
                    <br/>
                </>

            }
            <div className={"medText"}>
                <div className={"mb-2"}>Previously Collected {saved.length} emojis</div>

                <div className={"grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-1 largeText"}>
                    {saved
                        .slice(0, showEmojisUpTo)
                        .map(engine.getByEmoji)
                        .sort(Engine.sortRarity)
                        .map((emoji: Emoji, i: number) => {
                            return <EmojiJSX key={i} emoji={emoji}/>

                        })}
                </div>
                {saved.length > showEmojisUpTo &&
                    <Button variant="outline" className={"!mt-2 !ml-0.5"}
                            onClick={() => setShowEmojisUpTo(e => e + 18)}>Show
                        18 more</Button>
                }
            < /div>
        </Card>
        <br/>


        {
            fail && <Card className={"gameCard"}>
                <div className={"largeText"}>You had no clue about {engine.noClue.length} Emojis</div>
                Here are some of them
                <br/>
                <table className={"missedEmojis mt-4"}>
                    <thead>
                    <tr>
                        <th>Emoji</th>
                        <th>Name</th>
                        <th>Keywords</th>
                    </tr>
                    </thead>
                    {engine.noClue.slice(0, 5).map((el, i) => <tr key={i}>
                        <td className={"largeText"}>{el.emoji && <EmojiJSX emoji={el}/>}</td>
                        <td>{el?.description}</td>
                        <td>{el?.keywords.join(", ")}</td>
                    </tr>)}
                </table>

            </Card>
        }

        <div className={"text-center text-[#666] mt-7"}>Version 1.0 - 2025/09/21 - Made by rontap</div>

    </>
}


const getColorFromGuess = (guess: GUESS): (typeof calloutRootPropDefs.color.default) => {
    switch (guess) {
        case GUESS.CORRECT:
            return "green"
        case GUESS.MATCH_PARTIAL:
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
            return "You have already guessed this keyword or part of the solution"
        case GUESS.MATCH_PARTIAL:
            return "You guessed part of the emoji name!"
        case GUESS.CLOSE_SUBSTR:
            return "Your guess is part of the emoji name!"
        case GUESS.WRONG:
            return "Incorrect word"
        case GUESS.SHORT:
            return "Your guess is too short"
        default:
            return "The programmer is bad at his job"
    }
}

function Guesswork({
                       guess
                   }: {
    guess: GUESS
}) {
    return <Callout.Root variant={"surface"} className={"mt-3 mb-3"} color={getColorFromGuess(guess)}>
        <Callout.Text>
            {getTextFromGuess(guess)}
        </Callout.Text>
    </Callout.Root>
}
