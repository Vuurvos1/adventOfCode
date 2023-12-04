import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/04/input.txt", "utf8").trim().split("\n");

let output = 0;

for (const line of input) {
    const [_, nums] = line.split(": ");
    const [n, w] = nums.split("|").map((s) => lib.parseNumbers(s));

    const winningNumbers = new Set([...w]);

    let score = 0;

    for (const num of n) {
        if (winningNumbers.has(num)) {
            if (score > 0) {
                score *= 2;
            } else {
                score = 1;
            }
        }
    }

    output += score;
}

console.info(output);
clipboard.writeSync(String(output));
