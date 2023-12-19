import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const [rawInstructions, rawParts] = fs
    .readFileSync("./2023/19/input.txt", "utf8")
    .trim()
    .split("\n\n");

// x m a s
const parts = rawParts
    .split("\n")
    .map((el) =>
        JSON.parse(
            el
                .trim()
                .replaceAll("=", ":")
                .replace("x", '"x"')
                .replace("m", '"m"')
                .replace("a", '"a"')
                .replace("s", '"s"')
        )
    );

console.log(parts);

// workflows
const instructionsMap = new Map();
const instructionsArr = [];

for (const instructions of rawInstructions.split("\n")) {
    const match = instructions.match(/{(.*?)}/);
    const words = instructions.match(/\w+/g);
    console.log(match[1].split(","), words[0]);

    instructionsMap.set(words[0], match[1].split(","));
    instructionsArr.push({ instruction: words[0], value: match[1].split(",") });

    // const [instruction, value] = instructions.split(" ");
    // instructionsMap.set(instruction, value);
    // instructions.push({ instruction, value });
}

const outputParts = [];

for (const part of parts) {
    const ins = instructionsArr[0];

    while (true) {
        // evaluate ins
        if (ins.instruction.includes("<") || ins.instruction.includes(">")) {
        }

        if (ins.instruction === "A") {
            // outputParts.push({ x: ins.value[0] })
        }

        if (ins.instruction === "R") {
            // outputParts.push({ s: ins.value[0] })
        }

        // just a string and jump to next workflow

        break;
    }

    // for (const i of ins) {
    //     //
    // }
}

const output = outputParts.reduce(
    (prev, curr) => prev + curr.x + curr.m + curr.a + curr.s,
    0
);

console.info(output);
clipboard.writeSync(String(output));
