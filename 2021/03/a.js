import fs from "node:fs";

console.time("t");
const input = fs.readFileSync("./2021/03/input.txt", "utf8").trim().split("\n");

let gammaRate = "";
let epsilonRate = "";

for (let i = 0; i < input[0].length; i++) {
    let count = 0;
    for (const line of input) {
        if (line[i] === "0") {
            count++;
        } else {
            count--;
        }
    }

    if (count > 0) {
        gammaRate += "0";
        epsilonRate += "1";
    } else {
        gammaRate += "1";
        epsilonRate += "0";
    }
}
console.timeEnd("t");

console.log(eval("0b" + gammaRate) * eval("0b" + epsilonRate));
