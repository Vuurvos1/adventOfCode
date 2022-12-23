import fs from 'node:fs';

const rawInput = fs.readFileSync('input.txt', 'utf8');
let [board, inputMoves] = rawInput.trimEnd().split('\n\n');

board = board.split('\n');
let moves = inputMoves.replaceAll('L', ' L ').replaceAll('R', ' R ').split(' ');

console.log(moves, board);

const dirs = {
  0: [1, 0], // right
  1: [0, -1], // down
  2: [-1, 0], // left
  3: [0, 1], // up
};

let pos = { x: 0, y: 0 };
pos.x = board[0].indexOf('.');

console.log(pos);

let dir = 0;
for (let move of moves) {
  if (move == 'L') {
    dir--;
    continue;
  }

  if (move == 'R') {
    dir++;
    continue;
  }

  move = Number(move);

  const [dx, dy] = dirs[Math.abs(dir % 4)];

  for (let i = 0; i < move; i++) {
    let prevPos = { ...pos };
    pos.x += dx;
    pos.y += dy;

    // console.log(pos, prevPos);

    // wrapping
    if (board?.[pos.y]?.[pos.x] || board?.[pos.y]?.[pos.x] === ' ') {
      // also includes collision

      if (dx === 1) {
        pos.x = board[0].indexOf('.');

        // if ()
        // if colliding return
      } else if (dx === -1) {
        // search y
      } else if (dy === 1) {
      } else if (dy === -1) {
      }

      continue;
    }

    // basic collision
    if (board[pos.y][pos.x] === '#') {
      pos = prevPos;
      break;
    }

    // if (false) {

    // }
  }
}

let out = 1000 * pos.x + 4 * pos.y + dir;

console.log('end');
