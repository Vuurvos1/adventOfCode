import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

input = input.map((input) => input.split('').map(Number));
// console.log(input);

let out = 0;

for (let y = 1; y < input.length - 1; y++) {
  for (let x = 1; x < input[0].length - 1; x++) {
    let tree = input[y][x];

    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;

    // up
    for (let i = y - 1; i >= 0; i--) {
      top++;
      if (input[i][x] >= tree) {
        break;
      }
    }

    for (let i = y + 1; i < input.length; i++) {
      bottom++;
      if (input[i][x] >= tree) {
        break;
      }
    }

    // left
    for (let i = x - 1; i >= 0; i--) {
      left++;
      if (input[y][i] >= tree) {
        break;
      }
    }

    // right
    for (let i = x + 1; i < input[0].length; i++) {
      right++;
      if (input[y][i] >= tree) {
        break;
      }
    }

    const score = top * bottom * left * right;
    // console.log(x, y, { top, bottom, left, right });

    if (score > out) {
      out = score;
    }
  }
}

console.log('out', out);
