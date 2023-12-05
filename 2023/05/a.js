import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/05/input.txt", "utf8")
    .trim()
    .split("\n\n");

const [seedInput, ...mapsInput] = input;

const seeds = lib.parseNumbers(seedInput);
const maps = {};

for (const map of mapsInput) {
    let [name, ...rest] = map.split("\n");
    name = name.split(" ")[0];

    maps[name] = {}; //
    maps[name].ranges = rest.map((row) => lib.parseNumbers(row));
}

console.info(seeds, maps);

let output = 0;

console.info(output);
clipboard.writeSync(String(output));
