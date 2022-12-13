import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n\n').slice(0, -1);

console.log(input);

console.log('out', 0);
