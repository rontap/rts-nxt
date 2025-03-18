import {Faction} from "../Factions.ts";
import {Run} from "../Run.ts";
import {DEFAULT} from "../modifiers.ts";

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
            run.modifiers.shop.consumables++;
            break;
        case Law.ExpandState:
            run.modifiers.winConditions.extraSteps += 3;
            break;
        case Law.FreeMarket:
            run.modifiers.shop.rerolls++;
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

// maybe for Flavour Update :)
type Maybe<T> = T | typeof DEFAULT;
type MaybeFactionRecord<T> = Partial<Record<Maybe<Faction>, T>>;
export const lawDescriptionsLATER: Record<Law, MaybeFactionRecord<string>> = {
    [Law.Gerrymander]: {
        [Faction.COMM]: "Divide and slice up opposing political parties.",
        [DEFAULT]: "You need 1%"
    },
}
export const lawDescriptions: Record<Law, string> = {
    [Law.Gerrymander]: "Gerrymander: Lower required win % need by 1%.", // or Redlining or Szalámitaktika or Census
    [Law.Traditionalism]: "Traditional values. {FASH} {NAT} and {CON} factions have a chance of joining you when they are next to you.", // RW solidarity
    [Law.Solidarity]: "Solidarity. {GREEN} {LIB} and {SOC} factions have a chance of joining you when they are next to you.", // LF solidarity
    [Law.Strategist]: "Strategist: +1 hand size", // +1 handsize
    [Law.Donor]: "Donor: Gain +1 card in the shop", // + maneuvers
    [Law.ExpandState]: "Expand State: Gain +2 more manouvers in each stage", // [+maneuvers, <negative>card, +card in shop]
    [Law.FreeMarket]: "Free Market: Gain 1 reroll chance at the shop.", // [+1reroll, +1card in shop, <sponsored>card]
    [Law.Centrist]: "True Centrist: Spawn closer to the center of the board", //
}

export const lawCombinations: Record<Faction, Law[]> = {
    [Faction.COMM]: [Law.ExpandState, Law.ExpandState, Law.Gerrymander, Law.Gerrymander, Law.ExpandState],
    [Faction.NAT]: [Law.Traditionalism, Law.Gerrymander, Law.Traditionalism, Law.ExpandState, Law.Donor],
    [Faction.FASH]: [Law.Gerrymander, Law.Traditionalism, Law.Donor, Law.Gerrymander, Law.Gerrymander],
    [Faction.SOC]: [Law.Solidarity,Law.Centrist,  Law.Strategist, Law.ExpandState, Law.Solidarity],
    [Faction.CENTR]: [Law.Centrist, Law.Strategist, Law.Donor, Law.Centrist, Law.Strategist],
    [Faction.CON]: [Law.Gerrymander, Law.Traditionalism, Law.Donor, Law.FreeMarket, Law.Centrist],
    [Faction.GREEN]: [Law.ExpandState, Law.Solidarity, Law.Centrist, Law.Centrist, Law.Gerrymander],
    [Faction.LIB]: [Law.FreeMarket,Law.Centrist,  Law.Solidarity, Law.Strategist, Law.FreeMarket],
    [Faction.WILDCARD]: [Law.FreeMarket, Law.Donor, Law.FreeMarket, Law.Gerrymander, Law.FreeMarket],
    [Faction.FAITH]: [],
}
/**
 * saved at time for actual upgrade paths
 * export const lawCombinations: Record<Faction, Law[]> = {
 *     [Faction.COMM]: [Law.Gerrymander, Law.ExpandState, Law.ExpandState],
 *     [Faction.NAT]: [Law.Gerrymander, Law.Traditionalism, Law.ExpandState],
 *     [Faction.FASH]: [Law.Gerrymander, Law.Gerrymander, Law.Traditionalism],
 *     [Faction.SOC]: [Law.Centrist, Law.Solidarity, Law.Strategist, Law.ExpandState],
 *     [Faction.CENTR]: [Law.Centrist, Law.Strategist, Law.Donor, Law.FreeMarket],
 *     [Faction.CON]: [Law.Gerrymander, Law.Traditionalism, Law.Donor, Law.FreeMarket, Law.Centrist],
 *     [Faction.GR[Law.]]:"EEN]: [Law.ExpandState, Law.Solidarity],
 *     [Faction.LIB]: [Law.Centrist, Law.Solidarity, Law.Strategist, Law.FreeMarket],
 *     [Faction.WILDCARD]: [Law.FreeMarket, Law.Donor, Law.FreeMarket],
 *     [Faction.FAITH]: [],
 * }
 */