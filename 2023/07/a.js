import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/07/input.txt", "utf8").trim().split("\n");

const scores = {
    FiveOfAKind: 7,
    FourOfAKind: 6,
    FullHouse: 5,
    ThreeOfAKind: 4,
    TwoPair: 3,
    OnePair: 2,
    HighCard: 1,
};

const cardValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
};

function getPairs(values) {
    const pairs = [];
    for (const v of values) {
        const pair = pairs.find((p) => p.value === v);
        if (pair) {
            pair.size++;
        } else {
            pairs.push({ size: 1, value: v });
        }
    }

    // sort by highest sizes first
    return pairs.sort((a, b) => b.size - a.size);
}

function scoreHand(pairs) {
    if (pairs.length === 1 && pairs[0].size === 5) {
        // five of a kind (5 cards)
        return scores.FiveOfAKind;
    }

    if (pairs.length === 2 && pairs[0].size === 4) {
        // four of a kind (4 cards)
        return scores.FourOfAKind;
    }

    if (pairs.length === 3 && pairs[0].size === 3) {
        // three of a kind (3 cards)
        return scores.ThreeOfAKind;
    }

    if (
        (pairs.length === 2 && pairs[0].size === 3 && pairs[1].size === 2) ||
        (pairs[0].size === 2 && pairs[1].size === 3)
    ) {
        // full house (2, 3 pair)
        return scores.FullHouse;
    }

    if (pairs.length === 3 && pairs[0].size === 2) {
        // two pair (2, 2 pair)
        return scores.TwoPair;
    }

    if (pairs.length === 4 && pairs[0].size === 2) {
        // one pair (2 cards)
        return scores.OnePair;
    }

    // high card
    return scores.HighCard;
}

const cards = input.map((line) => {
    const [hand, bid] = line.split(" ");
    const values = hand.split("").map((v) => cardValues[v] ?? Number(v));
    const score = scoreHand(getPairs(values));
    return {
        values,
        hand,
        bid: +bid,
        score,
    };
});

console.log(cards);

cards.sort((a, b) => {
    // tie breaker, check for first highest card
    if (a.score === b.score) {
        for (let i = 0; i < a.values.length; i++) {
            if (a.values[i] > b.values[i]) return 1;
            if (b.values[i] > a.values[i]) return -1;
        }
        return 0;
    }

    return a.score > b.score ? 1 : -1;
});

// console.log(cards);

const winnings = cards.reduce((acc, curr, i) => {
    return acc + (i + 1) * curr.bid;
}, 0);

console.info(winnings);
// clipboard.writeSync(String(output));
