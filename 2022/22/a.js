import fs from 'node:fs';

const rawInput = fs.readFileSync('input.txt', 'utf8');
let [board, inputMoves] = rawInput.trimEnd().split('\n\n');

board = board.split('\n').map((row) => row.split(''));
const moves = inputMoves
  .replaceAll('L', ' L ')
  .replaceAll('R', ' R ')
  .split(' ');

// console.log(moves, board);

const dirs = {
  0: [1, 0], // right / east
  1: [0, 1], // down / south
  2: [-1, 0], // left / west
  3: [0, -1], // up / north
};

let pos = { x: board[0].findIndex((c) => c !== ' '), y: 0 };
console.log(pos);

let dir = 0;
for (const move of moves) {
  if (move == 'L') {
    dir = (dir - 1 + 4) % 4;
    continue;
  }

  if (move == 'R') {
    dir = (dir + 1 + 4) % 4;
    continue;
  }

  const [dx, dy] = dirs[dir];

  for (let i = 0; i < Number(move); i++) {
    let newPos = { x: pos.x + dx, y: pos.y + dy };

    // loop to next valid spot
    while (true) {
      // position wrapping
      if (Math.abs(dy) > 0) {
        if (newPos.y > board.length - 1) newPos.y = 0;
        if (newPos.y < 0) newPos.y = board.length - 1;
      }

      if (Math.abs(dx) > 0) {
        if (newPos.x > board[newPos.y].length - 1) newPos.x = 0;
        if (newPos.x < 0) newPos.x = board[newPos.y].length - 1;
      }

      // on a '.'
      if (board[newPos.y][newPos.x] && board[newPos.y][newPos.x] !== ' ') {
        break;
      }

      newPos.x += dx;
      newPos.y += dy;
    }

    if (board[newPos.y][newPos.x] === '#') {
      break;
    }

    pos = newPos;
  }

  // let tmp = board.map((row) => [...row]);
  // tmp[pos.y][pos.x] = dir;
  // console.log(tmp.map((row) => row.join('')));
}

console.log(pos, dir);

let out = 1000 * (pos.y + 1) + 4 * (pos.x + 1) + dir;

// 126280 HIGH
// 126252 HIGH
// 141136 HIGH
// 103224

console.log('end', out);
