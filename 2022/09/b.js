import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let head = { x: 0, y: 0 };
let points = new Array(10).fill(0).map((p) => {
  return { x: 0, y: 0 };
});

const moveSet = new Set();
moveSet.add(`${head.x},${head.y}`);

const moveTail = (points) => {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    const h = i > 1 ? points[i - 1] : head;

    // touching
    if (Math.abs(h.x - point.x) < 2 && Math.abs(h.y - point.y) < 2) return;

    point.x += Math.sign(h.x - point.x);
    point.y += Math.sign(h.y - point.y);
  }

  moveSet.add(`${points[points.length - 1].x},${points[points.length - 1].y}`);
};

for (const move of input) {
  let [dir, amount] = move.split(' ');
  amount = Number(amount);

  for (let i = 0; i < amount; i++) {
    if (dir === 'U') {
      head.y++;
    } else if (dir === 'D') {
      head.y--;
    } else if (dir === 'L') {
      head.x--;
    } else {
      head.x++; // right
    }

    moveTail(points);
  }
}

console.log('out', moveSet.size);
