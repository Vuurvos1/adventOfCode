import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/06/input.txt", "utf8").trim().split("\n");
let [time, distance] = input.map((v) => +lib.parseNumbers(v).join(""));

console.log(time, distance);

let output = 0;

console.time("t");
for (let j = 0; j < time; j++) {
    const mms = j;
    const dist = mms * (time - j);

    if (dist > distance) {
        output++;
    }
}
console.timeEnd("t");

console.info(output);
// clipboard.writeSync(String(output));

console.time("t");

// Time:      7  15   30
// Distance:  9  40  200
// 4, 8 ,9
time = 30;
distance = 200;

// would work in most cases but if roots are ints it breaks like with 30, 200
// const d = Math.sqrt(time * time - 4 * distance);
// const b1 = Math.floor((time + d) / 2);
// const b2 = Math.ceil((time - d) / 2);

const d = Math.sqrt(time * time - 4 * distance);
const b1 = (time + d) / 2;
const b2 = (time - d) / 2;

// Math.floor(b1-0.0001) - Math.ceil(b2+0.0001) + 1

// flip floor and ceil if roots are ints
// could do singular check because if 1 is an int the other also should be
const o =
    Number.isInteger(b1) && Number.isInteger(b2)
        ? b1 - b2 - 1
        : Math.floor(b1) - Math.ceil(b2) + 1;
console.log(o);

const D = Math.sqrt(time * time - 4 * distance + 1);
const x1 = Math.ceil((time - D) / 2);
const x2 = Math.floor((time + D) / 2);

console.log(x2 - x1 + 1, x2, x1);

console.timeEnd("t");
