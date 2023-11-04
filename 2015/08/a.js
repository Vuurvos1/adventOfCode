import fs from 'node:fs';

const input = fs.readFileSync('./2015/8/input.txt', 'utf8').trim().split('\n');

const result = input.reduce((acc, line) => {
  return acc + line.length - eval(line).length;
}, 0);

console.log(result);
