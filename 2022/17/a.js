import fs from 'node:fs';

const input = fs.readFileSync('input.txt', 'utf8').split('').slice(0, -1);
console.log(input.length, input.slice(-10));

let pieceIndex = 0;

const pieces = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [2, 2],
    [2, 1],
    [2, 0],
    [1, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
];

// const pieces = [
//   ['####'],
//   ['.#.', '###', '.#.'],
//   ['###', '..#', '..#'],
//   ['#', '#', '#', '#'],
//   ['##', '##'],
// ];

const piecePos = { x: 0, y: 0 }; // 0, 0 left bottom

let topStack = 0;
const cave = [];

const collision = (pos, piece) => {
  // oob
  if (pos.x < 0 || pos.y < 0) {
    console.log('wall / floor oob');
    return true;
  }

  // if (pos.x + piece[0].length > 7) {
  //   return true;
  // }

  // stone coll
  for (let i = piece.length - 1; i >= 0; i--) {
    const [x, y] = piece[i];
    // this right wall collision was the cause of all my problems :*(
    if (pos.x + x > 6) {
      console.log('wall oob');
      return true;
    }

    if (cave[pos.y + y][pos.x + x] === '#') {
      console.log('hit rock');
      return true;
    }
  }

  return false;
};

let i = 0;
for (let j = 0; j < 2022; j++) {
  // for (let j = 0; j < 2; j++) {
  piecePos.x = 2;
  piecePos.y = topStack + 3;

  // console.log(piecePos);

  // add 3 rows + piece height row

  for (let k = 0; cave.length < topStack + 3 + pieces[pieceIndex].length; k++) {
    cave.push(new Array(7).fill('.'));
  }

  while (true) {
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

    // console.log(i);
    i = (i + 1) % input.length;

    // i++;
    // if (i > input.length - 1) {
    //   i = 0;
    // }
    // console.log(i);

    // const caveCopy = JSON.parse(JSON.stringify(cave));
    // for (let k = 0; k < 4; k++) {
    //   caveCopy[piecePos.y][piecePos.x + k] = '@';
    // }

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
        const [x, y] = piece[i];
        cave[piecePos.y + y][piecePos.x + x] = '#';
        // for (let j = 0; j < piece[0].length; j++) {
        // console.log(i, j);
        // if (piece[i][j] === '#') {
        //   cave[piecePos.y + i][piecePos.x + j] = '#';
        // }
        // }
      }

      // console.log(piece);
      // topStack = piecePos.y + piece.length;
      topStack = cave.filter((row) => row.includes('#')).length;

      pieceIndex = (pieceIndex + 1) % pieces.length;
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

console.log(
  cave.filter((row) => row.includes('#')).length
  // topStack + 3,
  // cave.length - 3
);
