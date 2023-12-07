import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/07/input.txt", "utf8").trim().split("\n");

let output = 0;

const values = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
};

const cards = input.map((line) => {
    const [hand, bid] = line.split(" ");
    return {
        values: hand.split("").map((v) => values[v] || Number(v)),
        hand,
        bid: +bid,
    };
});

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
    return pairs;
}

function scoreHand(hand) {
    // maybe sort these by highest amount first
    const pairs = getPairs(hand.values);

    if (pairs.length === 1 && pairs[0].size === 5) {
        // five of a kind (5 cards)
        return 1;
    }

    if (pairs.length === 2 && pairs[0].size === 4) {
        // four of a kind (4 cards)
        return 2;
    }

    if (pairs.length === 3 && pairs[0].size === 3) {
        // three of a kind (3 cards)
        return 2;
    }

    if (
        (pairs.length === 2 && pairs[0].size === 3 && pairs[1].size === 2) ||
        (pairs[0].size === 2 && pairs[1].size === 3)
    ) {
        // full house (2, 3 pair)
    }

    if (pairs.length === 3 && pairs[0].size === 2) {
        // two pair (2, 2 pair)
    }

    if (pairs.length === 4 && pairs[0].size === 2) {
        // one pair (2 cards)
    }

    // high card

    // tie breaker
    // check for first highest card
}

for (const card of cards) {
    const pairs = getPairs(card.values);
    console.log(pairs);
}

console.log(cards);

// const  sorted = cards.sort((a, b) => {
//   const p1 = getPairs(a.values)
//   const p2 = getPairs(b.values)

// })

const winnings = cards.reduce((acc, curr, i) => {
    return acc + i * curr.bid;
}, 0);

console.info(winnings);
// clipboard.writeSync(String(output));
