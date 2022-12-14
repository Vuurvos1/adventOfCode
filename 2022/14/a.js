import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile
  .split('\n')
  .slice(0, -1)
  .map((el) => el.split(' -> ').map((el) => el.split(',').map(Number)));

// console.log(input);

const cave = [];

for (let i = 0; i < 1000; i++) {
  cave.push(new Array(1000).fill('.'));
}

let maxY = 0;

for (const coords of input) {
  for (let k = 0; k < coords.length - 1; k++) {
    const [fromX, fromY] = coords[k];
    const [toX, toY] = coords[k + 1];

    maxY = Math.max(toY, fromY, maxY);

    const startX = Math.min(fromX, toX);
    const endX = Math.max(fromX, toX) + 1;

    const startY = Math.min(fromY, toY);
    const endY = Math.max(fromY, toY) + 1;

    // drawing lines
    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        cave[x][y] = '#';
      }
    }
  }
}

// let preview = [];
// for (let i = 495; i < 504; i++) {
//   let tmp = [];
//   for (let j = 0; j < 10; j++) {
//     tmp.push(cave[i][j]);
//   }

//   preview.push(tmp);
// }

// console.log(preview.map((el) => el.join('')));

// simulation
for (let i = 0; i < 100000; i++) {
  const pos = { x: 500, y: 0 };
  let moved = true;
  while (true) {
    if (cave[pos.x][pos.y + 1] == '.') {
      pos.y++;
    } else if (cave[pos.x - 1][pos.y + 1] == '.') {
      pos.x--;
      pos.y++;
    } else if (cave[pos.x + 1][pos.y + 1] == '.') {
      pos.x++;
      pos.y++;
    } else if (pos.y > maxY) {
      moved = false;
      console.log('to big');
      break;
    } else {
      // can't move
      // console.log('sand', pos.x, pos.y);
      cave[pos.x][pos.y] = 'o';
      break;
    }
  }

  if (!moved) {
    console.log(i);
    break;
  }
}
