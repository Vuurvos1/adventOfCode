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
    let j = row;
    for (let i = row - 1; i >= 0 && j < pattern.length; i--) {
        if (pattern[i] !== pattern[j]) return false;
        j++;
    }
    return true;
}

function transpose(pattern) {
    const result = Array(pattern[0].length);
    for (const row of pattern) {
        [...row].forEach((c, i) => (result[i] += c));
    }
    return result;
}

function getBoardScore(board) {
    // find horizontal reflection
    for (let y = 1; y < board.length; y++) {
        const match = checkHorizontal(board, y);

        if (match) return 100 * y;
    }

    // find vertical reflection, transpose board to reuse horizontal check
    const newBoard = transpose(board);
    for (let x = 1; x < newBoard.length; x++) {
        const match = checkHorizontal(newBoard, x);

        if (match) return x;
    }
}

let output = 0;

for (const board of boards) {
    output += getBoardScore(board);
}

console.info(output);
clipboard.writeSync(String(output));
