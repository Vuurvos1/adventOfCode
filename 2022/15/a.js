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
const beacons = [];

let minX = 0;
let maxX = 0;

for (const inp of input) {
  let split = inp.split(' ');
  points.push({ x: extractNum(split[2]), y: extractNum(split[3]) });
  beacons.push({ x: extractNum(split[8]), y: extractNum(split[9]) });
}

const intrestPoint = new Set([
  ...points.map((point) => `${point.x},${point.y}`),
  ...beacons.map((beacon) => `${beacon.x},${beacon.y}`),
]);

for (let i = 0; i < points.length; i++) {
  points[i].dist = manhattanDist(points[i], beacons[i]);

  minX = Math.min(minX, points[i].x - points[i].dist - 1);
  maxX = Math.max(maxX, points[i].x + points[i].dist + 1);
}

let out = 0;

const y = points.length < 15 ? 10 : 2000000;
for (let x = minX - 1; x < maxX + 1; x++) {
  let inRange = false;
  if (intrestPoint.has(`${x},${y}`)) continue;

  for (const point of points) {
    // subtract beacons and sensors
    let distance = manhattanDist(point, { x, y });

    if (distance <= point.dist) {
      inRange = true;
      break;
    }
  }
  if (inRange) {
    out++;
  }
}

console.log('out', out);
