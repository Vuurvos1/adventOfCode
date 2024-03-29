import fs from 'node:fs';
const rawInput = fs.readFileSync('input.txt', 'utf8');
let input = rawInput
  .trim()
  .split('\n')
  .map((row) => row.split(''));

let board = new Set();

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === '#') {
      board.add(`${x},${y}`);
    }
  }
}

console.log(board.size);

// way to debug and print board
const print = (elves) => {
  let minX = +Infinity;
  let minY = +Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  elves.forEach((value) => {
    const [x, y] = value.split(',').map((i) => Number(i));
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });

  for (let y = minY; y <= maxY; y++) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      if (!elves.has(`${x},${y}`)) line += '.';
      else line += '#';
    }
    console.log(line);
  }
};

// print(board);
// console.log(' ');

let dirs = ['n', 's', 'w', 'e'];

for (let i = 0; i < 10; i++) {
  const moves = new Map();

  for (const elf of board) {
    // console.log(board.size);
    let [x, y] = elf.split(',').map((x) => Number(x));

    let n = `${x},${y - 1}`;
    let e = `${x + 1},${y}`;
    let s = `${x},${y + 1}`;
    let w = `${x - 1},${y}`;

    let N = board.has(n);
    let E = board.has(e);
    let S = board.has(s);
    let W = board.has(w);
    let NE = board.has(`${x + 1},${y - 1}`);
    let NW = board.has(`${x - 1},${y - 1}`);
    let SE = board.has(`${x + 1},${y + 1}`);
    let SW = board.has(`${x - 1},${y + 1}`);

    if (!(N || S || W || E || NE || NW || SE || SW)) continue;

    // console.log(elf, N, NE, E, SE, S, SW, W, NW);

    for (const dir of dirs) {
      if (dir === 'n' && !N && !NE && !NW) {
        // console.log('m n');
        // elf collision
        if (moves.has(n)) {
          moves.delete(n);
        }
        // elf's next position
        else {
          moves.set(n, elf);
        }
        break;
      }

      if (dir === 's' && !S && !SE && !SW) {
        // console.log('m s');
        if (moves.has(s)) {
          moves.delete(s);
        } else {
          moves.set(s, elf);
        }

        break;
      }

      if (dir === 'w' && !W && !NW && !SW) {
        // console.log('m s');
        if (moves.has(w)) {
          moves.delete(w);
        } else {
          moves.set(w, elf);
        }

        break;
      }

      if (dir === 'e' && !E && !NE && !SE) {
        // console.log('m e');
        if (moves.has(e)) {
          moves.delete(e);
        } else {
          moves.set(e, elf);
        }

        break;
      }
    }
  }

  // console.log(moves);

  moves.forEach((value, key) => {
    board.delete(value);
    board.add(key);
  });

  // rotate directions
  let rotatedDir = dirs.shift();
  dirs.push(rotatedDir);

  // print(board);
  // console.log(' ');
}

let minx = +Infinity;
let miny = +Infinity;
let maxx = -Infinity;
let maxy = -Infinity;
for (const elf of board) {
  const [x, y] = elf.split(',').map((x) => Number(x));
  minx = Math.min(minx, x);
  miny = Math.min(miny, y);
  maxx = Math.max(maxx, x);
  maxy = Math.max(maxy, y);
}

console.log(board.size);

const boardTiles = Math.abs(maxx - minx + 1) * Math.abs(maxy - miny + 1);
const groundTiles = boardTiles - board.size;

console.log('end', groundTiles);
