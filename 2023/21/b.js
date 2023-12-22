import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/21/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));
const grid = new lib.Grid(input);

// 131 grid size
// 65 center starting position on grid

/**
 * Lagrange's Interpolation formula for ax^2 + bx + c with x=[0,1,2] and y=[y0,y1,y2] we have
 *   f(x) = (x^2-3x+2) * y0/2 - (x^2-2x)*y1 + (x^2-x) * y2/2
 * so the coefficients are:
 * a = y0/2 - y1 + y2/2
 * b = -3*y0/2 + 2*y1 - y2/2
 * c = y0
 * @param {number[]} values
 *
 */
function simplifiedLagrange(values) {
    return {
        a: values[0] / 2 - values[1] + values[2] / 2,
        b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
        c: values[0],
    };
}

const startPos = grid.findIndex((cell) => cell === "S");
console.log(startPos);

/**
 * @param {number} steps
 */
function solve(steps = 64) {
    /** @type {Set<string>} */
    const endPositions = new Set();
    const startKey = `${startPos.x},${startPos.y}`;
    endPositions.add(startKey);
    /** @type {Set<string>} */
    const visited = new Set();

    const queue = [{ ...startPos, steps: steps }];

    // flood fill to get all plots visited
    while (queue.length > 0) {
        const pos = queue.shift();
        if (!pos) continue;

        if (pos.steps === 0) continue;

        for (const dir of lib.cardinalDirections) {
            const newX = pos.x + dir.x;
            const newY = pos.y + dir.y;

            const key = `${newX},${newY}`;
            if (visited.has(key)) continue;

            // if (!lib.isInbounds(newX, newY, input)) continue;

            const wrappedX = (newX + 131 * 3) % 131;
            const wrappedY = (newY + 131 * 3) % 131;

            // console.log(newX, newY, wrappedX, wrappedY);
            const neighbor = input[wrappedY][wrappedX]; // wrap value
            if (neighbor === "#") continue;

            queue.push({ x: newX, y: newY, steps: pos.steps - 1 });
            visited.add(key);
        }
    }

    // filter out spots that can't be reached
    for (const v of visited) {
        const [x, y] = lib.parseNumbers(v);

        if ((x + y) % 2 === 0) {
            const key = `${x},${y}`;
            endPositions.add(key);
        }
    }

    return endPositions.size;
}

console.time("t");
const a0 = solve(65 + 131 * 0);
const a1 = solve(65 + 131 * 1);
const a2 = solve(65 + 131 * 2);
console.timeEnd("t");

console.log(a0, a1, a2);

console.log(simplifiedLagrange([a0, a1, a2]));
const { a, b, c } = simplifiedLagrange([a0, a1, a2]);

// const f = x=>(3791n + 29855n*x + x*(x-1n)*29722n/2n); // we get these numbers by plugging in the outputs from above into day 9; this is just a normal newton polynomial

// console.log(simplifiedLagrange([3751, 33531, 92991]));
// // { a: 14840, b: 14940, c: 3751 }

const f = (x) => c + b * x + (x * (x - 1) * a) / 2; // we get these numbers by plugging in the outputs from above into day 9; this is just a normal newton polynomial

// const f = (x) => a0 + a1 * x + (x * (x - 1) * a2) / 2; // we get these numbers by plugging in the outputs from above into day 9; this is just a normal newton polynomial
const out = f(202300); // 131*202300+65 = 26501365
console.info("out", out);

// 149889615552335 low
// 75724318836860 low
// 597102953699891 < supposed solution

// const debugGrid = input
//     .map((row, y) =>
//         row
//             .map((cell, x) => (endPositions.has(`${x},${y}`) ? "O" : cell))
//             .join("")
//     )
//     .join("\n");

// const debugGrid = input
//     .map((row, y) =>
//         row.map((cell, x) => (visited.has(`${x},${y}`) ? "O" : cell)).join("")
//     )
//     .join("\n");
// console.info(debugGrid);

// console.info(output);
// clipboard.writeSync(String(output));
