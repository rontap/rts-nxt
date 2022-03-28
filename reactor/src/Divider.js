import React from 'react';


export default function Divider() {
    return <div>
        hello
        <TripleSlider/>
    </div>;
}

function TripleSlider() {
    return (<div class={"tripleSlider"}>
        min : <input type={"number"}/>
        val : <input type={"number"}/>
        max : <input type={"number"}/><br/>
        
        <input type={"range"}/>
    </div>);
};