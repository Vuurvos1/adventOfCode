import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

input = input.map((input) => input.split('').map(Number));
console.log(input);

let out = 0;

for (let x = 1; x < input.length - 1; x++) {
  for (let y = 1; y < input[0].length - 1; y++) {
    let tree = input[x][y];
    let visible = true;

    let top = true;
    let bottom = true;
    let left = true;
    let right = true;

    // console.log(x, y);

    // up
    for (let i = y - 1; i >= 0; i--) {
      // console.log(x, i);
      if (input[x][i] >= tree) {
        top = false;
        visible = false;
        // break;
      }
    }

    // if (visible) {
    //   console.log('see up', x, y);
    //   // out++;
    //   // break;
    // }

    // visible = true;

    // down
    for (let i = y + 1; i < input.length; i++) {
      if (input[x][i] >= tree) {
        visible = false;
        bottom = false;
        break;
      }
    }

    // if (visible) {
    //   out++;
    //   // break;
    // }

    // visible = true;

    // left
    for (let i = x - 1; i >= 0; i--) {
      if (input[i][y] >= tree) {
        visible = false;
        left = false;
        break;
      }
    }

    // if (visible) {
    //   out++;
    //   // break;
    // }

    // visible = true;

    // right
    for (let i = x + 1; i < input[0].length; i++) {
      if (input[i][y] >= tree) {
        visible = false;
        right = false;
        break;
      }
    }

    // console.log(x, y, top, bottom, left, right);

    if (top || bottom || left || right) {
      out++;
    }

    // console.log('finish', visible);

    // console.log(x, y);
  }
}

out += input.length * 2;
out += input[0].length * 2 - 4;

console.log('out', out);
