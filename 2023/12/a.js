import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/12/input.txt", "utf8").trim().split("\n");

/**
 * @param {string} str
 * @returns {string[]}
 */
function getPermutations(str, nums) {
    if (!str.includes("?")) {
        return [str];
    }

    let matching = true;
    const groups = str.split(".").filter((el) => !!el);

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (group.includes("?")) break;

        if (group.length !== nums[i]) {
            matching = false;
            break;
        }
    }

    if (!matching) return [];

    const permutations = [];
    permutations.push(...getPermutations(str.replace("?", "."), nums));
    permutations.push(...getPermutations(str.replace("?", "#"), nums));

    return permutations;
}

let output = [];

console.time("time");
for (const line of input) {
    let sum = 0;

    const [str, numsInput] = line.split(" ");
    const nums = numsInput.split(",").map(Number);

    const permutations = getPermutations(str, nums);

    for (const permutation of permutations) {
        const groups = permutation.split(".");
        const blocks = groups.filter((el) => !!el).map((el) => el.length);

        if (blocks.length !== nums.length) continue;
        if (blocks.every((el, i) => el === nums[i])) sum++;
    }

    output.push(sum);
}
console.timeEnd("time");

const sum = output.reduce((acc, cur) => {
    return acc + cur;
}, 0);

console.info(sum);
clipboard.writeSync(String(sum));
