import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);
input = input.map((input) => input.split('').map((x) => x.charCodeAt(0) - 96));

const pos = { i: 0, j: 0 };
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === -13) {
      // 'S'
      pos.i = i;
      pos.j = j;
    }

    // you have to go throug the entire alphabet before reaching the top
    if (input[i][j] === -27) {
      input[i][j] = 27;
    }
  }
}

input[pos.i][pos.j] = 1;
console.log(input, pos);

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const searchPath = (x, y) => {
  let queue = [{ pos: [x, y], steps: 0 }];
  // const visited = new Set();
  const visisted = [];

  while (queue.length) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();

    if (visisted[i]?.[j]) {
      continue;
    }

    if (input[i][j] == 27) {
      // 'E'
      return steps;
    }

    // for each dir
    for (const [di, dj] of dirs) {
      if (
        input[i + di]?.[j + dj] === undefined ||
        visisted[i + di]?.[j + dj] ||
        input[i + di][j + dj] > input[i][j] + 1
      ) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
      // end for
    }

    visisted[i] = visisted[i] ?? [];
    visisted[i][j] = 1;
  }
};

let min = +Infinity;

for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[0].length; y++) {
    if (input[x][y] === 1) {
      const steps = searchPath(x, y);
      if (steps) {
        min = Math.min(steps, min);
      }
    }
  }
}

console.log('out', min);
