import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/02/input.txt", "utf8").trim().split("\n");

let output = 0;

console.time("t1");
for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const colors = { red: 0, green: 0, blue: 0 };
    const matches = game.matchAll(/(\d+) (\w+)/g);
    for (const [_, amount, color] of matches) {
        colors[color] = Math.max(colors[color], Number(amount));
    }

    if (colors.blue <= 14 && colors.green <= 13 && colors.red <= 12) {
        output += i + 1;
    }
}

console.timeEnd("t1");

console.info(output);

output = 0;

console.time("t2");
for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const [_info, rawResults] = game.split(": ");

    const results = rawResults
        .split("; ")
        .map((res) => res.split(", "))
        .flat();

    let valid = true;

    for (let j = 0; j < results.length; j++) {
        if (!valid) break;

        const grab = results[j];
        let [amount, color] = grab.split(" ");
        amount = Number(amount);

        if (color === "red" && amount > 12) valid = false;
        if (color === "green" && amount > 13) valid = false;
        if (color === "blue" && amount > 14) valid = false;
    }

    if (valid) {
        output += lib.parseNumbers(game)[0];
    }
}

console.timeEnd("t2");

console.info(output);

output = 0;
console.time("t3");

for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const [_info, rawResults] = game.split(": ");

    const result = rawResults.split("; ");

    let valid = true;

    for (const res of result) {
        if (!valid) break;
        const grabs = res.split(", ");

        for (let j = 0; j < grabs.length; j++) {
            if (!valid) break;
            const grab = grabs[j];
            let [amount, color] = grab.split(" ");
            amount = Number(amount);

            if (color === "red" && amount > 12) valid = false;
            if (color === "green" && amount > 13) valid = false;
            if (color === "blue" && amount > 14) valid = false;
        }
    }
    if (valid) {
        output += lib.parseNumbers(game)[0];
    }
}
console.timeEnd("t3");

console.info(output);
clipboard.writeSync(String(output));
