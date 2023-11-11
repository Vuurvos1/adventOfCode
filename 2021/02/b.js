import fs from 'node:fs';

const input = fs.readFileSync('./2021/02/input.txt', 'utf8').trim().split('\n');

const pos = { x: 0, y: 0, aim: 0 };

for (const instruction of input) {
  const [dir, num] = instruction.split(' ');
  const n = Number(num);

  if (dir === 'forward') {
    pos.x += n;
    pos.y += pos.aim * n;
  }

  if (dir === 'down') {
    pos.aim += n;
  }

  if (dir === 'up') {
    pos.aim -= n;
  }
}

console.log(pos.x * pos.y);
