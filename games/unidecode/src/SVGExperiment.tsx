import React, {useEffect, useRef} from "react";
import {animate, createScope, svg, utils} from 'animejs';
import './powerups/mainsvg.css'

function generatePoints() {
    const total = utils.random(4, 64);
    const r1 = utils.random(4, 56);
    const r2 = 56;
    const isOdd = n => n % 2;
    let points = '';
    for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
        const r = isOdd(i) ? r1 : r2;
        const a = (2 * Math.PI * i / l) - Math.PI / 2;
        const x = 152 + utils.round(r * Math.cos(a), 0);
        const y = 56 + utils.round(r * Math.sin(a), 0);
        points += `${x},${y} `;
    }
    return points;
}

export default function SVGExperiment() {
    const root = useRef(null);
    const scope = useRef(null);

    // const play1P = "M115.8,66.1v122.4l57.6-29.3,46.8-22.9c5.7-3.2,5.7-11.4,0-14.6l-46.8-24.9-57.6-30.7Z"
    // const play2P = "M44.7,43.1v166.5c0,.3,0,.5,0,.8.5,6.5,7.7,10.2,13.6,7.4l57.5-29.2v-122.4l-57.5-31.2c-5.8-2.9-13,.9-13.6,7.4s0,.5,0,.8Z"
    // const pause1P = "M147.3,44.8v166.5c0,5.5,4.5,10,10,10h21.2c5.5,0,10-4.5,10-10V44.8c0-5.5-4.5-10-10-10h-21.2c-5.5,0-10,4.5-10,10Z"
    // const pause2P = "M57.7,44.8v166.5c0,5.5,4.5,10,10,10h21.2c5.5,0,10-4.5,10-10V44.8c0-5.5-4.5-10-10-10h-21.2c-5.5,0-10,4.5-10,10Z"

    const play1P = "M115.8,66.1 L115.8,188.5 L173.4,159.2 L220.2,136.3 L173.4,111.4 L115.8,80.7 Z";

// Play right part
    const play2P = "M44.7,43.1 L44.7,209.6 L44.7,210.4 L44.7,211.2 L102.2,182 L102.2,59.6 L44.7,28.4 L44.7,29.2 L44.7,30 Z";

// Pause right bar
    const pause1P = "M147.3,44.8 L147.3,211.3 L147.3,221.3 L178.5,221.3 L178.5,221.3 L188.5,221.3 L188.5,44.8 L188.5,34.8 L178.5,34.8 L168.5,34.8 L157.3,34.8 L147.3,34.8 Z";

// Pause left bar
    const pause2P = "M57.7,44.8 L57.7,211.3 L57.7,221.3 L88.9,221.3 L98.9,221.3 L98.9,44.8 L98.9,34.8 L88.9,34.8 L77.7,34.8 L67.7,34.8 L57.7,34.8 Z";

    useEffect(() => {
        const [$path1, $path2] = utils.$('polygon');
        scope.current = createScope({root}).add(self => {
            //  animateRandomPoints();
            utils.set("#play-2", {points: play2P});
            animate("#pause-2", {
                points: svg.morphTo("#play-2"),
                rotate: 0,
                ease: 'inOutCirc',
                duration: 1500,
                loop: true,
                delay: 1000
            });
        })
        return () => scope.current.revert()
    }, [])


    return <div ref={root}>hello
        <svg viewBox="0 0 400 400" id={"mainsvg"}>
            <g strokeWidth="2" stroke="currentColor" strokeLinejoin="round" fill="red" fillRule="evenodd">
                <path id="pause-1" className="cls-1"
                      d={pause1P}/>
                <path id="pause-2" className="cls-1"
                      d={pause2P}/>

                <path id="play-1" className="cls-1 noop"
                      d={play1P}/>
                <path id="play-2" className="cls-1 noop"
                      d={play2P}/>
                <path className="cls-2 noop" d="M220.1,133.4"/>
                <path className="cls-2 noop" d="M64.6,211.8"/>


                <polygon id="path-1" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
                <polygon style={{opacity: 0}} id="path-2" fill="blue"
                         points="155,4 15,138 204,56 150,74 152,108 134,74 100,56 134,38"></polygon>
            </g>
        </svg>
    </div>;
}