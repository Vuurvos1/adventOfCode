import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/06/input.txt", "utf8").trim().split("\n");
const [times, distances] = input.map((v) => lib.parseNumbers(v));

console.log(times, distances);

let output = [];

for (let i = 0; i < times.length; i++) {
    const time = times[i];

    let result = 0;

    for (let j = 0; j < time; j++) {
        const mms = j;
        const dist = mms * (time - j);

        if (dist > distances[i]) {
            // console.log(time, mms, dist, distances[i]);

            result++;
        }
    }

    output.push(result);
}

const res = output.reduce((acc, curr) => acc * curr, 1);
console.info(res, output);
clipboard.writeSync(String(res));
