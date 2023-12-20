import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

/** @typedef {{gt: boolean, lt:boolean, compareVar: 'x'| 'm'|'a' | 's', value: number, target: string }} Instruction */

/** @typedef {{ x: number, m: number, a: number, s: number}} Part */

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

// workflows
// TODO: a workflow should have instructions for better naming

/** @type {Record<string, Instruction[]>} */
const instructionsMap = new Map();
/** @type {Instruction[]} */
const instructionsArr = [];

for (const instructions of rawInstructions.split("\n")) {
    const match = instructions.match(/{(.*?)}/);
    const words = instructions.match(/\w+/g);

    /** @type {Instruction[]} */
    const inss = [];

    for (const i of match[1].split(",")) {
        const ws = i.match(/\w+/g);

        /** @type {Instruction} */
        let x = {
            gt: false,
            lt: false,
            compareVar: "",
            target: "",
            value: 0,
        };

        if (ws.length === 1) {
            x.target = ws[0];
            inss.push(x);
            continue;
        }

        if (ws.length === 3) {
            if (i.includes(">")) {
                x.gt = true;
            }

            if (i.includes("<")) {
                x.lt = true;
            }

            x.compareVar = ws[0];
            x.target = ws[2];
            x.value = Number(ws[1]);
        }

        inss.push(x);
    }

    instructionsMap.set(words[0], inss);
    instructionsArr.push(inss);
}

const outputParts = [];

for (const part of parts) {
    let workflow = instructionsMap.get("in");

    while (true) {
        let done = false;
        // evaluate ins
        for (const ins of workflow) {
            if (ins.gt) {
                if (part[ins.compareVar] > ins.value) {
                    if (ins.target === "R") {
                        done = true;
                        break;
                    }
                    if (ins.target === "A") {
                        outputParts.push(part);

                        done = true;
                        break;
                    }

                    workflow = instructionsMap.get(ins.target);
                    break;
                }
            }

            if (ins.lt) {
                if (part[ins.compareVar] < ins.value) {
                    if (ins.target === "R") {
                        done = true;
                        break;
                    }
                    if (ins.target === "A") {
                        outputParts.push(part);
                        done = true;
                        break;
                    }

                    workflow = instructionsMap.get(ins.target);
                    break;
                }
            }

            if (!ins.gt && !ins.lt) {
                if (ins.target === "R") {
                    done = true;
                    console.log("reject");
                    break;
                }

                if (ins.target === "A") {
                    outputParts.push(part);
                    done = true;
                    break;
                }

                workflow = instructionsMap.get(ins.target);
                break;
            }
        }
        if (done) break;
    }
}

const output = outputParts.reduce(
    (prev, curr) => prev + curr.x + curr.m + curr.a + curr.s,
    0
);

console.info(output);
clipboard.writeSync(String(output));
