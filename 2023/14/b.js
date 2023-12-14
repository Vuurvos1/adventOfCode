import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/14/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

console.log(lib.log2dArray(input));

// [x, y] north, west, south, east
const directions = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
];

// move rocks
// 1000000000
// TODO: 1000000000 % 28 = 20?
// TODO: do x interations to let everything settle in a cycle then check the cycle length and do the remaining
for (let i = 0; i < 12; i++) {
    const dir = directions[i % directions.length];
    console.log(i, dir);

    while (true) {
        let moved = false;
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] === "." || input[y][x] === "#") continue;

                const up = input[y + dir[1]]?.[x + dir[0]];

                if (up === ".") {
                    input[y + dir[1]][x + dir[0]] = input[y][x];
                    input[y][x] = ".";
                    moved = true;
                }
            }
        }

        if (!moved) break;
    }

    console.log(lib.log2dArray(input));
}

// console.log(lib.log2dArray(input));

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
