import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let cycles = 0;
let x = 1;
let crt = Array(6).fill(''); // 6 x 40

for (const instruction of input) {
  let line = Math.floor(cycles / 40);
  let index = cycles % 40;

  crt[line] += Math.abs(index - x) < 2 ? '#' : '.'; // 1 +/- around sprite
  cycles++;

  if (instruction.includes('add')) {
    let [_, numb] = instruction.split(' ');

    let line = Math.floor(cycles / 40);
    let index = cycles % 40;

    crt[line] += Math.abs(index - x) < 2 ? '#' : '.';

    cycles++;
    x += Number(numb);
  }
}

console.log(crt);
