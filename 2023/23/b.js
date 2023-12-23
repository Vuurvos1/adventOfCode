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

const startKey = `${startpos.x},${startpos.y}`;
const endKey = `${endPos.x},${endPos.y}`;

/** @typedef {{self: string, to: {key: string, length: number}[]}} Node */

/** @type {Map<string, Node>} */
const newNodes = new Map([
    [startKey, { self: startKey, to: [] }],
    [endKey, { self: endKey, to: [] }],
]);

console.time("parse");
for (const [key, value] of newNodes) {
    newNodes.set(key, { self: key, to: [] });

    /**
     * @param {number} step
     * @param {number} last
     * @param {number} y
     * @param {number} x
     * @returns
     */
    function nav(step, last, y, x) {
        if (!lib.isInbounds(y, x, map) || map[y][x] == "#") return;

        let neighbors = 0;
        for (const dir of lib.cardinalDirections) {
            const newX = x + dir.x;
            const newY = y + dir.y;

            if (!lib.isInbounds(newX, newY, map)) continue;
            if (map[newY][newX] === "#") continue;

            neighbors++;
        }

        // edge can be reduiced
        if (step > 0 && (neighbors > 2 || y < 1 || y >= map.length - 1)) {
            const newKey = `${x},${y}`;

            if (!newNodes.has(newKey)) {
                newNodes.set(newKey, { self: newKey, to: [] });
            }

            const n = newNodes.get(key);
            if (!n) return;

            n.to.push({
                key: newKey,
                length: step,
            });

            return;
        }

        if (last != 2 && y > 0) nav(step + 1, 0, y - 1, x);
        if (last != 0 && y < map.length - 1) nav(step + 1, 2, y + 1, x);
        if (last != 3) nav(step + 1, 1, y, x - 1);
        if (last != 1) nav(step + 1, 3, y, x + 1);
    }

    const [x, y] = key.split(",").map(Number);
    nav(0, -1, y, x);
}
console.timeEnd("parse");

/** @type {string[]} */
let longestPath = [];
let length = 0;

/**
 * @param {number} steps
 * @param {string} node
 * @param {string[]} path
 * @returns
 */
function findPath(steps = 0, node = "", path = []) {
    if (node === endKey) {
        if (steps > length) {
            longestPath = path;
            length = steps;
        }
        return;
    }
    path.push(node);

    const n = newNodes.get(node);
    if (!n) return;

    for (const target of n.to) {
        if (path.includes(target.key)) continue;
        findPath(steps + target.length, target.key, [...path]);
    }
}

console.time("solve");
findPath(0, startKey, []);
console.timeEnd("solve");

console.log(longestPath, length);
