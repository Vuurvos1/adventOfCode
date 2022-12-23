import fs from 'node:fs';
const rawInput = fs.readFileSync('input.txt', 'utf8');
let input = rawInput
  .trim()
  .split('\n')
  .map((row) => row.split(''));

let board = new Set();

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[x][y] === '#') {
      board.add(`${x},${y}`);
    }
  }
}

console.log(board.size);

for (let i = 0; i < 10; i++) {
  const boardCopy = new Set(board);

  for (const elf of board) {
    console.log(board.size);
    let [x, y] = elf.split(',').map((x) => Number(x));

    let N = board.has(`${x},${y + 1}`);
    let E = board.has(`${x + 1},${y}`);
    let S = board.has(`${x},${y - 1}`);
    let W = board.has(`${x - 1},${y}`);
    let NE = board.has(`${x + 1},${y + 1}`);
    let NW = board.has(`${x - 1},${y + 1}`);
    let SE = board.has(`${x + 1},${y - 1}`);
    let SW = board.has(`${x - 1},${y - 1}`);

    if (!N && !S && !W && !E && !NE && !NW && !SE && !SW) continue;

    // remove self from set

    if (!N && !NE && !NW && !boardCopy.has(`${x},${y + 1}`)) {
      boardCopy.delete(elf);
      // console.log('N', boardCopy.has(`${x},${y + 1}`), N, NE, NW);
      boardCopy.add(`${x},${y + 1}`);
    } else if (!S && !SE & !SW && !boardCopy.has(`${x},${y - 1}`)) {
      boardCopy.delete(elf);
      // console.log('S', boardCopy.has(`${x},${y - 1}`));
      boardCopy.add(`${x},${y - 1}`);
    } else if (!W && !NW && !SW && !boardCopy.has(`${x - 1},${y}`)) {
      boardCopy.delete(elf);
      // console.log('W', boardCopy.has(`${x - 1},${y}`));
      boardCopy.add(`${x - 1},${y}`);
    } else if (!E && !NE && !SE && !boardCopy.has(`${x + 1},${y}`)) {
      boardCopy.delete(elf);
      // console.log('E', boardCopy.has(`${x + 1},${y}`));
      boardCopy.add(`${x + 1},${y}`);
    }
  }

  board = new Set(boardCopy);
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

// 11 * 12
console.log(board.size);
console.log(minx, miny, maxx, maxy);

const boardTiles = Math.abs(maxx - minx) * Math.abs(maxy - miny);
const groundTiles = boardTiles - board.size;

console.log('end', boardTiles, groundTiles);
