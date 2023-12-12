import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/12/input.txt", "utf8").trim().split("\n");

for (const line of input) {
    const [str, numsInput] = line.split(" ");
    const nums = numsInput.split(",").map(Number);

    console.info(str, nums);
}

let output = [];

const sum = output.reduce((acc, cur) => {
    return acc + cur;
}, 0);

console.info(sum);
clipboard.writeSync(String(sum));
