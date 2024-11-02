import {Faction, getFactionColor} from "./Factions.ts";
import {Kind} from "./Cell.ts";
import {Run} from "./Run.ts";

export enum Affect {
    Personal,
    Parties,
    Kind
}

type Selector = `*` | any[] | any;

export default class Effect {
    affect: Affect;
    selector?: Selector;
    change: number;
    property: string;

    constructor(affect: Affect, change: number, property: string, selector?: Selector) {
        this.affect = affect;
        this.change = change;
        this.selector = selector;
        this.property = property;
    }

    get affectText() {
        switch (this.affect) {
            case Affect.Personal:
                return "Your party or ideology";
            case Affect.Parties:
                return "Parties";
        }
    }

    get propertyText() {
        return this.property;
    }

    get changeText() {
        if (this.change > 0) {
            return "+" + this.change;
        }
        return this.change;
    }

    get selectorText() {
        if (this.affect == Affect.Personal) {
            return "";
        } else if (this.affect === Affect.Parties) {

            if (this.selector === "*") return "Every";
            if (!this.selector.length) {
                return <b style={{color: getFactionColor(this.selector)}}>{Object.values(Faction)[this.selector]}</b>;
            }
            return this.selector.map(sel => {
                const faction = Object.values(Faction)[sel] as Faction;
                const color = getFactionColor(sel);
                return <b style={{color: color}}>{faction} </b>
            });
        } else if (this.affect === Affect.Kind) {
            if (this.selector === "*") return "Every";
            if (!this.selector.length) {
                return <b>{Object.values(Kind)[this.selector]}</b>;
            }
        }
    }

    jsx() {
        return <div className={"effect"}>
            {this.affectText}{" "}
            <b>
                {this.selectorText}{" "}
                {this.changeText}{" "}

            </b>
            {this.propertyText}{" "}
        </div>
    }

    doAction(run: Run) {
        if (this.affect == Affect.Parties) {
            this.deferFaction.map(faction => {
                console.log("effect", this.property, run.parties[faction])
                run.parties[faction][this.property as "weight" | "score"] += this.change;
            })

        }
    }

    get deferFaction(): Faction[] {
        if (this.selector == "*") return Object.values(Faction).filter(f => !isNaN(f as number));
        if (Array.isArray(this.selector)) return this.selector;
        return [this.selector]
    }
}