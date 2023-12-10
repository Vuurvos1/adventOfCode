import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const map = fs
    .readFileSync("./2023/10/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const pipeMap = {
    "|": [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ],
    "-": [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
    ],
    L: [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
    ],
    J: [
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ],
    7: [
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ],
    F: [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
    ],
};

const grid = new lib.Grid(map);
const startPos = grid.findIndex((value) => value === "S");

console.log(startPos);

console.time("loop");
const visited = new Set();
const stack = [{ ...startPos }];
while (stack.length > 0) {
    const pos = stack.pop();

    if (visited.has(`${pos.x},${pos.y}`)) {
        continue;
    }

    if (!lib.isInbounds(pos.x, pos.y, map)) {
        continue;
    }

    visited.add(`${pos.x},${pos.y}`);

    const connected = getConnected(pos.x, pos.y);
    for (const c of connected) {
        stack.push(c);
    }
}
console.timeEnd("loop");

let output = visited.size / 2;
console.info(output);
// clipboard.writeSync(String(output));

function getConnected(x, y) {
    const char = map[y][x];

    if (char === ".") {
        return [];
    }

    if (char === "S") {
        for (const direction of lib.cardinalDirections) {
            const searchPos = {
                x: x + direction.x,
                y: y + direction.y,
            };
            const connected = getConnected(searchPos.x, searchPos.y);

            const t = connected.find((c) => c.x === x && c.y === y);

            if (t && connected?.length > 0) {
                return [{ x: searchPos.x, y: searchPos.y }];
            }
        }

        return [];
    }

    return pipeMap[char].map((direction) => ({
        x: x + direction.x,
        y: y + direction.y,
    }));
}
