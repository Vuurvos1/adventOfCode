import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const map = fs
    .readFileSync("./2023/10/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const pipeMap = {
    "|": ["N", "S"],
    "-": ["E", "W"],
    L: ["N", "E"],
    J: ["N", "W"],
    7: ["S", "W"],
    F: ["S", "E"],
};

const directionMap = {
    N: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 },
};

const startPos = { x: -1, y: -1 };
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        const char = map[y][x];
        if (char === "S") {
            startPos.x = x;
            startPos.y = y;
            console.log("start", x, y);
            break;
        }
    }

    if (startPos.x !== -1) {
        break;
    }
}

console.log(startPos);

const visited = new Set();

const pos = { ...startPos };
for (let i = 0; i < 10000000; i++) {
    visited.add(`${pos.x},${pos.y}`);

    const connected = getConnected(pos.x, pos.y);

    for (const c of connected) {
        if (visited.has(`${c.x},${c.y}`)) {
            continue;
        }

        pos.x = c.x;
        pos.y = c.y;
    }

    if (map[pos.y][pos.x] === "S") {
        console.log("start", i, pos.x, pos.y);
        break;
    }
}

let output = visited.size / 2;

console.info(output);
clipboard.writeSync(String(output));

function getConnected(x, y) {
    const char = map[y][x];

    if (char === ".") {
        return [];
    }

    if (char === "S") {
        for (const direction of ["N", "S", "E", "W"]) {
            const searchPos = {
                x: x + directionMap[direction].x,
                y: y + directionMap[direction].y,
            };
            const connected = getConnected(searchPos.x, searchPos.y);

            const t = connected.find((c) => c.x === x && c.y === y);

            if (t && connected?.length > 0) {
                return [{ x: searchPos.x, y: searchPos.y }];
            }
        }

        return [];
    }

    const directions = pipeMap[char];
    const connected = [];

    for (const direction of directions) {
        connected.push({
            x: x + directionMap[direction].x,
            y: y + directionMap[direction].y,
        });
    }

    return connected;
}
