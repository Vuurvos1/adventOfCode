import fs from 'node:fs';
const rawInput = fs.readFileSync('input.txt', 'utf8');
let input = rawInput.trim().split('\n');

// (5 ^ pos) ^ input
// 0, 25, 125, 625 ...

const lookup = {
  2: 2,
  1: 1,
  0: 0,
  '-': -1,
  '=': -2,
};

function SNAFUtoNum(s) {
  let power = 0;
  let out = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    out += Math.pow(5, power) * lookup[s[i]];
    power++;
  }

  return out;
}

const unit = ['=', '-', '0', '1', '2'];
function NumtoSNAFU(num) {
  let out = '';

  while (num > 0) {
    const d = (num + 2) % 5;
    num = Math.floor((num + 2) / 5);
    out = unit[d] + out;
  }

  return out;
}

const sum = input.reduce((prev, curr) => prev + SNAFUtoNum(curr), 0);
console.log('sum', sum);

console.log(NumtoSNAFU(sum));
