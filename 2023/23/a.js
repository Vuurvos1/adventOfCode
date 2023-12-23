import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const map = fs
    .readFileSync("./2023/23/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const startpos = { x: 1, y: 0 };
const endPos = { x: map[0].length - 2, y: map.length - 1 };

// Finding: slopes < and ^ don't exist in the puzzle input
// Also double slopes don't seem to exist, maybe the slopes are actually directions in p2?

// get all possible path from start to end
const paths = [];

function findPath(pos, path = [], depth = 0) {
    const pathCopy = [...path];
    if (pos.x === endPos.x && pos.y === endPos.y) {
        paths.push(pathCopy);
    }

    if (pathCopy.find((p) => p.x === pos.x && p.y === pos.y)) {
        return;
    }
    pathCopy.push(pos);

    for (const dir of lib.cardinalDirections) {
        const newX = pos.x + dir.x;
        const newY = pos.y + dir.y;

        if (!lib.isInbounds(newX, newY, map)) continue;

        const newPos = { x: newX, y: newY };

        if (map[newY][newX] === "#") {
            continue;
        }

        // slopes
        if (map[newY][newX] === ">") {
            if (dir.x !== 1) continue;
        }

        if (map[newY][newX] === "v") {
            if (dir.y !== 1) continue;
        }

        findPath(newPos, pathCopy, depth + 1);
    }
}

findPath(startpos);
console.log("paths found", paths.length);

// longest path

let output = 0;
for (const path of paths) {
    output = Math.max(output, path.length - 1);
}

console.info("output", output);
clipboard.writeSync(String(output));
