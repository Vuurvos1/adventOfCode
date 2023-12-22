import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/22/input.txt", "utf8").trim().split("\n");
const bricks = input
    .map((line) => line.split("~").map((box) => box.split(",").map(Number)))
    .sort((a, b) => a[0][2] - b[0][2]);

let count = 0;

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

function settleBricks(bricks) {
    for (let index = 0; index < bricks.length; index++) {
        let oldZ = bricks[index][0][2];

        let maxZ = 1;
        for (let i = 0; i < index; i++) {
            if (overlaps(bricks[index], bricks[i])) {
                maxZ = Math.max(maxZ, bricks[i][1][2] + 1);
            }
        }

        bricks[index][1][2] -= bricks[index][0][2] - maxZ;
        bricks[index][0][2] = maxZ;

        if (bricks[index][0][2] !== oldZ) {
            count++;
        }
    }
}

settleBricks(bricks);

count = 0;
for (let i = 0; i < bricks.length; i++) {
    if (i % 10 === 0) {
        console.log(i);
    }

    const brickCopy = JSON.parse(JSON.stringify(bricks));

    brickCopy.splice(i, 1);

    // drop bricks
    settleBricks(brickCopy);
}

console.log("done", count);
