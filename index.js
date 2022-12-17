import fs from 'node:fs';

const input = fs.readFileSync('input.txt', 'utf8').split('').slice(0, -1);
console.log(input.length);

let pieceIndex = 0;
const pieces = [
  ['####'],
  ['.#.', '###', '.#.'],
  ['###', '..#', '..#'],
  ['#', '#', '#', '#'],
  ['##', '##'],
];
const piecePos = { x: 0, y: 0 }; // 0, 0 left bottom

let topStack = 0;
const cave = [];

const collision = (pos, piece) => {
  // oob
  if (pos.x < 0 || pos.y < 0) {
    return true;
  }

  if (pos.x + piece[0].length > 7) {
    return true;
  }

  // stone coll
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[0].length; j++) {
      // console.log(cave, pos, i, j);
      if (piece[i][j] === '#' && cave[pos.y + i][pos.x + j] === '#') {
        return true;
      }
    }
  }

  return false;
};

let i = 0;
// for (let j = 0; j < 2024; j++) {
for (let j = 0; j < 10; j++) {
  piecePos.x = 2;
  piecePos.y = topStack + 3;

  // console.log(piecePos);

  // add 3 rows + piece height row

  for (let k = 0; cave.length < topStack + 3 + pieces[pieceIndex].length; k++) {
    cave.push(new Array(7).fill('.'));
  }

  while (true) {
    // const caveCopy = JSON.parse(JSON.stringify(cave));
    // for (let k = 0; k < 4; k++) {
    //   caveCopy[piecePos.y][piecePos.x + k] = '@';
    // }

    // console.log(piecePos.y);
    if (input[i] === '>') {
      // console.log('right');
      piecePos.x++;
      if (collision(piecePos, pieces[pieceIndex])) {
        piecePos.x--;
      }
    } else if (input[i] === '<') {
      // console.log('left');
      piecePos.x--;
      if (collision(piecePos, pieces[pieceIndex])) {
        piecePos.x++;
      }
    }

    i++;
    if (i > input.length - 1) i = 0;
    // console.log(i);

    const caveCopy = JSON.parse(JSON.stringify(cave));
    for (let k = 0; k < 4; k++) {
      caveCopy[piecePos.y][piecePos.x + k] = '@';
    }

    // console.log(
    //   caveCopy
    //     // .reverse()
    //     // .splice(-100, 100)
    //     .map(
    //       (x, i) =>
    //         `|y=${i.toString().padStart(4, '0')}|${x.join(
    //           ''
    //         )}| some filler to wrap text`
    //     )
    // );

    piecePos.y--;
    if (collision(piecePos, pieces[pieceIndex])) {
      // set piece
      piecePos.y++;

      const piece = pieces[pieceIndex];

      // console.log('set at', piecePos);
      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[0].length; j++) {
          // console.log(i, j);
          if (piece[i][j] === '#') {
            cave[piecePos.y + i][piecePos.x + j] = '#';
          }
        }
      }

      // console.log(piece);
      topStack = piecePos.y + piece.length;

      pieceIndex++;
      if (pieceIndex > pieces.length - 1) pieceIndex = 0;
      break;
    } else {
      //
    }
  }
}

// 3229 high
// 2948 low

// cave[3][2] = 'X';

console.log(
  cave
    // .reverse()
    // .splice(-100, 100)
    .map(
      (x, i) =>
        `|y=${i.toString().padStart(4, '0')}|${x.join(
          ''
        )}| some filler to wrap text`
    )
);
console.log(cave.filter((row) => row.includes('#')).length);
