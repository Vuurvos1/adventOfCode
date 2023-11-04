import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
const moveSet = new Set();
moveSet.add(`${head.x},${head.y}`);

const moveTail = () => {
  // touching
  if (Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2) return;

  if (head.x == tail.x) {
    tail.y += Math.sign(head.y - tail.y);
  } else if (head.y == tail.y) {
    tail.x += Math.sign(head.x - tail.x);
  } else {
    // diagonal
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);
  }

  moveSet.add(`${tail.x},${tail.y}`);
};

for (const move of input) {
  let [dir, amount] = move.split(' ');
  amount = Number(amount);

  if (dir === 'U') {
    for (let i = 0; i < amount; i++) {
      head.y++;
      moveTail();
    }
  }

  if (dir === 'D') {
    for (let i = 0; i < amount; i++) {
      head.y--;
      moveTail();
    }
  }

  if (dir === 'L') {
    for (let i = 0; i < amount; i++) {
      head.x--;
      moveTail();
    }
  }

  if (dir === 'R') {
    for (let i = 0; i < amount; i++) {
      head.x++;
      moveTail();
    }
  }
}

console.log('out', moveSet.size);
