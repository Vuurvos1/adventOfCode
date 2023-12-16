import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/16/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const edges = [];
for (let y = 0; y < input.length; y++) {
    edges.push({ x: 0, y, vx: 1, vy: 0 });
    edges.push({ x: input[0].length - 1, y, vx: -1, vy: 0 });
}

for (let x = 0; x < input[0].length; x++) {
    edges.push({ x, y: 0, vx: 0, vy: 1 });
    edges.push({ x, y: input.length - 1, vx: 0, vy: -1 });
}

let max = 0;
while (edges.length > 0) {
    const visited = new Set();
    let heads = [edges.shift()];

    while (true) {
        if (heads.length === 0) {
            break;
        }

        for (const head of heads) {
            const key = `${head.x},${head.y}`;
            if (lib.isInbounds(head.x, head.y, input) === false) {
                heads = heads.filter((h) => h !== head);
                continue;
            }

            if (
                (input[head.y][head.x] === "-" ||
                    input[head.y][head.x] === "|") &&
                visited.has(key)
            ) {
                heads = heads.filter((h) => h !== head);
                continue;
            }

            // split
            if (input[head.y][head.x] === "-") {
                if (head.vx === 0) {
                    heads = heads.filter((h) => h !== head);

                    heads.push({ x: head.x + 1, y: head.y, vx: 1, vy: 0 });
                    heads.push({ x: head.x - 1, y: head.y, vx: -1, vy: 0 });
                    visited.add(key);
                    continue;
                }
            }

            if (input[head.y][head.x] === "|") {
                if (head.vy === 0) {
                    heads = heads.filter((h) => h !== head);

                    heads.push({ x: head.x, y: head.y + 1, vx: 0, vy: 1 });
                    heads.push({ x: head.x, y: head.y - 1, vx: 0, vy: -1 });
                    visited.add(key);
                    continue;
                }
            }

            // reflect
            if (input[head.y][head.x] === "/") {
                if (head.vx === 0) {
                    head.vx = -head.vy;
                    head.vy = 0;
                } else {
                    head.vy = -head.vx;
                    head.vx = 0;
                }
            }

            if (input[head.y][head.x] === "\\") {
                if (head.vx === 0) {
                    head.vx = head.vy;
                    head.vy = 0;
                } else {
                    head.vy = head.vx;
                    head.vx = 0;
                }
            }

            visited.add(key);

            // move
            head.x += head.vx;
            head.y += head.vy;
        }
    }

    max = Math.max(max, visited.size);
}

console.info(max);
// clipboard.writeSync(String(output));
