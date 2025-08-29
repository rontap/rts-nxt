import React, {useEffect, useState} from 'react'
import './App.css'
import "@radix-ui/themes/styles.css";
import {Button, Callout, Card, Heading, TextField, Theme} from '@radix-ui/themes';
import Engine, {Emojis, GUESS} from './engine.tsx';
import type {Emoji} from "unicode-emoji";
import {Guessing} from "./Guessing.tsx";

const engine = new Engine();

function App() {



    return (
        <>
            <Theme>
                <Heading className={"bs"}>Uni<span>de</span>code</Heading>


                <Guessing engine={engine}/>

            </Theme>
        </>
    )
}

export default App
