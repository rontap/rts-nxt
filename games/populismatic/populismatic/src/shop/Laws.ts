import {Faction} from "../Factions.ts";

enum Law {
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

const lawCombinations: Record<Faction, Law[]> = {
    [Faction.COMM]: [Law.Gerrymander, Law.ExpandState, Law.ExpandState],
    [Faction.NAT]: [Law.Gerrymander, Law.Traditionalism, Law.ExpandState],
    [Faction.FASH]: [Law.Gerrymander, Law.Gerrymander, Law.Traditionalism],
    [Faction.SOC]: [Law.Centrist, Law.Solidarity, Law.Strategist, Law.ExpandState],
    [Faction.CENTR]: [Law.Centrist, Law.Strategist, Law.Donor, Law.FreeMarket],
    [Faction.CON]: [Law.Gerrymander, Law.Traditionalism, Law.Donor, Law.FreeMarket, Law.Centrist],
    [Faction.GREEN]: [Law.ExpandState, Law.Solidarity],
    [Faction.LIB]: [Law.Centrist, Law.Solidarity, Law.Strategist, Law.FreeMarket],
    [Faction.WILDCARD]: [Law.FreeMarket, Law.Donor, Law.FreeMarket],
}