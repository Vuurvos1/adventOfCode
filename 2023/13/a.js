import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const boards = fs
    .readFileSync("./2023/13/input.txt", "utf8")
    .trim()
    .split("\n\n")
    .map((board) => board.split("\n"));

/**
 * @param {string[]} pattern
 * @param {number} row
 */
function checkHorizontal(pattern, row) {
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
        if (pattern[i] !== pattern[j]) return false;
    }
    return true;
}

function transpose(pattern) {
    // const newPattern = [];
    // for (let y = 0; y < pattern.length; y++) {
    //     for (let x = 0; x < pattern[y].length; x++) {
    //         if (!newPattern[x]) newPattern[x] = [];
    //         newPattern[x][y] = pattern[y][x];
    //     }
    // }

    const result = Array(pattern[0].length).fill("");
    for (const row of pattern) {
        [...row].forEach((c, i) => (result[i] += c));
    }
    return result;
}

let output = 0;

for (const board of boards) {
    // find horizontal reflection
    for (let y = 1; y < board.length; y++) {
        const match = checkHorizontal(board, y);

        if (match) {
            output += 100 * y;
            break;
        }
    }

    // find vertical reflection, transpose board to reuse horizontal check
    const newBoard = transpose(board);
    for (let x = 1; x < newBoard.length; x++) {
        const match = checkHorizontal(newBoard, x);
        if (match) {
            output += x;
            break;
        }
    }
}

console.info(output);
clipboard.writeSync(String(output));
