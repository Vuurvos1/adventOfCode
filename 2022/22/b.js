import fs from 'node:fs';

const rawInput = fs.readFileSync('input.txt', 'utf8');
let [map, inputMoves] = rawInput.trimEnd().split('\n\n');

map = map.split('\n').map((row) => row.split(''));
const moves = inputMoves
  .replaceAll('L', ' L ')
  .replaceAll('R', ' R ')
  .split(' ');

const dirs = {
  0: [1, 0], // right / east
  1: [0, 1], // down / south
  2: [-1, 0], // left / west
  3: [0, -1], // up / north
};

const [R, D, L, U] = [0, 1, 2, 3];
// change this to an object for easier lookup?
const wrappingRules = [
  [
    // R
    [[Infinity, 50], ([x, y]) => [[99, 149 - y], L]],
    [[Infinity, 100], ([x, y]) => [[y + 50, 49], U]],
    [[Infinity, 150], ([x, y]) => [[149, 149 - y], L]],
    [[Infinity, 200], ([x, y]) => [[y - 100, 149], U]],
  ],
  [
    // D
    [[50, Infinity], ([x, y]) => [[x + 100, 0], D]],
    [[100, Infinity], ([x, y]) => [[49, x + 100], L]],
    [[150, Infinity], ([x, y]) => [[99, x - 50], L]],
  ],
  [
    // L
    [[Infinity, 50], ([x, y]) => [[0, 149 - y], R]],
    [[Infinity, 100], ([x, y]) => [[y - 50, 100], D]],
    [[Infinity, 150], ([x, y]) => [[50, 149 - y], R]],
    [[Infinity, 200], ([x, y]) => [[y - 100, 0], D]],
  ],
  [
    // U
    [[50, Infinity], ([x, y]) => [[50, x + 50], R]],
    [[100, Infinity], ([x, y]) => [[0, x + 100], R]],
    [[150, Infinity], ([x, y]) => [[x - 100, 199], U]],
  ],
];

let pos = { x: map[0].findIndex((c) => c !== ' '), y: 0 };
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

  // do movement logic
  for (let i = 0; i < Number(move); i++) {
    const [dx, dy] = dirs[dir];

    let newPos = { x: pos.x + dx, y: pos.y + dy };

    // on a '.'
    if (map?.[newPos.y]?.[newPos.x] && map?.[newPos.y]?.[newPos.x] !== ' ') {
      // all good
      // normal move
      // move around cube
    } else {
      // wrapping move
      // find corresponding wrapping rule
      const rule = wrappingRules[dir].find(
        (el) => newPos.x < el[0][0] && newPos.y < el[0][1]
      );

      // [pos, direction]
      const [p, d] = rule[1]([newPos.x, newPos.y]);
      const [x, y] = p;

      if (map[y][x] === '#') break;

      // adjust position and rotation according
      newPos = { x: x, y: y };
      dir = d;
    }

    if (map[newPos.y][newPos.x] === '#') {
      break;
    }

    pos = newPos;
  }
}

console.log(pos, dir);
let out = 1000 * (pos.y + 1) + 4 * (pos.x + 1) + dir;

console.log('end', out);
