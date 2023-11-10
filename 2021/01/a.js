import fs from 'node:fs';

const input = fs
  .readFileSync('./2021/01/input.txt', 'utf8')
  .trim()
  .split('\n')
  .map(Number);

let count = 0;

for (let i = 1; i < input.length; i++) {
  if (input[i] > [input[i - 1]]) count++;
}

console.log(count);
