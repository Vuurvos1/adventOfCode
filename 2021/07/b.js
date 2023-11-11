import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  const crabs = input[0].split(',').map((num) => Number(num));

  const max = Math.max(...crabs);

  let min = +Infinity;
  for (let i = 0; i < crabs.length; i++) {
    let moves = 0;
    for (let j = 0; j < crabs.length; j++) {
      // part 1
      // moves += Math.abs(crabs[i] - crabs[j]);

      // for part 2
      let tmp = 0;
      for (let x = 0; x < Math.abs(i - crabs[j]) + 1; x++) {
        moves += x;
      }
    }

    if (moves < min) {
      min = moves;
    }
  }

  console.log('done');

  return min;
}

console.log(await main());
