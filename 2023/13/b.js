import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const boards = fs
    .readFileSync("./2023/13/input.txt", "utf8")
    .trim()
    .split("\n\n")
    .map((board) => board.split("\n"));

let output = 0;

function transpose(board) {
    const result = Array(board[0].length).fill("");
    for (const row of board) {
        [...row].forEach((c, i) => (result[i] += c));
    }
    return result;
}

function getBoardScore(board) {
    for (let y = 1; y < board.length; y++) {
        const match = checkHorizontal(board, y);
        if (match) {
            return 100 * y;
        }
    }

    // find vertical reflection, transpose board to reuse horizontal check
    const transposed = transpose(board);
    for (let x = 1; x < transposed.length; x++) {
        const match = checkHorizontal(transposed, x);
        if (match) {
            return x;
        }
    }
}

/**
 * @param {string[]} pattern
 * @param {number} row
 */
function checkHorizontal(pattern, row) {
    let match = false;
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
        for (let k = 0; k < pattern[i].length; k++) {
            // allow for 1 mismatch (dirty spot)
            if (pattern[i][k] !== pattern[j][k]) {
                if (match) return false;
                match = true;
            }
        }
    }
    if (match) return true;
}

for (const board of boards) {
    output += getBoardScore(board);
}

console.info(output);
// clipboard.writeSync(String(output));
