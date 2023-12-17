import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/17/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

const endPosition = { x: input[0].length - 1, y: input.length - 1 };

const queue = [{ x: 0, y: 0, w: 0, dx: 0, dy: 0, steps: 0 }];
const visited = new Set();
let output = 0;

console.time("t");
while (queue.length > 0) {
    // priority queue
    const { x, y, w, dx, dy, steps } = queue.sort((a, b) => b.w - a.w).pop();

    if (x === endPosition.x && y === endPosition.y && steps >= 4) {
        output = w;
        break;
    }

    const key = [x, y, dx, dy, steps].join(",");
    if (visited.has(key)) continue;
    visited.add(key);

    if (steps < 10) {
        const newY = y + dy;
        const newX = x + dx;

        if (lib.isInbounds(newX, newY, input)) {
            queue.push({
                x: newX,
                y: newY,
                w: w + input[newY][newX],
                dx: dx,
                dy: dy,
                steps: steps + 1,
            });
        }
    }

    if (steps >= 4 || (dx === 0 && dy === 0)) {
        for (const dir of lib.cardinalDirections) {
            // TODO: make this faster without JSON.stringify
            if (
                !(
                    JSON.stringify([dir.y, dir.x]) !==
                        JSON.stringify([dy, dx]) &&
                    JSON.stringify([dir.y, dir.x]) !==
                        JSON.stringify([-dy, -dx])
                )
            )
                continue;

            const newX = x + dir.x;
            const newY = y + dir.y;

            if (!lib.isInbounds(newX, newY, input)) continue;

            const newW = w + input[newY][newX];
            queue.push({
                x: newX,
                y: newY,
                w: newW,
                dx: dir.x,
                dy: dir.y,
                steps: 1,
            });
        }
    }
}
console.timeEnd("t");

console.info(output);
clipboard.writeSync(String(output));
