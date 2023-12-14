import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/14/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

// [x, y] north, west, south, east
const directions = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
];

const positions = new Map();
const indexMap = new Map();
let cycleSize = 0;
let startOffset = 0;

function getBoardScore(board) {
    let score = 0;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === "O") {
                score += board.length - y;
            }
        }
    }
    return score;
}

// move rocks
for (let i = 0; i < 250; i++) {
    for (let j = 0; j < 4; j++) {
        const dir = directions[j % directions.length];

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
    }

    const compressed = input.map((line) => line.join("")).join(",");

    const pos = positions.get(compressed);
    if (startOffset > 0 && cycleSize < 1 && pos && pos.index > startOffset) {
        cycleSize = i - startOffset - 1;
        break;
    }

    if (startOffset === 0 && pos) {
        startOffset = i;
    }

    positions.set(compressed, { index: i, board: compressed });
    indexMap.set(i, compressed);
}

// ((cycles - i) % (start - i)) + i - 1;
// const endIndex =
//     ((cycles - cycleSize) % (startOffset - cycleSize)) + cycleSize - 1;

// i = cycleSize
// ((cycles - i) % (start - i)) + i - 1;

// start offset 118
// cycle size 9

const cycles = 1_000_000_000;

const tmp = (cycles - startOffset) % cycleSize;

// This is because my input perfectly fits
const endIndex =
    tmp === 0
        ? startOffset - 1
        : ((cycles - startOffset) % cycleSize) + startOffset - 1;

const endPosition = indexMap
    .get(endIndex)
    .split(",")
    .map((line) => line.split(""));

// score board
let output = getBoardScore(endPosition);

// 91286 <
console.info(output);
// clipboard.writeSync(String(output));
