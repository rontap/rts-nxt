import React from "react";
import Laws from "./Laws.tsx";
import CardShop from "./CardShop.tsx";
import {Run} from "../Run.ts";

export default function ShopSelection({run}: { run: Run }) {
    return <>
        <h2>Shop</h2>
        <br/>
        <br/>
        <br/>
        Buy Cards
        <CardShop run={run}/>
        <br/>
        <hr/>
        Laws
        <Laws/>
        <br/>
        <hr/>
    </>
}