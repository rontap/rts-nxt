import {Faction, getFactionColor, Ideologies} from "./Factions.ts";
import {Kind} from "./Cell.ts";
import {Run} from "./Run.ts";
import {Party} from "./flavour.ts";

export enum Affect {
    Personal,
    Parties,
    Kind
}

type Selectable = Faction | Ideologies | Party | Kind;
type Selector = `*` | Selectable[] | Selectable;

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
                return "Your party";
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
            return this.selector.map((sel: string | number) => {
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
            this.deferAs<Faction>(Object.values(Faction)).map(faction => {
                run.parties[faction][this.property as "weight" | "score"] += this.change;
            })

        } else if (this.affect == Affect.Kind) {
            this.deferAs<Kind>(Object.values(Kind)).map(kind => {
                run.modifiers.generation.kindShare[kind][this.property as "weight"] += this.change;
            })
        } else if (this.affect == Affect.Personal) {
            run.parties[run.leader.self.faction][this.property as "weight" | "score" | "lib" | "right"] += this.change
        }
    }

    deferAs<T>(prop: any[]): T[] {
        if (this.selector == "*") return prop.filter(f => !isNaN(f as number)) as T[];
        if (Array.isArray(this.selector)) return this.selector as T[];
        return [this.selector as T]
    }
}


export function stencil() {

}