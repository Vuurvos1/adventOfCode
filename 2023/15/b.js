import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/15/input.txt", "utf8").trim().split(",");

/** @type {string[][]} */
const boxes = Array(256)
    .fill(0)
    .map((el) => []);

function hashString(str) {
    let value = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const code = char.charCodeAt(0);

        value += code;
        value *= 17;
        value %= 256;
    }

    return value;
}

function logBoxes(boxes) {
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];

        if (box.length > 0) {
            console.log(i, box);
        }
    }
}

for (const str of input) {
    if (str.includes("-")) {
        const [label, focal] = str.split("-");
        const hash = hashString(label);

        const index = boxes[hash].findIndex((box) => box[0] === label);

        if (index > -1) {
            boxes[hash].splice(index, 1);
        }
        continue;
    }

    if (str.includes("=")) {
        const [label, focal] = str.split("=");
        const hash = hashString(label);

        // if already in box
        const index = boxes[hash].findIndex((box) => box[0] === label);
        if (index >= 0) {
            // replace
            boxes[hash][index][1] = focal;
        } else {
            boxes[hash].push([label, focal]);
        }
    }
}
// logBoxes(boxes);

let output = 0;
for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
        const n = Number(boxes[i][j][1]);
        const s = (i + 1) * (j + 1) * n;
        output += s;
    }
}

console.info(output);
clipboard.writeSync(String(output));
