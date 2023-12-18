import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/18/input.txt", "utf8").trim().split("\n");

const parsed = [];

function splitAtIndex(value, index) {
    return [value.substring(0, index), value.substring(index)];
}

const dirs = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
};

const dirNums = {
    0: "R",
    1: "D",
    2: "L",
    3: "U",
};

for (const line of input) {
    // matches part between parentheses
    const hex = line.match(/\(([^)]+)\)/)[1].substring(1);
    const [depthHex, dirHex] = splitAtIndex(hex, 5);
    const depth = parseInt("0x" + depthHex, 16);

    parsed.push(`${dirNums[dirHex]} ${depth}`);
}

console.time("t");
const points = [];
const pos = { x: 0, y: 0 };
let outlineSize = 0;

// trench
for (const line of parsed) {
    let [dir, amount, color] = line.split(" ");
    amount = Number(amount);

    pos.x += dirs[dir].x * amount;
    pos.y += dirs[dir].y * amount;
    outlineSize += amount;

    points.push([pos.x, pos.y]);
}

// calculate area
let area = 0;
for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];

    let x2, y2;
    if (i === points.length - 1) {
        // wrap around to start
        x2 = points[0][0];
        y2 = points[0][1];
    } else {
        x2 = points[i + 1][0];
        y2 = points[i + 1][1];
    }

    area += x1 * y2 - x2 * y1;
}
console.timeEnd("t");

let output = Math.abs(area) / 2 + outlineSize / 2 + 1;
console.info(output);
clipboard.writeSync(String(output));
