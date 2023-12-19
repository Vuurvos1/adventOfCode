import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

/** @typedef {{ op: '>' | '<', type: 'x' | 'm' | 'a' | 's', value: number, target: string }} Instruction */
/** @typedef {{ x: number, m: number, a: number, s: number}} Part */
/** @typedef {[number, number]} Range */
/** @typedef {{ x: Range, m: Range, a: Range, s: Range}} PartBatch */

const [rawInstructions, rawParts] = fs
    .readFileSync("./2023/19/input.txt", "utf8")
    .trim()
    .split("\n\n");

/** @type {Record<string, Instruction[]>} */
const workflows = new Map();

for (const workflow of rawInstructions.split("\n")) {
    const name = workflow.match(/\w+/g)[0];
    const matches = workflow.matchAll(/([xmas])([<>])(\d+):(\w+)/g);

    /** @type {Instruction[]} */
    const instructions = [...matches].map((i) => {
        /** @type {Instruction} */
        return { type: i[1], op: i[2], value: Number(i[3]), target: i[4] };
    });

    const defaultTarget = /,(\w+)\}$/.exec(workflow)[1];

    workflows.set(name, {
        rules: instructions,
        default: defaultTarget,
    });
}

/**
 * @param {Range} range
 * @returns {number}
 */
function rangeSize(range) {
    return range[1] - range[0];
}

/**
 * @param {PartBatch} batch
 * @returns {number}
 */
function batchSize(batch) {
    return (
        rangeSize(batch.x) *
        rangeSize(batch.m) *
        rangeSize(batch.a) *
        rangeSize(batch.s)
    );
}

/**
 * @param {PartBatch} batch
 * @param {string} workflowName
 * @returns {number}
 */
function step(batch, workflowName) {
    if (workflowName === "R") return 0;

    if (workflowName === "A") {
        const size = batchSize(batch);
        return size;
    }

    let result = 0;

    const workflow = workflows.get(workflowName);
    for (const rule of workflow.rules) {
        const range = batch[rule.type];

        if (rule.op === "<") {
            if (range[1] <= rule.value) {
                // entire batch fits
                result += step(batch, rule.target);
                return result;
            } else if (range[0] < rule.value) {
                // split up batch
                const matchedPart = {
                    ...batch,
                    [rule.type]: [range[0], rule.value],
                };
                result += step(matchedPart, rule.target);

                batch = { ...batch, [rule.type]: [rule.value, range[1]] };
                continue;
            }

            break;
        }

        if (rule.op === ">") {
            if (range[0] > rule.value) {
                // entire batch fits
                result += step(batch, rule.target);
                return result;
            } else if (range[1] > rule.value + 1) {
                // split up batch
                const matchedPart = {
                    ...batch,
                    [rule.type]: [rule.value + 1, range[1]],
                };
                result += step(matchedPart, rule.target);

                batch = { ...batch, [rule.type]: [range[0], rule.value + 1] };
                continue;
            }
            break;
        }
    }

    // empty/default steps
    result += step(batch, workflow.default);
    return result;
}

console.time("t");

// off by one classic
const output = step(
    { x: [1, 4001], m: [1, 4001], a: [1, 4001], s: [1, 4001] },
    "in"
);
console.timeEnd("t");

console.info(output);
// clipboard.writeSync(String(output));

// https://www.reddit.com/r/adventofcode/comments/18lwcw2/2023_day_19_an_equivalent_part_2_example_spoilers/
