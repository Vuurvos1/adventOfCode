import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/2/input.txt", "utf8").trim().split("\n");

let output = 0;

for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const [_info, rawResults] = game.split(": ");

    const result = rawResults.split("; ");

    const cubes = {
        red: 0,
        green: 0,
        blue: 0,
    };

    for (const res of result) {
        const grabs = res.split(", ");

        for (let j = 0; j < grabs.length; j++) {
            const grab = grabs[j];
            let [amount, color] = grab.split(" ");
            amount = Number(amount);

            cubes[color] = Math.max(cubes[color], amount);
        }
    }

    output += cubes.red * cubes.green * cubes.blue;
}

console.info(output);
clipboard.writeSync(String(output));
