import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/16/input.txt", "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const visited = new Set();
let heads = [{ x: 0, y: 0, vx: 1, vy: 0 }];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function clearConsole() {
    let lines = process.stdout.getWindowSize()[1];
    for (let i = 0; i < lines; i++) {
        console.log("\r\n");
    }
}

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
            (input[head.y][head.x] === "-" || input[head.y][head.x] === "|") &&
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

    clearConsole();

    console.log(
        input
            .map((line, y) =>
                line
                    .map((row, x) => (visited.has(`${x},${y}`) ? "#" : "."))
                    .join("")
            )
            .join("\n")
    );

    await sleep(150);
}

const output = visited.size;
console.info(output);
// clipboard.writeSync(String(output));
