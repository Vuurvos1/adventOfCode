import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/22/input.txt", "utf8").trim().split("\n");
const bricks = input
    .map((line) => line.split("~").map((box) => box.split(",").map(Number)))
    .sort((a, b) => a[0][2] - b[0][2]);

// change to a while loop once every box is settled
// let moved = false;
// for (let i = 0; i < 100; i++) {
//     moved = false;
//     for (const box of boxes) {
//         // z can't go below 1
//         if (box[0][2] <= 1 || box[1][2] <= 1) {
//             continue;
//         }

//         // apply gravity
//         box[0][2] -= 1;
//         box[1][2] -= 1;

//         let collided = false;
//         for (const otherBox of boxes) {
//             if (box === otherBox) {
//                 continue;
//             }

//             if (yOverlap(box, otherBox)) {
//                 // console.info("collision");
//                 collided = true;
//                 continue;
//             }
//         }

//         if (collided) {
//             // undo gravity
//             box[0][2] += 1;
//             box[1][2] += 1;

//             continue;
//         }

//         moved = true;
//     }

//     if (!moved) {
//         break;
//     }
// }

/**
 * If 2 boxes collide
 * @param {number[][]} a array of 2 [[x, y, z], [x, y, z]] coordinates
 * @param {number[][]} b array of 2 [[x, y, z], [x, y, z]] coordinates
 */
function overlaps(a, b) {
    const [b1p1, b1p2] = a;
    const [b2p1, b2p2] = b;

    // reorder the boxes so that box1Min is always the smallest, might not be needed
    const box1Min = [
        Math.min(b1p1[0], b1p2[0]),
        Math.min(b1p1[1], b1p2[1]),
        Math.min(b1p1[2], b1p2[2]),
    ];
    const box1Max = [
        Math.max(b1p1[0], b1p2[0]),
        Math.max(b1p1[1], b1p2[1]),
        Math.max(b1p1[2], b1p2[2]),
    ];

    const box2Min = [
        Math.min(b2p1[0], b2p2[0]),
        Math.min(b2p1[1], b2p2[1]),
        Math.min(b2p1[2], b2p2[2]),
    ];

    const box2Max = [
        Math.max(b2p1[0], b2p2[0]),
        Math.max(b2p1[1], b2p2[1]),
        Math.max(b2p1[2], b2p2[2]),
    ];

    return (
        box1Min[0] <= box2Max[0] &&
        box1Max[0] >= box2Min[0] &&
        box1Min[1] <= box2Max[1] &&
        box1Max[1] >= box2Min[1]
        // box1Min[2] <= box2Max[2] &&
        // box1Max[2] >= box2Min[2]
    );
}

for (let index = 0; index < bricks.length; index++) {
    let maxZ = 1;
    for (let i = 0; i < index; i++) {
        if (overlaps(bricks[index], bricks[i])) {
            maxZ = Math.max(maxZ, bricks[i][1][2] + 1);
        }
    }
    bricks[index][1][2] -= bricks[index][0][2] - maxZ;
    bricks[index][0][2] = maxZ;
}

bricks.sort((a, b) => a[0][2] - b[0][2]);

/** @type {Set<number>[]} */
const kSupportsV = Array(bricks.length)
    .fill(0)
    .map(() => new Set());
/** @type {Set<number>[]} */
const vSupportsK = Array(bricks.length)
    .fill(0)
    .map(() => new Set());

for (let j = 0; j < bricks.length; j++) {
    for (let i = 0; i < j; i++) {
        if (
            overlaps(bricks[i], bricks[j]) &&
            bricks[j][0][2] === bricks[i][1][2] + 1
        ) {
            kSupportsV[i].add(j);
            vSupportsK[j].add(i);
        }
    }
}

// count all boxes that could be removed, if a box is supported by more than 1 box it can't be removed
let count = 0;
for (let i = 0; i < bricks.length; i++) {
    let satisfies = true;
    for (let j of kSupportsV[i]) {
        if (vSupportsK[j].size < 2) {
            satisfies = false;
            break;
        }
    }
    if (satisfies) {
        count++;
    }
}

console.log(count);
