import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/06/input.txt", "utf8").trim().split("\n");
const [time, distance] = input.map((v) => +lib.parseNumbers(v).join(""));

console.log(time, distance);

let output = 0;

for (let j = 0; j < time; j++) {
    const mms = j;
    const dist = mms * (time - j);

    if (dist > distance) {
        output++;
    }
}

console.info(output);
clipboard.writeSync(String(output));
