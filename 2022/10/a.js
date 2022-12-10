import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let cycles = 0;
let x = 1;
let out = 0;

const testCycle = () => {
  if ((cycles - 20) % 40 === 0) {
    out += cycles * x;
  }
};

for (const instruction of input) {
  cycles += 1;
  testCycle();

  if (instruction.includes('add')) {
    let [inst, numb] = instruction.split(' ');

    cycles += 1;
    testCycle();

    x += Number(numb);
  }
}

console.log('out', out);
