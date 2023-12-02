import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/1/input.txt", "utf8").trim().split("\n");

let output = input.reduce((acc, curr) => {
    const numbers = [];

    for (let i = 0; i < curr.length; i++) {
        const s = curr.slice(i, curr.length);

        if (/\d/.test(curr[i])) {
            numbers.push(curr[i]);
            continue;
        }

        if (s.startsWith("one")) numbers.push("1");
        if (s.startsWith("two")) numbers.push("2");
        if (s.startsWith("three")) numbers.push("3");
        if (s.startsWith("four")) numbers.push("4");
        if (s.startsWith("five")) numbers.push("5");
        if (s.startsWith("six")) numbers.push("6");
        if (s.startsWith("seven")) numbers.push("7");
        if (s.startsWith("eight")) numbers.push("8");
        if (s.startsWith("nine")) numbers.push("9");
    }

    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    const num = Number(first + last);
    return acc + num;
}, 0);

console.info(output);
clipboard.writeSync(String(output));
