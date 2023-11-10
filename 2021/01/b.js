import fs from 'node:fs';

const input = fs
  .readFileSync('./2021/01/input.txt', 'utf8')
  .trim()
  .split('\n')
  .map(Number);

let count = 0;

for (let i = 0; i < input.length; i++) {
  const v1 = input[i] + input[i + 1] + input[i + 2];
  const v2 = input[i + 1] + input[i + 2] + input[i + 3];

  if (v1 < v2) count++;
}

console.log(count);
