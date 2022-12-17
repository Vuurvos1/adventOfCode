import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = inputFile.split('\n').slice(0, -1);
// console.log(input.length);

console.log('out', 0);
