import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

input = input.map((input) => input.split('').map(Number));
console.log(input);

let out = 0;

for (let y = 1; y < input.length - 1; y++) {
  for (let x = 1; x < input[0].length - 1; x++) {
    let tree = input[x][y];

    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;

    console.log(x, y);

    // up
    let tmp = 1;
    for (let i = y - 1; i >= 0; i--) {
      console.log(x, i);
      tmp++;
      if (input[x][i] >= tree) {
        console.log(x, y, i, tmp);
        // top = false;
        top = tmp;
        // visible = false;
        break;
      }
    }

    // if (visible) {
    //   console.log('see up', x, y);
    //   // out++;
    //   // break;
    // }

    // visible = true;

    // // down
    tmp = 1;
    for (let i = y + 1; i < input.length; i++) {
      tmp++;

      if (input[x][i] >= tree) {
        // visible = false;
        // bottom = false;
        bottom = tmp;
        break;
      }
    }

    // // if (visible) {
    // //   out++;
    // //   // break;
    // // }

    // // visible = true;

    // left
    tmp = 1;
    for (let i = x - 1; i >= 0; i--) {
      tmp++;
      if (input[i][y] >= tree) {
        // visible = false;
        // left = false;
        left = tmp;
        break;
      }
    }

    // // if (visible) {
    // //   out++;
    // //   // break;
    // // }

    // // visible = true;

    // // right
    // for (let i = x + 1; i < input[0].length; i++) {
    //   if (input[i][y] >= tree) {
    //     // visible = false;
    //     // right = false;
    //     right = i - x;
    //     break;
    //   }
    // }

    let score = top * bottom * left * right;
    console.log(x, y, top, bottom, left, right, score);

    if (score > out) {
      out = score;
    }
    // if (top || bottom || left || right) {
    //   out++;
    // }

    // console.log('finish', visible);

    // console.log(x, y);
  }
}

// out += input.length * 2;
// out += input[0].length * 2 - 4;

console.log('out', out);
