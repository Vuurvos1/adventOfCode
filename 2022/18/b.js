import fs from 'node:fs';

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .slice(0, -1)
  .map((cord) => cord.split(',').map(Number));

const size = input.reduce((prev, curr) => Math.max(prev, ...curr), 0) + 3;

// 0 nothing
// 1 air
// 2 cube

const space = [];
for (let i = 0; i < size; i++) {
  const tmp = [];
  for (let j = 0; j < size; j++) {
    tmp.push(new Array(size).fill(0));
  }

  space.push(tmp);
}

for (const inp of input) {
  const [x, y, z] = inp;
  // offset by 1 to fill around the droplet
  space[x + 1][y + 1][z + 1] = 2;
}

const dirs = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

// mark surounding air spaces using a flood fill
const stack = [[size - 1, size - 1, size - 1]];

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

let sides = 0;

// counting area
for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      if (space[x][y][z] !== 2) continue;

      for (const dir of dirs) {
        const [dx, dy, dz] = dir;
        if (space?.[x + dx]?.[y + dy]?.[z + dz] === 1) {
          sides++;
        }
      }
    }
  }
}

console.log(sides);
