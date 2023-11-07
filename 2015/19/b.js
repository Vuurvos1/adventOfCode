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

// console.log(Object.keys(replacements).length, inputReplacements.length);

let molecule = input[1];

// const combinations = new Set();
// const chunks = molecule.split(/(?=[A-Z])/);

const repl = Object.entries(replacements).sort(
  (a, b) => b[0].length - a[0].length
);

// console.log(repl);

// TODO: search for shortest molecule
for (let i = 0; i < 100_000; i++) {
  if (molecule === 'e') {
    console.log(i);
    break;
  }

  for (const [key, value] of repl) {
    if (molecule.includes(key)) {
      // console.log(molecule, key, value);
      molecule = molecule.replace(key, value);
    }
  }
}

// 19 not it?
