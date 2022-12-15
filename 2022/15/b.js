import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

const extractNum = (str) => {
  if (str.includes('-')) return -Number(str.match(/\d/g).join(''));
  return Number(str.match(/\d/g).join(''));
};

const manhattanDist = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const points = []; // aka sensors

for (const inp of input) {
  let split = inp.split(' ');
  points.push({ x: extractNum(split[2]), y: extractNum(split[3]) });
}

const intersecting = (point) => {
  for (const sensor of points) {
    const d = manhattanDist(sensor, point);
    if (d <= sensor.dist) return true;
  }
  return false;
};

// for (let i = 0; i < 1; i++) {
for (const point of points) {
  // const point = { x: 10, y: 10, dist: 4 };

  // look around edge -> x y
  for (let y = point.y - point.dist - 1; y < point.y + point.dist + 2; y++) {
    if (!(y >= 0 && y <= 4000000)) continue;

    const delta = Math.abs(point.y - y);
    const invDelta = point.dist + 1 - delta;
    const x1 = point.x - invDelta;
    const x2 = point.x + invDelta;

    if (!(x1 >= 0 && x1 <= 4000000)) continue;
    if (!(x2 >= 0 && x2 <= 4000000)) continue;

    // test if coord isn't in range of any other point

    // x * 4000000 + y
    if (!intersecting({ x: x1, y })) {
      console.log(x1 * 4000000 + y);
      break;
    }

    if (!intersecting({ x: x2, y })) {
      console.log(x2 * 4000000 + y);
      break;
    }
  }
}

console.log('end loop');

// no shot lmao
// for (let x = 0; x < 4000000; x++) {
//   for (let y = 0; y < 4000000; y++) {
//     //
//   }
// }
