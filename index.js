import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

// input = input.map((input) => input.split('').map(Number));
// console.log(input);

let out = 0;

for (let i = 0; i < input.length; i++) {}

console.log('out', 0);
