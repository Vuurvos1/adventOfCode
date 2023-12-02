import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/2/input.txt", "utf8").trim().split("\n");

let output = 0;

for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const [_info, rawResults] = game.split(": ");

    const result = rawResults.split("; ");

    let valid = true;

    for (const res of result) {
        if (!valid) break;
        const grabs = res.split(", ");

        for (let j = 0; j < grabs.length; j++) {
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

console.info(output);
clipboard.writeSync(String(output));
