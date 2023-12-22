import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/21/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));
const grid = new lib.Grid(input);

const startPos = grid.findIndex((cell) => cell === "S");
console.log(startPos);

const endPositions = new Set();
const startKey = `${startPos.x},${startPos.y}`;
endPositions.add(startKey);
const visited = new Set();

const queue = [{ ...startPos, steps: 64 }];

console.time("t");

// flood fill to get all plots visited
while (queue.length > 0) {
    const pos = queue.shift();
    if (!pos) continue;

    if (pos.steps === 0) continue;

    for (const dir of lib.cardinalDirections) {
        const newX = pos.x + dir.x;
        const newY = pos.y + dir.y;

        const key = `${newX},${newY}`;
        if (visited.has(key)) continue;

        if (!lib.isInbounds(newX, newY, input)) continue;

        const neighbor = input[newY][newX];
        if (neighbor === "#") continue;

        queue.push({ x: newX, y: newY, steps: pos.steps - 1 });
        visited.add(key);
    }
}

// filter out spots that can't be reached
for (const v of visited) {
    const [x, y] = lib.parseNumbers(v);

    if ((x + y) % 2 === 0) {
        const key = `${x},${y}`;
        endPositions.add(key);
    }
}

console.timeEnd("t");

let output = endPositions.size;

// const debugGrid = input
//     .map((row, y) =>
//         row
//             .map((cell, x) => (endPositions.has(`${x},${y}`) ? "O" : cell))
//             .join("")
//     )
//     .join("\n");

const debugGrid = input
    .map((row, y) =>
        row.map((cell, x) => (visited.has(`${x},${y}`) ? "O" : cell)).join("")
    )
    .join("\n");
// console.info(debugGrid);

console.info(output);
// clipboard.writeSync(String(output));
