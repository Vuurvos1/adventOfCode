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

// get all end positions that could be reached in 6 steps from start position traveling in the cardianl directions
// on a 2d grid start from startPos
const endPositions = new Set();
const visited = new Set();

/**
 * @param {*} pos
 * @param {number} steps
 * @returns
 */
function getEndPositions(pos, steps) {
    if (steps === 0) {
        endPositions.add(`${pos.x},${pos.y}`);
        return;
    }

    if (visited.has(`${pos.x},${pos.y},${steps}`)) return;

    for (const dir of lib.cardinalDirections) {
        const newX = pos.x + dir.x;
        const newY = pos.y + dir.y;

        if (!lib.isInbounds(newX, newY, input)) continue;

        const neighbor = input[newX][newY];
        if (neighbor === "#") continue;

        // if (visited.has(neighbor)) continue;
        // visited.add(neighbor);

        const key = `${newX},${newY},${steps}`;

        visited.add(key);
        getEndPositions({ x: newX, y: newY }, steps - 1);
    }

    return;
}

console.time("t");
getEndPositions(startPos, 64);
console.timeEnd("t");

let output = endPositions.size;

// const debugGrid = input
//     .map((row, y) =>
//         row
//             .map((cell, x) => (endPositions.has(`${x},${y}`) ? "O" : cell))
//             .join("")
//     )
//     .join("\n");

// console.info(debugGrid);

console.info(output);
// clipboard.writeSync(String(output));
