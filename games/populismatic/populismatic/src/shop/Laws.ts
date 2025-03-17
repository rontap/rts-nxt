import {Faction} from "../Factions.ts";
import {Run} from "../Run.ts";

export enum Law {
    Gerrymander, // or Redlining or Szalámitaktika or Census
    Traditionalism, // RW solidarity
    Solidarity, // LF solidarity
    Strategist, // +1 handsize
    Donor, // + maneuvers
    ExpandState, // [+maneuvers, <negative>card, +card in shop]
    FreeMarket, // [+1reroll, +1card in shop, <sponsored>card]
    Centrist, //
}

/**
 * FreeMarket:
 * L1: Reroll=true
 * L2: CardCount=++
 * L3: CardVariant(Sponsor)++ | Powerup(Donor)++
 * L1-4: LIB/WC share ++
 */

const enactLaw = (run: Run, law: Law) => {
    switch (law) {
        case Law.Gerrymander:
            run.modifiers.winConditions.required -= 1;
            break;
        case Law.Traditionalism:
            run.modifiers.laws.traditionalism++;
            break;
        case Law.Solidarity:
            run.modifiers.laws.solidarity++;
            break;
        case Law.Strategist:
            run.deck.handsize++;
            break;
        case Law.Donor:
            run.modifiers.winConditions.extraSteps += 2;
            break;
        case Law.ExpandState:
            // todo
            break;
        case Law.FreeMarket:
            run.modifiers.shop.consumables++;
            break;
        case Law.Centrist:
            run.modifiers.generation.spawnBias++;
            break;

    }
}

export const enactFactionLaw = (run: Run, faction: Faction, law: Law) => {
    enactLaw(run, law);
    run.modifiers.laws.enacted[faction]++;
    run.triggerUI();
}

export const lawCombinations: Record<Faction, Law[]> = {
    [Faction.COMM]: [Law.Gerrymander, Law.ExpandState, Law.ExpandState],
    [Faction.NAT]: [Law.Gerrymander, Law.Traditionalism, Law.ExpandState],
    [Faction.FASH]: [Law.Gerrymander, Law.Gerrymander, Law.Traditionalism],
    [Faction.SOC]: [Law.Centrist, Law.Solidarity, Law.Strategist, Law.ExpandState],
    [Faction.CENTR]: [Law.Centrist, Law.Strategist, Law.Donor, Law.FreeMarket],
    [Faction.CON]: [Law.Gerrymander, Law.Traditionalism, Law.Donor, Law.FreeMarket, Law.Centrist],
    [Faction.GREEN]: [Law.ExpandState, Law.Solidarity],
    [Faction.LIB]: [Law.Centrist, Law.Solidarity, Law.Strategist, Law.FreeMarket],
    [Faction.WILDCARD]: [Law.FreeMarket, Law.Donor, Law.FreeMarket],
    [Faction.FAITH]: [],
}