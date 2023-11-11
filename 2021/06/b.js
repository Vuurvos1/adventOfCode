import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  const fish = input[0].split(',').map((num) => Number(num));

  // for (let i = 0; i < 80; i++) {
  //   // do fish calculations for every fish
  //   const len = fish.length;
  //   for (let j = 0; j < len; j++) {
  //     fish[j]--;

  //     if (fish[j] <= -1) {
  //       fish.push(8);
  //       fish[j] = 6;
  //     }
  //   }
  // }

  // part 2, data grouping

  const fishGroups = new Array(9).fill(0);
  for (let i = 0; i < fish.length; i++) {
    fishGroups[fish[i]]++;
  }
  console.log(fishGroups);

  for (let i = 0; i < 256; i++) {
    // do stuff to the fish
    // shift everything forward and add 0th index of items to end of array
    const babies = fishGroups.shift();
    fishGroups.push(babies);
    fishGroups[6] += babies;
  }

  let out = 0;
  return fishGroups.reduce((prev, curr) => prev + curr);
}

console.log(await main());
