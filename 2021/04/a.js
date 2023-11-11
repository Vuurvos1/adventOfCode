import fs from 'node:fs';

async function main() {
  const input = fs
    .readFileSync('./2021/04/input.txt', 'utf8')
    .trim()
    .split('\r\n');

  let nums = input
    .shift()
    .split(',')
    .map((num) => Number(num));

  const boardsIn = input.filter((b) => b !== '');

  let boards = [];
  let boardStates = new Array(boardsIn.length / 5)
    .fill(0)
    .map((x) => new Array(25).fill(0).map((x) => false));

  for (let i = 0; i < boardsIn.length / 5; i++) {
    let board = [];
    for (let j = 0; j < 5; j++) {
      board.push(
        ...boardsIn[i * 5 + j]
          .split(' ')
          .filter((num) => num != '')
          .map((num) => Number(num))
      );
    }
    boards.push(board);
  }

  for (let i = 0; i < nums.length; i++) {
    const pick = nums[i];

    // for every board
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      const numIndex = board.indexOf(pick);

      if (numIndex >= 0) {
        boardStates[j][numIndex] = true;
        if (getLines(boardStates[j])) {
          // get score
          let out = 0;
          for (let x = 0; x < 25; x++) {
            if (!boardStates[j][x]) {
              out += boards[j][x];
            }
          }

          return pick * out;
        }
      }

      // mark digit on board
      // test for winner
      // y > return out
      // n > continue
    }
  }

  return null;
}

function getLines(board) {
  for (let x = 0; x < 5; x++) {
    if (
      board.slice(5 * x, 5 * x + 5).filter((num) => num === false).length === 0
    ) {
      return true;
    }
  }

  for (let x = 0; x < 5; x++) {
    let col = [];
    for (let y = 0; y < 5; y++) {
      col.push(board[x + y * 5]);
    }

    if (col.filter((num) => num === false).length === 0) {
      return true;
    }
  }

  return false;
}

console.log(await main());
