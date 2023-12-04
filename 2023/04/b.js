import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/04/input.txt", "utf8").trim().split("\n");

let output = 0;

const cards = new Int32Array(input.length).fill(1);

for (const line of input) {
    const [cardName, nums] = line.split(": ");
    const cardIndex = lib.parseNumbers(cardName)[0];
    const [n, w] = nums.split("|").map((s) => lib.parseNumbers(s));

    const winningNumbers = new Set([...w]);

    let i = 0;
    for (const num of n) {
        if (winningNumbers.has(num)) {
            const offset = cardIndex + i;
            if (!!cards[offset]) cards[offset] += cards[cardIndex - 1];
            i++;
        }
    }
}

output = cards.reduce((acc, curr) => acc + curr, 0);
console.info(output);
clipboard.writeSync(String(output));
