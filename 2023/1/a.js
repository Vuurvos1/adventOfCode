import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/1/input.txt", "utf8").trim().split("\n");

let output = input.reduce((acc, curr) => {
    const numbers = curr.match(/\d+/g);
    const first = numbers[0][0];

    const tmp = numbers[numbers.length - 1];
    const last = tmp[tmp.length - 1];
    const num = Number(first + last);
    return acc + num;
}, 0);

console.info(output);
clipboard.writeSync(String(output));
