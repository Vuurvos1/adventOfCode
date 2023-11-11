import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  const coords = input.map((row) => row.split('').map((num) => Number(num)));

  // console.log(coords);

  let out = 0;
  for (let x = 0; x < coords.length; x++) {
    for (let y = 0; y < coords[x].length; y++) {
      const coord = coords[x][y];

      // console.log(coord);

      const up = x < coords.length - 1 ? coords[x + 1][y] : +Infinity;
      const down = x > 0 ? coords[x - 1][y] : +Infinity;
      const left = y > 0 ? coords[x][y - 1] : +Infinity;
      const right = y < coords[0].length - 1 ? coords[x][y + 1] : +Infinity;

      // console.log(coord);
      if (up > coord && down > coord) {
        // console.log('x');
        if (left > coord && right > coord) {
          // console.log(x, y, coord);

          out += 1 + coord;
        }
      }
    }
  }

  return out;
}

console.log(await main());
