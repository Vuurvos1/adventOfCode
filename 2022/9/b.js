import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let head = { x: 0, y: 0 };

let points = new Array(10).fill(0).map((p) => {
  return { x: 0, y: 0 };
});

const moveSet = new Set();

const moveTail = (points) => {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    const h = i > 1 ? points[i - 1] : head;

    // touching
    if (Math.abs(h.x - point.x) < 2 && Math.abs(h.y - point.y) < 2) return;

    if (h.x == point.x) {
      point.y += Math.sign(h.y - point.y);
    } else if (h.y == point.y) {
      point.x += Math.sign(h.x - point.x);
    } else {
      // diagonal
      point.x += Math.sign(h.x - point.x);
      point.y += Math.sign(h.y - point.y);
    }
  }

  moveSet.add(`${points[points.length - 1].x},${points[points.length - 1].y}`);
};

for (const move of input) {
  let [dir, amount] = move.split(' ');
  amount = Number(amount);

  if (dir === 'U') {
    for (let i = 0; i < amount; i++) {
      head.y++;
      moveTail(points);
    }
  }

  if (dir === 'D') {
    for (let i = 0; i < amount; i++) {
      head.y--;
      moveTail(points);
    }
  }

  if (dir === 'L') {
    for (let i = 0; i < amount; i++) {
      head.x--;
      moveTail(points);
    }
  }

  if (dir === 'R') {
    for (let i = 0; i < amount; i++) {
      head.x++;
      moveTail(points);
    }
  }
}

console.log('out', moveSet.size + 1);
