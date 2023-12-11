import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/11/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const expanded = [];

// expand vertically
for (const line of input) {
    if (line.every((char) => char === ".")) {
        expanded.push(line);
    }
    expanded.push([...line]);
}

// expand horizontally
for (let x = 0; x < expanded[0].length; x++) {
    let match = false;
    for (let y = 0; y < expanded.length; y++) {
        if (expanded[y][x] === "#") {
            match = true;
        }
    }

    if (match) continue;

    for (let y = 0; y < expanded.length; y++) {
        expanded[y].splice(x, 0, ".");
    }
    x++;
}

fs.writeFileSync(
    "./2023/11/output.txt",
    expanded.map((l) => l.join("")).join("\n")
);

// get galaxies
const galaxies = [];
for (let y = 0; y < expanded.length; y++) {
    for (let x = 0; x < expanded[y].length; x++) {
        if (expanded[y][x] === "#") {
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

        // const distance = lib.manhattanDistance(galaxyA, galaxyB);
        const distance =
            Math.abs(galaxyA.x - galaxyB.x) + Math.abs(galaxyA.y - galaxyB.y);

        distances.push(distance);
    }
}

let output = distances.reduce((acc, cur) => acc + cur, 0);
console.info(output);
clipboard.writeSync(String(output));
