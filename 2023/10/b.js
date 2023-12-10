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

const boxMap = {
    "|": "│",
    "-": "─",
    L: "└",
    J: "┘",
    7: "┐",
    F: "┌",
    S: "█",
};

const grid = new lib.Grid(map);
const startPos = grid.findIndex((value) => value === "S");

console.log(startPos);

const visited = new Set();
/** @type {{x: number, y: number}[]} */
const mapStack = [{ ...startPos }];

console.time("loop");
while (mapStack.length > 0) {
    const pos = mapStack.pop();

    if (visited.has(`${pos.x},${pos.y}`)) {
        continue;
    }

    if (!lib.isInbounds(pos.x, pos.y, map)) {
        continue;
    }

    visited.add(`${pos.x},${pos.y}`);

    const connected = getConnected(pos.x, pos.y);
    for (const c of connected) {
        mapStack.push(c);
    }
}
console.timeEnd("loop");

const mapCopy = [...map];

for (let y = 0; y < mapCopy.length; y++) {
    for (let x = 0; x < mapCopy[y].length; x++) {
        if (!visited.has(`${x},${y}`)) {
            mapCopy[y][x] = ".";
        }
    }
}

// pad mapcopy with dots
mapCopy.unshift(Array(mapCopy[0].length).fill("."));
mapCopy.push(Array(mapCopy[0].length).fill("."));
mapCopy.forEach((row) => {
    row.unshift(".");
    row.push(".");
});

// flodd fill outside of visited (-1 in every direction)
const floodStart = { x: 0, y: 0 };
const stack = [floodStart];

while (stack.length > 0) {
    const pos = stack.pop();

    if (!lib.isInbounds(pos.x, pos.y, mapCopy)) {
        continue;
    }

    if (mapCopy[pos.y][pos.x] === " ") {
        continue;
    }

    if (mapCopy[pos.y][pos.x] === ".") {
        mapCopy[pos.y][pos.x] = " ";

        for (const direction of lib.cardinalDirections) {
            const searchPos = {
                x: pos.x + direction.x,
                y: pos.y + direction.y,
            };

            stack.push(searchPos);
        }
    }
}

for (let y = 0; y < mapCopy.length; y++) {
    for (let x = 0; x < mapCopy[y].length; x++) {
        const char = mapCopy[y][x];
        if (boxMap[char]) {
            mapCopy[y][x] = boxMap[char];
        }
    }
}

fs.writeFileSync(
    "./2023/10/output.txt",
    mapCopy.map((l) => l.join("")).join("\n")
);

// count remaining dots (.)
const output = mapCopy.reduce((acc, row) => {
    return acc + row.filter((c) => c === ".").length;
}, 0);

// 614 high

console.info(output);
// clipboard.writeSync(String(output));

function getConnected(x, y) {
    if (x === -1 || y === -1 || x === map[0].length || y === map.length) {
        return [];
    }

    const char = map[y][x];

    if (char === ".") {
        return [];
    }

    if (char === "S") {
        const dirs = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: -1, y: 0 },
        ];

        for (const direction of dirs) {
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
