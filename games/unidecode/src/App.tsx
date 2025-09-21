import React from 'react'
import './App.css'
import "@radix-ui/themes/styles.css";
import {Heading, Theme} from '@radix-ui/themes';
import Engine from './engine.tsx';
import {Guessing} from "./Guessing.tsx";

const engine = new Engine();
window.engine = engine;

function App() {


    return (
        <>
            <Theme>
                {/*<Collection engine={engine} saved={engine.saved}/>*/}

                < Heading className={"bs"}>Uni<span>de</span>code</Heading>


                <Guessing engine={engine}/>

            </Theme>
        </>
    )
}

export default App
