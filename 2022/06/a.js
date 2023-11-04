import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile;

for (let i = 0; i < input.length - 4; i++) {
  if (
    input.charAt(i) != input.charAt(i + 1) &&
    input.charAt(i) != input.charAt(i + 2) &&
    input.charAt(i) != input.charAt(i + 3) &&
    input.charAt(i + 1) != input.charAt(i + 2) &&
    input.charAt(i + 1) != input.charAt(i + 3) &&
    input.charAt(i + 2) != input.charAt(i + 3)
  ) {
    console.log(i + 4, input.charAt(i));
    break;
  }
}

let out = 0;

console.log(out);
