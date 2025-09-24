import {animate, createDraggable, createScope, stagger, text} from 'animejs';
import React, {useEffect, useRef, useState} from "react";

export default function Title() {
    const root = useRef(null);
    const scope = useRef(null);
    const [rotations, setRotations] = useState(0);
    useEffect(() => {
        scope.current = createScope({root}).add(self => {
            // Every anime.js instances declared here are now scopped to <div ref={root}>


            // Make the logo draggable around its center
            createDraggable('.logo', {
                container: [0, 0, 0, 0],

            });
            const {chars} = text.split('.logo', {words: false, chars: true});


            animate(chars, {
                // Property keyframes
                y: [
                    {to: '-0.22rem', duration: 600},
                    {to: 0, duration: 600, delay: 0},
                    {to: '0.22rem', duration: 600, delay: 0},
                    {to: 0, duration: 600, delay: 0}
                ],
                color: [
                    {to: '#123167', duration: 600},
                    {to: '#232323', duration: 600, delay: 0},
                    {to: '#123167', duration: 600, delay: 0},
                    {to: '#222222', duration: 600, delay: 0}
                ],

                // Property specific parameters
                // rotate: {
                //     from: '-1turn',
                //     delay: 0
                // },
                delay: stagger(50),
                ease: 'inOutCirc',
                loopDelay: 0,
                loop: true
            });
        });

        // Properly cleanup all anime.js instances declared inside the scope
        return () => scope.current.revert()

    }, []);

    return <div ref={root}>

        <div className="centered row">
            <div className={"logo react unidecodeTitle"}>
                Uni<span>de</span>code
            </div>
        </div>

    </div>;
}