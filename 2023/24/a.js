import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

/** @typedef {{x: number, y: number, z: number, vx: number, vy: number, vz: number}} Hailstone */

const input = fs.readFileSync("./2023/24/input.txt", "utf8").trim().split("\n");
const hailstones = input.map((line) => {
    /** @type {number[]} */
    const numbers = line.match(/-?\d+/g)?.map(Number);

    return {
        x: numbers[0],
        y: numbers[1],
        z: numbers[2],
        vx: numbers[3],
        vy: numbers[4],
        vz: numbers[5],
    };
});

// function intersects(a, b, c, d, p, q, r, s) {
//     const det = (c - a) * (s - q) - (r - p) * (d - b);
//     if (det === 0) return null;
//     return ((s - q) * (r - a) + (p - r) * (s - b)) / det;
// }

// thanks google
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) return null;
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    // let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
    };
}

// const p1 = { x: 7, y: 7 };
// const p2 = { x: 27, y: 27 };
const p1 = { x: 200000000000000, y: 200000000000000 };
const p2 = { x: 400000000000000, y: 400000000000000 };

console.time("t");
let output = 0;

// if hailstone will collide/cross with target square (ignore z)
for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
        const h1 = hailstones[i];
        const h2 = hailstones[j];

        const x1 = h1.x;
        const y1 = h1.y;
        const x2 = h1.x + h1.vx;
        const y2 = h1.y + h1.vy;

        const x3 = h2.x;
        const y3 = h2.y;
        const x4 = h2.x + h2.vx;
        const y4 = h2.y + h2.vy;

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        if (!intersection) continue;

        const { x, y } = intersection;
        //check event happens in the future
        if (
            x > x1 == x2 - x1 > 0 &&
            y > y1 == y2 - y1 > 0 &&
            x > x3 == x4 - x3 > 0 &&
            y > y3 == y4 - y3 > 0 &&
            //check intersection is in bound
            x >= p1.x &&
            x <= p2.x &&
            y >= p1.y &&
            y <= p2.y
        )
            output++;
    }
}
console.timeEnd("t");

console.info(output);
clipboard.writeSync(String(output));
