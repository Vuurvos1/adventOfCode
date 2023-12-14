import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/14/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

console.log(lib.log2dArray(input));

// move rocks
while (true) {
    let moved = false;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === "." || input[y][x] === "#") continue;

            const up = input[y - 1]?.[x];

            if (up === ".") {
                input[y - 1][x] = input[y][x];
                input[y][x] = ".";
                moved = true;
            }
        }
    }

    if (!moved) break;
}

console.log(lib.log2dArray(input));

let output = 0;

// score board
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === "O") {
            output += input.length - y;
        }
    }
}

console.info(output);
clipboard.writeSync(String(output));
