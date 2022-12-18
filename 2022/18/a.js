import fs from 'node:fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\n').slice(0, -1);
// console.log(input.length);

const size = 50;

const space = [];
for (let i = 0; i < size; i++) {
  const tmp = [];
  for (let j = 0; j < size; j++) {
    tmp.push(new Array(size).fill(false));
  }

  space.push(tmp);
}

for (const inp of input) {
  // console.log(inp);
  const [x, y, z] = inp.split(',');
  space[Number(x)][Number(y)][Number(z)] = true;
}

// console.log(space);

let sides = 0;

for (let i = 0; i < size; i++) {
  // const tmp = [];
  for (let j = 0; j < size; j++) {
    // tmp.push(new Array(1000).fill(false));
    for (let k = 0; k < size; k++) {
      if (!space[i][j][k]) continue;

      if (!space?.[i + 1]?.[j]?.[k]) {
        sides++;
      }

      if (!space?.[i - 1]?.[j]?.[k]) {
        sides++;
      }

      if (!space?.[i]?.[j + 1]?.[k]) {
        sides++;
      }

      if (!space?.[i]?.[j - 1]?.[k]) {
        sides++;
      }

      if (!space?.[i]?.[j]?.[k + 1]) {
        sides++;
      }

      if (!space?.[i]?.[j]?.[k - 1]) {
        sides++;
      }
    }
  }
}

console.log(sides);
