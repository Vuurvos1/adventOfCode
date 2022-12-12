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

const searchPath = () => {
  let queue = [{ pos: [pos.i, pos.j], steps: 0 }];
  // const visited = new Set();
  const visisted = [];
  // const{ pos: start, steps: 0 }

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
      console.log(steps);
      break;
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
      // console.log('push');
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
      // end for
    }

    visisted[i] = visisted[i] ?? [];
    visisted[i][j] = 1;
  }
};

searchPath();
