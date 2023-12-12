import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/12/input.txt", "utf8").trim().split("\n");

console.time("time");
const countPermutations = lib.memo(
    (
        /** @type {string} */
        str,
        /** @type {number[]} */
        nums
    ) => {
        if (str.length === 0) {
            return nums.length === 0 ? 1 : 0;
        }
        if (nums.length === 0) {
            return str.includes("#") ? 0 : 1;
        }

        const sum = nums.reduce((acc, curr) => acc + curr, 0);
        if (str.length < sum + nums.length - 1) {
            // The str is not long enough for all nums
            return 0;
        }

        if (str[0] === ".") {
            return countPermutations(str.slice(1), nums);
        }
        if (str[0] === "#") {
            const [num, ...restNums] = nums;

            if (str[num] === "#") return 0;
            if (str.slice(0, num).includes(".")) return 0;

            return countPermutations(str.slice(num + 1), restNums);
        }

        return (
            countPermutations("#" + str.slice(1), nums) +
            countPermutations("." + str.slice(1), nums)
        );
    }
);

let sum = 0;

for (const line of input) {
    const [str, numsInput] = line.split(" ");
    const nums = numsInput.split(",").map(Number);

    const expansion = 5;
    const expandedNums = Array(expansion).fill(nums).flat();
    const expandedStr = Array(expansion).fill(str).join("?");

    sum += countPermutations(expandedStr, expandedNums);
}

console.timeEnd("time");

// hits, calls, `${((hits / calls) * 100).toFixed(2)}%`
console.info(sum);
// clipboard.writeSync(String(sum));
