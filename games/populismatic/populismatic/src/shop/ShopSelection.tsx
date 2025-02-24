import React from "react";
import Laws from "./Laws.tsx";
import CardShop from "./CardShop.tsx";

export default function ShopSelection() {
    return <>
        Buy Cards
        <CardShop/>
        <br/>
        <hr/>
        Laws
        <Laws/>
        <br/>
        <hr/>
    </>
}