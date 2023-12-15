import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/15/input.txt", "utf8").trim().split(",");

/** @type {string[][]} */
const boxes = Array(256).fill([]);
console.log(boxes.length);

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

for (const str of input) {
    if (str.includes("-")) {
        const [label, focal] = str.split("-");
        const hash = hashString(label);

        // boxes[hash].find((box) => box[0] !== label);
        const index = boxes[hash].findIndex((box) => box[0] === label);

        if (index > -1) {
            console.log("slicing", label, focal);
            boxes[hash].splice(index, 1);
        }
        continue;
    }

    if (str.includes("=")) {
        const [label, focal] = str.split("=");
        const hash = hashString(label);
        // console.log(hash);

        // if already in box
        if (boxes[hash].find((box) => box[0] === label)) {
            // replace
            boxes[hash].push([label, focal]);
            continue;
        }

        boxes[hash].push([label, focal]);
    }
}
// console.log(boxes);

let output = 0;
for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
        output += i + 1 * j + 1 * Number(boxes[i][j][1]);
    }
}

console.info(output);
clipboard.writeSync(String(output));
