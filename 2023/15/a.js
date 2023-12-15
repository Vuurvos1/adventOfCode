import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/15/input.txt", "utf8").trim().split(",");

function hashString(str) {
    let value = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const code = char.charCodeAt(0);

        value += code;
        value *= 17;
        value %= 256;
    }

    return value;
}

let output = input.reduce((acc, curr) => {
    return (acc += hashString(curr));
}, 0);

console.info(output);
clipboard.writeSync(String(output));
