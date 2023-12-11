import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/11/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const expansionAmount = 1_000_000;

// expand vertically
const horizontal = [];
for (let y = 0; y < input.length; y++) {
    const line = input[y];
    if (line.every((char) => char === ".")) {
        horizontal.push(y);
    }
}

// expand horizontally
const vertical = [];
for (let x = 0; x < input[0].length; x++) {
    let match = false;
    for (let y = 0; y < input.length; y++) {
        if (input[y][x] === "#") {
            match = true;
        }
    }

    if (match) continue;

    vertical.push(x);
}

// get galaxies
const galaxies = [];
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === "#") {
            galaxies.push({ x, y });
        }
    }
}

// get distances
const distances = [];
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        const galaxyA = galaxies[i];
        const galaxyB = galaxies[j];

        let intersections = 0;
        for (const h of horizontal) {
            const min = Math.min(galaxyA.y, galaxyB.y);
            const max = Math.max(galaxyA.y, galaxyB.y);

            if (h > min && h < max) {
                intersections++;
            }
        }

        // for every intersection add expansion amount to distance
        for (const v of vertical) {
            const min = Math.min(galaxyA.x, galaxyB.x);
            const max = Math.max(galaxyA.x, galaxyB.x);

            if (v > min && v < max) {
                intersections++;
            }
        }

        // const distance = lib.manhattanDistance(galaxyA, galaxyB);
        const distance =
            Math.abs(galaxyA.x - galaxyB.x) +
            Math.abs(galaxyA.y - galaxyB.y) +
            intersections * expansionAmount -
            intersections;

        distances.push(distance);
    }
}

let output = distances.reduce((acc, cur) => acc + cur, 0);
console.info(output);
clipboard.writeSync(String(output));
