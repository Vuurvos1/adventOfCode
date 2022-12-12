import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);
input = input.map((input) => input.split(''));

// console.log(input);

const pos = { i: 0, j: 0 };
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === 'S') {
      pos.i = i;
      pos.j = j;
      break;
    }
  }
}

console.log(pos);

// const start  =

let visisted;

// const canGo = (curr, target) => {};

// const move = (pos, move, max) => {
//   move++;

//   if (pos === 'E') {
//     best = Math.min(move, best);
//   }

//   // if can go up

//   // move()
//   // if can go left
//   // if can go right
//   // if can go down

//   return best;
// };
// console.log(input);

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

    if (input[i][j] === 'E') {
      console.log(steps);
      break;
    }

    // for each dir
    for (const [di, dj] of dirs) {
      console.log(
        input[i + di]?.[j + dj]?.charCodeAt(0),
        input[i][j].charCodeAt(0) + 1,
        input[i + di]?.[j + dj] === undefined,
        input[i + di]?.[j + dj] > input[i][j] + 1,
        visisted[i + di]?.[j + dj]
      );
      if (
        input[i + di]?.[j + dj] === undefined ||
        input[i + di][j + dj] > input[i][j] + 1 ||
        visisted[i + di]?.[j + dj]
      ) {
        continue;
      }
      console.log('while');
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
      // end for
    }

    visisted[i] = visisted[i] ?? [];
    visisted[i][j] = 1;
  }
};

let out = 0;

searchPath();

// for (let i = 0; i < input.length; i++) {}

console.log('out', 0);
