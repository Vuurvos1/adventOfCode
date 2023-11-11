import fs from 'node:fs';

const input = fs.readFileSync('./2021/02/input.txt', 'utf8').trim().split('\n');

const pos = { x: 0, y: 0 };

for (const instruction of input) {
  const [dir, num] = instruction.split(' ');
  const n = Number(num);

  if (dir === 'forward') {
    pos.x += n;
  }

  if (dir === 'down') {
    pos.y += n;
  }

  if (dir === 'up') {
    pos.y -= n;
  }
}

console.log(pos.x * pos.y);
