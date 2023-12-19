import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const [rawInstructions, rawParts] = fs
    .readFileSync("./2023/19/input.txt", "utf8")
    .trim()
    .split("\n\n");

const parts = rawParts
    .split("\n")
    .map((el) => JSON.stringify(el.replaceAll("=", ":")));

console.log(parts);

let output = 0;

console.info(output);
clipboard.writeSync(String(output));
