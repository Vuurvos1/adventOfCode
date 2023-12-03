import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/03/input.txt", "utf8").trim().split("\n");
const board = input.map((row) => row.split(""));

let output = 0;

/** @type {Map<string, nubmer[]>} */
const gears = new Map();

for (let y = 0; y < board.length; y++) {
    let digit = "";
    let isGear = false;
    let gearPos = {};
    for (let x = 0; x < board[y].length; x++) {
        const isDigit = /\d/.test(board[y][x]);

        if (isDigit) {
            digit += board[y][x];
        }

        // check neighbours
        let neighbours = false;
        if (isDigit) {
            neighbours = getNeighbours(x, y);

            if (neighbours.some(([x, y]) => board[y]?.[x] === "*")) {
                const tmp = neighbours.filter(
                    ([x, y]) => board[y]?.[x] === "*"
                );
                gearPos = { x: tmp[0][0], y: tmp[0][1] };

                isGear = true;
            }
        }

        if (!isDigit && isGear && digit) {
            if (isGear) {
                const key = `${gearPos.x},${gearPos.y}`;

                if (!gears.has(key)) {
                    gears.set(key, []);
                }

                gears.get(key).push(Number(digit));
            }

            digit = "";
            isGear = false;
            gearPos = {};
        }

        if (!isDigit) {
            digit = "";
        }
    }

    if (isGear && digit) {
        const key = `${gearPos.x},${gearPos.y}`;

        if (!gears.has(key)) {
            gears.set(key, []);
        }

        gears.get(key).push(Number(digit));
    }
}

for (const gear of gears.values()) {
    if (gear.length === 2) {
        output += gear[0] * gear[1];
    }
}

// console.log(gears);

console.info(output);
clipboard.writeSync(String(output));

function getNeighbours(x, y) {
    return [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
    ];
}
