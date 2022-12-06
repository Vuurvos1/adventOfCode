import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile;

for (let i = 0; i < input.length; i++) {
  const slice = input.slice(i, i + 14);
  const set = new Set(slice);

  if (set.size == 14) {
    console.log(i + 14);
    break;
  }
}

let out = 0;

console.log(out);
