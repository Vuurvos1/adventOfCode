import { generate2dArray, loop2dArrayPart, loop2dArray, log2dArray } from 'lib';
import fs from 'node:fs';

const input = fs.readFileSync('./2015/6/input.txt', 'utf8').trim().split('\n');

const lights = generate2dArray(1000, 1000, false);

for (const line of input) {
  if (line.startsWith('turn on')) {
    const coords = getCoords(line.slice(8));

    loop2dArrayPart(
      lights,
      coords[0][0],
      coords[0][1],
      coords[1][0] + 1,
      coords[1][1] + 1,
      (light, x, y) => {
        lights[x][y] = true;
      }
    );
  }
  if (line.startsWith('turn off')) {
    const coords = getCoords(line.slice(9));
    loop2dArrayPart(
      lights,
      coords[0][0],
      coords[0][1],
      coords[1][0] + 1,
      coords[1][1] + 1,
      (light, x, y) => {
        lights[x][y] = false;
      }
    );
  }
  if (line.startsWith('toggle')) {
    const coords = getCoords(line.slice(7));
    loop2dArrayPart(
      lights,
      coords[0][0],
      coords[0][1],
      coords[1][0] + 1,
      coords[1][1] + 1,
      (light, x, y) => {
        lights[x][y] = !lights[x][y];
      }
    );
  }
}

let onCount = 0;
loop2dArray(lights, (light, x, y) => {
  if (light) onCount++;
});
console.log(onCount);

// console.log(log2dArray(lights));

// 669266 high
// 622893 high
// 56845 low
// 377891

function getCoords(str) {
  const tmp = str.split(' ');
  const startCords = tmp[0].split(',').map(Number);
  const endCords = tmp[2].split(',').map(Number);

  return [startCords, endCords];
}
