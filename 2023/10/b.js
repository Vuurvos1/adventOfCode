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

const boxMap = {
    "|": "│",
    "-": "─",
    L: "└",
    J: "┘",
    7: "┐",
    F: "┌",
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
for (let i = 0; i < 1000000; i++) {
    visited.add(`${pos.x},${pos.y}`);

    const connected = getConnected(pos.x, pos.y);

    for (const c of connected) {
        if (visited.has(`${c.x},${c.y}`)) {
            continue;
        }

        pos.x = c.x;
        pos.y = c.y;
    }

    // this doesn't work
    if (map[pos.y][pos.x] === "S") {
        console.log("start", i, pos.x, pos.y);
        break;
    }
}

const mapCopy = [...map];

// console.log(visited);

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

    if (!inbounds(pos.x, pos.y, mapCopy)) {
        continue;
    }

    if (mapCopy[pos.y][pos.x] === " ") {
        continue;
    }

    if (mapCopy[pos.y][pos.x] === ".") {
        // mapCopy[pos.y][pos.x] = "F";

        mapCopy[pos.y][pos.x] = " ";

        for (const direction of ["N", "S", "E", "W"]) {
            const searchPos = {
                x: pos.x + directionMap[direction].x,
                y: pos.y + directionMap[direction].y,
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
        // if (mapCopy[y][x] === " ") {
        //     mapCopy[y][x] = ".";
        // }
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
clipboard.writeSync(String(output));

function inbounds(x, y, map) {
    if (x === -1 || y === -1 || x === map[0].length || y === map.length) {
        return false;
    }
    return true;
}

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
