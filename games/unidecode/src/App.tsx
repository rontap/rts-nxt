import React from 'react'
import './App.css'
import "@radix-ui/themes/styles.css";
import {Heading, Theme} from '@radix-ui/themes';
import Engine from './engine.tsx';
import {Guessing} from "./Guessing.tsx";
import Collection from "./Collection.tsx";

const engine = new Engine();
window.i_am_a_bad_person = engine;

function App() {


    return (
        <>
            <Theme>
                {
                    window.location.hash.includes("CHEAT") && <Collection engine={engine} saved={engine.saved}/>}

                <Heading className={"bs"}>Uni<span>de</span>code</Heading>


                <Guessing engine={engine}/>

            </Theme>
        </>
    )
}

export default App
