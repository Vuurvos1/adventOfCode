import fs from 'node:fs';

const input = fs
  .readFileSync('./2015/19/input.txt', 'utf8')
  .trim()
  .split('\n\n');

const inputReplacements = input[0].split('\n');
/** @type {Record<string,string[]>} */
const replacements = {};

for (const input of inputReplacements) {
  const split = input.split(' => ');
  replacements[split[1]] = split[0];
}

let molecule = input[1];

const repl = Object.entries(replacements).sort(
  (a, b) => b[0].length - a[0].length
);

console.time('e');
let repls = 0;
while (molecule !== 'e') {
  for (const [key, value] of repl) {
    if (molecule.includes(key)) {
      molecule = molecule.replace(key, value);
      repls++;
    }
  }
}
console.timeEnd('e');

console.log(molecule, repls);
