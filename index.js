import fs from 'node:fs';
const rawInput = fs.readFileSync('input.txt', 'utf8');
const input = rawInput.trimEnd().split('\n');

console.log('end', 0);
