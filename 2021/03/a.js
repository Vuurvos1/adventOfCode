import fs from 'node:fs';

const input = fs.readFileSync('./2021/03/input.txt', 'utf8').trim().split('\n');

let gammaRate = '';
let epsilonRate = '';

for (let i = 0; i < input[0].length; i++) {
  let zeroCount = 0;
  let oneCount = 0;
  for (const line of input) {
    if (line[i] === '0') zeroCount++;
    if (line[i] === '1') oneCount++;
  }

  if (zeroCount > oneCount) {
    gammaRate += '0';
    epsilonRate += '1';
  } else {
    gammaRate += '1';
    epsilonRate += '0';
  }
}

console.log(
  gammaRate,
  epsilonRate,
  eval('0b' + gammaRate) * eval('0b' + epsilonRate)
);
