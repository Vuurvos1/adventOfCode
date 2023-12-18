import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/18/input.txt", "utf8").trim().split("\n");

const parsed = [];

function splitAtIndex(value, index) {
    return [value.substring(0, index), value.substring(index)];
}

const dirs = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
};

const dirNums = {
    0: "R",
    1: "D",
    2: "L",
    3: "U",
};

for (const line of input) {
    // match part between parentheses
    const hex = line.match(/\(([^)]+)\)/)[1].substring(1);
    const [depthHex, dirHex] = splitAtIndex(hex, 5);
    const depth = parseInt("0x" + depthHex, 16);

    parsed.push(`${dirNums[dirHex]} ${depth}`);
}

const points = new Set();
const pos = { x: 0, y: 0 };

// trench
for (const line of parsed) {
    let [dir, amount, color] = line.split(" ");
    amount = Number(amount);

    for (let i = 0; i < amount; i++) {
        points.add(`${pos.x},${pos.y}`);

        pos.x += dirs[dir].x;
        pos.y += dirs[dir].y;
    }
}

console.info("trench done");

// flood fill
const visited = new Set();
// This is sort of a bad way to do this, since it can flood into infinity
const queue = [{ x: 1, y: 1 }];

while (queue.length > 0) {
    const { x, y, steps } = queue.shift();
    const key = `${x},${y}`;

    if (points.has(key)) continue;

    if (visited.has(key)) continue;
    visited.add(key);

    for (const dir of lib.cardinalDirections) {
        queue.push({ x: x + dir.x, y: y + dir.y, steps: steps + 1 });
    }
}

let output = points.size + visited.size;

console.log(points.size, points.has("0,0"));
console.info(output);
clipboard.writeSync(String(output));
