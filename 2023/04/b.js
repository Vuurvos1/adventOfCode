import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/04/input.txt", "utf8").trim().split("\n");

let output = 0;

const winningCards = new Map();
const cards = new Int32Array(1000);

for (const line of input) {
    const [cardName, nums] = line.split(": ");
    const cardIndex = lib.parseNumbers(cardName)[0];
    const [n, w] = nums.split("|").map((s) => lib.parseNumbers(s));

    const winningNumbers = new Set([...w]);

    console.log("card", cardIndex);
    let score = cardIndex;
    for (const num of n) {
        if (winningNumbers.has(num)) {
            console.info(
                cardIndex,
                num,
                score,
                cards.slice(0, 10),
                cards[cardIndex]
            );

            const c = cardIndex + score;
            cards[c] = cards[c] + 1 * (cards[cardIndex] || 1);

            score++;
        }
    }
}

output = [...winningCards.values()].reduce((acc, curr) => acc + curr, 0);
console.info(
    output,
    cards.reduce((acc, curr) => acc + curr, 0),
    cards.slice(0, 10)
);
clipboard.writeSync(String(output));
