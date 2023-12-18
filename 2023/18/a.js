import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/18/input.txt", "utf8").trim().split("\n");

const points = new Set();
const pos = { x: 0, y: 0 };

const dirs = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
};

console.time("t");
// trench
for (const line of input) {
    let [dir, amount, color] = line.split(" ");
    amount = Number(amount);

    for (let i = 0; i < amount; i++) {
        points.add(`${pos.x},${pos.y}`);

        pos.x += dirs[dir].x;
        pos.y += dirs[dir].y;
    }
}

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
console.timeEnd("t");

let output = points.size + visited.size;

console.info(output);
clipboard.writeSync(String(output));
