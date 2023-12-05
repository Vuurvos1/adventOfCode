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

class Range {
    constructor(lower, upper) {
        // flip values if needed?
        this.lower = lower;
        this.upper = upper;
    }

    /**
     * If range fully contains another range
     * @param {Range} other
     * @returns
     */
    contains(other) {
        return this.lower <= other.lower && other.upper <= this.upper;
    }

    /**
     * If 2 ranges overlap
     * @param {Range} other
     * @returns
     */
    overlaps(other) {
        return !(this.lower > other.upper || this.upper < other.lower);
    }

    /**
     * Split range in upto 3 new ranges based on overlap
     * @param {Range} other
     * @returns
     */
    subRanges(other) {
        /** @type {Range[]}  */
        const output = [];

        // split the new range

        // if lower
        if (other.lower < this.lower) {
            other.push([other.lower, this.lower - 1]);
        }

        // if upper
        if (other.higher > this.higher) {
            output.push([this.higher + 1, other.higher]);
        }

        // intersection
        if (this.contains(other)) {
            output.push([this.lower, this.higher]);
        }

        return output;
    }
}

// seed range
// - soil
//  - fertilizer
//      - ...
// - soil
//  - ...
// seed range
// - ...

/** @type {number} */
let output = +Infinity;

const seedNumbers = lib.parseNumbers(seedInput);

// total seeds 1_815_746_760
// for (let i = 0; i < seedNumbers.length / 2; i++) {
//     const [start, length] = seedNumbers.slice(i * 2, i * 2 + 2);

//     for (let j = start; j < start + length; j++) {
//         let next = "seed";
//         let source = j;

//         while (true) {
//             const map = maps[next];
//             if (!map) break;

//             const match = map.ranges.find((el) => {
//                 const [_destination, src, length] = el;
//                 if (source >= src && source < src + length) return true;
//             });

//             // if not found keep same source number
//             if (match) {
//                 const [destination, src, length] = match;
//                 const offset = source - src;
//                 source = destination + offset;
//             }

//             next = map.to;
//         }

//         output = Math.min(output, source);
//     }
// }

const tree = {};

for (let i = 0; i < seedNumbers.length / 2; i++) {
    const [start, length] = seedNumbers.slice(i * 2, i * 2 + 2);

    const lower = start;
    const upper = start + length - 1;

    const range = new Range(lower, upper);

    let next = "seed";
    
    let key = next + i;
    const map = maps[next];

    const soil = map[next]

    // tree[key] = { range: [lower, upper] };
    // let ref = tree[key];


    // for (let x = 0; x < 1; x++) {
    //     if (!map) break;

    //     let key = next + x;

    //     console.log(map);

    //     ref[key] = {};
    //     ref = ref[key];

    //     ref.ranges = [];

    //     for (const rr of map.ranges) {
    //         const [destination, src, length] = rr;

    //         const l = destination;
    //         const u = destination + length - 1;
    //         const r = new Range(l, u);

    //         //             const match = map.ranges.find((el) => {
    //         //                 if (source >= src && source < src + length) return true;
    //         //             });

    //         ref.ranges.push(r.subRanges(range));
    //     }

        // const match = map.ranges.find((el) => {
        //     const [_destination, src, length] = el;
        //     if (source >= src && source < src + length) return true;
        // });
        // // if not found keep same source number
        // if (match) {
        //     const [destination, src, length] = match;
        //     const offset = source - src;
        //     source = destination + offset;
        // }
        next = map.to;
    }
}

// TODO: find min location value in tree

console.log(JSON.stringify(tree, null, 2));

console.info(output);
// clipboard.writeSync(String(output));
