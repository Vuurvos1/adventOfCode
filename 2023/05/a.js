import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/05/input.txt", "utf8")
    .trim()
    .split("\n\n");

const [seedInput, ...mapsInput] = input;

const seeds = lib.parseNumbers(seedInput);
/** @type {Record<string, {name: string, from: string, to: string, ranges: number[][]}> } */
const maps = {};

for (const map of mapsInput) {
    let [name, ...rest] = map.split("\n");
    name = name.split(" ")[0];
    const [from, _, to] = name.split("-");

    maps[from] = {
        name,
        from,
        to,
    };
    maps[from].ranges = rest.map((row) => lib.parseNumbers(row));
}

/** @type {number[]} */
let output = [];

for (const seed of seeds) {
    let next = "seed";
    let source = seed;

    while (true) {
        const map = maps[next];
        if (!map) {
            output.push(source);
            break;
        }

        const match = map.ranges.find((el) => {
            const [_destination, src, length] = el;
            if (source >= src && source < src + length) return true;
        });

        // if not found keep same source number

        if (match) {
            const [destination, src, length] = match;
            const offset = source - src;
            source = destination + offset;
        }

        next = map.to;
    }
}

const min = Math.min(...output);
console.info(min);
clipboard.writeSync(String(min));
