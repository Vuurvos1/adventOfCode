import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/05/input.txt", "utf8")
    .trim()
    .split("\n\n");

const [seedInput, ...mapsInput] = input;

/** @type {Record<string, {name: string, from: string, to: string, ranges: number[][]}> } */
const maps = {};

for (const map of mapsInput) {
    let [name, ...rest] = map.split("\n");
    name = name.split(" ")[0];
    const [from, _, to] = name.split("-");

    maps[from] = {
        from,
        to,
        ranges: rest.map((row) => lib.parseNumbers(row)),
    };
}

let output = +Infinity;
const seedNumbers = lib.parseNumbers(seedInput);

console.log("a");
// ended up brute forcing this by first determining which range of seeds to check
for (let i = 0; i < seedNumbers.length / 2; i++) {
    console.time("t");

    const [start, length] = seedNumbers.slice(i * 2, i * 2 + 2);

    for (let j = start; j < start + length; j += 1000) {
        // if (j % 1_000_000 === 0) {
        //     console.log(j);
        // }

        let next = "seed";
        let source = j;

        while (true) {
            const map = maps[next];
            if (!map) break;

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

        if (source < output) {
            output = source;
            console.log("a", output);
        }
    }

    console.timeEnd("t");
}

console.log("b");

// 4918006 high
// 4917126 high
// 4917124
console.info(output);
// clipboard.writeSync(String(output));

// This would have been a cooler way using ranges but I couldn't get it to work

// class Range {
//     constructor(lower, upper) {
//         // flip values if needed?
//         this.lower = lower;
//         this.upper = upper;
//     }

//     /**
//      * If range fully contains another range
//      * @param {Range} other
//      * @returns
//      */
//     contains(other) {
//         return this.lower <= other.lower && other.upper <= this.upper;
//     }

//     /**
//      * If 2 ranges overlap
//      * @param {Range} other
//      * @returns
//      */
//     overlaps(other) {
//         return !(this.lower > other.upper || this.upper < other.lower);
//     }

//     /**
//      * Split range in upto 3 new ranges based on overlap
//      * @param {Range} other
//      * @returns
//      */
//     subRanges(other) {
//         /** @type {Range[]}  */
//         const output = [];

//         // split the new range

//         // if lower
//         if (other.lower < this.lower) {
//             output.push([other.lower, this.lower - 1]);
//         }

//         // if upper
//         if (other.higher > this.higher) {
//             output.push([this.higher + 1, other.higher]);
//         }

//         // intersection
//         if (this.contains(other)) {
//             output.push([this.lower, this.higher]);
//         }

//         return output;
//     }
// }

// // total seeds is like 1_815_746_760

// /** @type {import('./').Item} */
// const rangeMap = { name: "root", range: [], children: [] };

// const seedNumbers = lib.parseNumbers(seedInput);
// for (let i = 0; i < seedNumbers.length / 2; i++) {
//     const [start, length] = seedNumbers.slice(i * 2, i * 2 + 2);
//     const lower = start;
//     const upper = start + length - 1;

//     rangeMap.children.push({
//         name: "seed",
//         range: [lower, upper],
//         children: [],
//     });
// }

// /**
//  *
//  * @param {import('./').Item} rangeMap
//  * @returns
//  */
// function walk(rangeMap, depth = 0) {
//     const map = maps[rangeMap.name];
//     if (!map || depth > 1) return rangeMap;

//     const output = {
//         name: map.to,
//         range: [...map.ranges[0]],
//         children: [],
//     };

//     for (const range of map.ranges) {
//         const [destination, src, length] = range;
//         const srcRange = new Range(src, src + length - 1);
//         const dstRange = new Range(destination, destination + length - 1);
//         const r = new Range(rangeMap.range[0], rangeMap.range[1]);

//         // console.log(range, srcRange, dstRange, rangeMap);

//         // if before
//         if (r.upper < srcRange.lower) {
//             output.children.push(
//                 walk(
//                     { name: map.to, range: [r.lower, r.upper], children: [] },
//                     depth + 1
//                 )
//             );
//         }

//         // if after
//         if (r.lower > srcRange.upper) {
//             output.children.push(
//                 walk(
//                     { name: map.to, range: [r.lower, r.higher], children: [] },
//                     depth + 1
//                 )
//             );
//         }

//         if (r.contains(srcRange)) {
//             // const offset = t.lower - r.lower;

//             output.children.push(
//                 walk({ name: map.to, range: dstRange, children: [] }, depth + 1)
//             );

//             continue;
//         }

//         // if (!r.overlaps(new Rangeoutput.range())) continue;

//         console.log(rangeMap.name, range);
//         //     // const [lower, upper] = range.range;
//         //     if (range?.children?.length) {
//         output.children.push(
//             walk(
//                 { name: map.to, range: [r.lower, r.higher], children: [] },
//                 depth + 1
//             )
//         );
//         //     }
//     }

//     return output;
// }

// for (const seed of rangeMap.children) {
//     seed.children.push(walk(seed));
// }

// let min = +Infinity;
// function formmatPrint(rangeMap, depth = 0) {
//     let output = "";

//     for (const range of rangeMap ?? []) {
//         console.log(range);
//         const [lower, upper] = range.range;
//         output += `${" ".repeat(depth * 2)}${
//             range.name
//         } ${lower} -> ${upper} \n`;

//         if (range.name === "humidity") {
//             min = Math.min(min, lower, upper);
//         }

//         if (range.children.length) {
//             output += formmatPrint(range.children, depth + 1);
//         }
//     }

//     return output;
// }

// fs.writeFileSync("./2023/05/output.txt", formmatPrint(rangeMap.children));
// // fs.writeFileSync("./2023/05/output.txt", JSON.stringify(rangeMap, null, 2));

// // console.log(JSON.stringify(rangeMap, null, 2));
// // console.log("rrrr", rangeMap);

// function get(depth, a, b) {
//     for (const [c, d, dst] of mapRanges[depth]) {
//         if (c <= a && a < d) {
//             if (b < d) {
//                 const newA = a - c + dst;
//                 const newB = b - c + dst;
//                 return depth === 6 ? newA : get(depth + 1, newA, newB);
//             } else {
//                 return Math.min(get(depth, a, d - 1), get(depth, d, b));
//             }
//         }
//     }
//     return depth === 6 ? a : get(depth + 1, a, b);
// }

// // const input = fs.readFileSync("day05/input", "utf-8");
// // const lines = input.split("\n\n");

// const seeds = input[0].split(": ")[1].split(" ").map(Number);
// // const ms = input.slice(1).map((l) =>
// //     l
// //         .split(":")[1]
// //         .split("")
// //         .map((n) => n.split(" ").map(Number))
// // );

// const ms = input.slice(1).map((l) =>
//     l
//         .split("\n")
//         .slice(1, 100)
//         .map((l) => lib.parseNumbers(l))
// );

// console.log(ms);

// const mapRanges = Array.from({ length: 7 }, () => []);

// ms.forEach((m, depth) => {
//     m.forEach(([dst, src, l]) => {
//         mapRanges[depth].push([src, src + l, dst]);
//     });
// });

// const result = Math.min(
//     ...seeds.map((_, i) => get(0, seeds[i], seeds[i] + seeds[i + 1]))
// );
// console.log(result, seeds, mapRanges);

// console.log(min);

// JSON.stringify(tree, null, 2),
