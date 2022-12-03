import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  let input = inputFile.split('\n').slice(0, -1);

  let out = 0;

  return out;
}

console.log(await main());
