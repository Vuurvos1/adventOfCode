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

function getBoardScore(board, skipValue) {
    // find horizontal reflection
    for (let y = 1; y < board.length; y++) {
        const match = checkHorizontal(board, y);

        if (match) {
            const score = 100 * y;

            console.log(skipValue, score);
            if (skipValue === score) continue;

            return score;
            // if (skipValue) {
            //     if (score !== skipValue) return score;
            // } else {
            // }
        }
    }

    // find vertical reflection, transpose board to reuse horizontal check
    const newBoard = transpose(board);
    for (let x = 1; x < newBoard.length; x++) {
        const match = checkHorizontal(newBoard, x);

        if (match) {
            const score = x;
            console.log(skipValue, score);
            if (skipValue === score) continue;
            return score;
            // if (skipValue) {
            //     if (score !== skipValue) return score;
            // } else {
            // }
        }
    }

    // console.log("out");

    return 0;
}

function replaceAt(str, index, char) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + char + str.substring(index + 1);
}

function transpose(pattern) {
    const result = Array(pattern[0].length);
    for (const row of pattern) {
        [...row].forEach((c, i) => (result[i] += c));
    }
    return result;
}

let output = 0;

for (const board of boards) {
    let score = getBoardScore(board);

    console.log("board", board.join("\n"), score);

    for (let y = 0; y < board.length; y++) {
        let br = false;
        for (let x = 0; x < board[y].length; x++) {
            board[y] = replaceAt(board[y], x, board[y][x] === "#" ? "." : "#");

            // check logic
            const newScore = getBoardScore(board, score);
            if (newScore === 0) continue;
            output += newScore;
            if (newScore !== score) {
                console.log(board.join("\n"), score, newScore);
                br = true;
                break;
            }

            board[y] = replaceAt(board[y], x, board[y][x] === "#" ? "." : "#");
        }
        if (br) break;
    }

    // if (!updated) output += score;
}

// 6339 low
// 28967 low
console.info(output);
clipboard.writeSync(String(output));
