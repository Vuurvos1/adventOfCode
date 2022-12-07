import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let out = 0;

console.log(out);
