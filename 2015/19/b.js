import fs from 'node:fs';
import * as lib from 'lib';

const input = fs
  .readFileSync('./2015/19/input.txt', 'utf8')
  .trim()
  .split('\n\n');

const inputReplacements = input[0].split('\n');
/** @type {Record<string,string[]>} */
const replacements = {};
for (const input of inputReplacements) {
  const split = input.split(' => ');
  if (!replacements[split[0]]) {
    replacements[split[0]] = [split[1]];
  } else {
    replacements[split[0]].push(split[1]);
  }
}

const molecule = input[1];

const combinations = new Set();

const chunks = molecule.split(/(?=[A-Z])/);

// TODO: search for shortest molecule
// for (let i = 0; i < chunks.length; i++) {
//   const chunk = chunks[i];

//   if (!replacements[chunk]) continue;

//   const copy = [...chunks];
//   for (const atom of replacements[chunk]) {
//     copy[i] = atom;
//     combinations.add(copy.join(''));
//   }
// }

console.log(combinations.size);
