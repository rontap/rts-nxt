// CONTENT BY ARON TATAI

who = [
    "Donald Trump is",
    "Teenagers are",
    "Baby Boomers are",
    "the communists are",
    "The Jews are",
    "Scientologist",
    "Old people are",
    "The rich is",
    "Poor people are",
    "The conservatives are",
    "The liberals are",
    "Politicians are",
    "The left is",
    "The right is",
    "Colonisation is",
    "Media companies are",
    "The Chinese are",
    "The US is",
    "The UK is",
    "Alex Jones is",
    "Terrorists are",
    "The EU is",
    "Drug cartels are",
    "social justice warriors are",
    "Oil companies are",
    "Neo-Nazis are",
    "Russia is",
    "The LGBT community is",
    "Rich people are",
    "North Korea is",
    "The media is",
    "Hillary Clinton is",
    "George Soros is",
    "ISIS IS",
    "Kim Jong Un is",
    "unrealistic beauty standards are",
    "Elon Musk is",
    //2.0
    "Pharmaceutical Companies"
];
is = [
    "responsible for",
    "causing",
    "'nt preventing",
    "supporting",
    "denying",
    "the main factor behind",
    "behind",
    "creating",
    "the reason why we have",
    "the reason why there is no",
    " ",
    "determined to achieve",
    "secretly beind",
    "the true architect of"
];
why = [
    "global warming",
    "WW III",
    "WW II",
    "modern slavery",
    "political conflicts",
    "child labour",
    "Universal Basic Income",
    "Gay Marriage",
    "The great depression",
    "911",
    "gun control laws",
    "legalising marijuana",
    "the opioid epidemic",
    "too powerful",
    "domestic violence",
    "unrealistic beauty standards",
    "food waste",
    "space travel",
    "school shootings",
    "turning the frickin' frogs gay",
    "tide pods",
    "christianity",
    "radical islam",
    "supporting homeopathy",
];

let EXT = {
    ihm: true
}
if (EXT.ihm) {
    who.push(...[
        "Big pharma is",
        "Big tech is",
        "White people are",
        "Black People are",
        "Hipster soyboys are",
        "Joe Biden is",
        "Global warming is",
        "The mainstream media is",
        "Jeff Bezos is",
        "Mark Zuckerberg is",
        "Forced mass immigration is",
        "Feminists are"
    ])
    why.push(...[
        "labour rights",
        "higher taxes",
        "Hitler",
        "drug legalisation",
        "lowering the age of consent"
    ])

}

function redo() {
    $("#who b").innerHTML = who[Math.randInt(who.length)];
    $("#is b").innerHTML = is[Math.randInt(is.length)];
    $("#why b").innerHTML = why[Math.randInt(why.length)];
}

redo();


amounts.innerHTML = who.length * is.length * why.length
