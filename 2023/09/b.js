import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/09/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

let output = [];

for (const line of input) {
    const layers = [];
    layers.push(line);

    while (true) {
        const layer = layers.at(-1);
        const nextLayer = [];
        for (let j = 0; j < layer.length - 1; j++) {
            const delta = layer[j + 1] - layer[j];
            nextLayer.push(delta);
        }

        layers.push(nextLayer);
        if (nextLayer.every((x) => x === 0)) break;
    }

    let tmp = 0;
    let previous = 0;
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        tmp = layer.at(0) - previous; // <--- This line is different
        previous = tmp;
    }
    output.push(tmp);
}

let result = output.reduce((acc, cur) => acc + cur, 0);

console.info(result);
clipboard.writeSync(String(result));
