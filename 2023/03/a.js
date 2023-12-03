import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/03/input.txt", "utf8").trim().split("\n");
const board = input.map((row) => row.split(""));

let output = 0;

for (let y = 0; y < board.length; y++) {
    let digit = "";
    let neighbour = false;
    for (let x = 0; x < board[y].length; x++) {
        const isDigit = /\d/.test(board[y][x]);

        if (isDigit) {
            digit += board[y][x];
        }

        // check neighbours
        let neighbours = false;
        if (isDigit) {
            neighbours = getNeighbours(x, y);
            if (neighbours.some(([x, y]) => isSymbol(board[y]?.[x]))) {
                neighbour = true;
            }
        }

        // console.log(neighbour, isDigit, board[y][x], y, x, digit);

        if (!isDigit && neighbour && digit) {
            output += Number(digit);
            console.log("adding", digit, output);
            neighbour = false;
            digit = "";
        }

        if (!isDigit) {
            digit = "";
        }
    }

    if (neighbour && digit) {
        output += Number(digit);
    }

    // console.log("output", output);
}

console.info(output);
clipboard.writeSync(String(output));

function isSymbol(str) {
    if (!str) return false;
    if (str === ".") return false;
    return !/\d/.test(str);
}

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
