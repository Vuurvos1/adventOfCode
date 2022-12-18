import fs from 'node:fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\n').slice(0, -1);

const size = 50;

const space = [];
for (let i = 0; i < size; i++) {
  const tmp = [];
  for (let j = 0; j < size; j++) {
    tmp.push(new Array(size).fill(0));
  }

  space.push(tmp);
}

for (const inp of input) {
  const [x, y, z] = inp.split(',');
  // offset by 1 to fill around
  space[Number(x) + 1][Number(y) + 1][Number(z) + 1] = 2;
}

let sides = 0;

// mark surounding air spaces using a flood fill
let stack = [[size - 1, size - 1, size - 1]];

let dirs = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

// this is very slow but whatever
while (stack.length > 0) {
  const [x, y, z] = stack.shift();

  if (space?.[x]?.[y]?.[z] !== 0) continue;

  space[x][y][z] = 1;

  for (const dir of dirs) {
    const [dx, dy, dz] = dir;
    stack.push([x + dx, y + dy, z + dz]);
  }
}

// 0 nothing
// 1 air
// 2 cube

// counting area
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      if (space[i][j][k] !== 2) continue;

      if (space?.[i + 1]?.[j]?.[k] === 1) {
        sides++;
      }

      if (space?.[i - 1]?.[j]?.[k] === 1) {
        sides++;
      }

      if (space?.[i]?.[j + 1]?.[k] === 1) {
        sides++;
      }

      if (space?.[i]?.[j - 1]?.[k] === 1) {
        sides++;
      }

      if (space?.[i]?.[j]?.[k + 1] === 1) {
        sides++;
      }

      if (space?.[i]?.[j]?.[k - 1] === 1) {
        sides++;
      }
    }
  }
}

// 4320

console.log(sides);
