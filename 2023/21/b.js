import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/21/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.replaceAll("S", ".").split(""));
// const grid = new lib.Grid(input);
const gridSize = input.length;

const mod = (n, m) => ((n % m) + m) % m;
const key = (x, y) => `${x},${y}`;

// 131 grid size
// 65 center starting position on grid

// const startPos = grid.findIndex((cell) => cell === "S");
const startPos = { x: 65, y: 65 };

const diffs = (row) => row.map((v, i) => v - row[i - 1]).slice(1);
function polynomialCoefficients(points) {
    return points
        .map((step) => {
            while (step.some((v) => v !== 0)) {
                step = diffs(step); // step.map((v, i, row) => v - row[i - 1]).slice(1);
                points.push(step);
            }
            return points.map((v) => v[0]);
        })[0]
        .filter((v) => !!v);
}

/**
 * @param {Map<string, [number, number]>} positions
 */
function step(positions) {
    /** @type {Map<string, [number, number]>} */
    const newPositions = new Map();

    for (const [_, value] of positions) {
        for (const dir of lib.cardinalDirections) {
            const x = value[0];
            const y = value[1];

            if (
                input[mod(y + dir.y, gridSize)][mod(x + dir.x, gridSize)] == "."
            )
                newPositions.set(key(x + dir.x, y + dir.y), [
                    x + dir.x,
                    y + dir.y,
                ]);
        }
    }

    return newPositions;
}

/** @type {Map<string, [number, number]>} */
let positions = new Map();
positions.set(key(startPos.x, startPos.y), [startPos.x, startPos.y]);

// get values to solve for polynomial
/** @type {number[]} */
const vals = [];
for (let i = 1; i <= 131 * 2 + 65; i++) {
    positions = step(positions);

    if (i % 131 == 65) {
        vals.push(positions.size);
        console.log(i, (i - 65) / 131, positions.size);
    }
}

// https://www.wolframalpha.com/input?i=quadratic+fit+calculator&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3x%22%7D+-%3E%22%7B0%2C+1%2C+2%7D%22&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3y%22%7D+-%3E%22%7B3691%2C+32975%2C+91439%7D%22

const x = (26501365 - 65) / 131; // 202300
const a = polynomialCoefficients([vals]);
console.log(vals, a);
const f = (x) => a[0] + a[1] * x + (x * (x - 1) * a[2]) / 2; // newton polynomial
const out = f(x); // 131*202300+65 = 26501365

console.info(out);
// clipboard.writeSync(String(out));
