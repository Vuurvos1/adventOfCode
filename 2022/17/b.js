import fs from 'node:fs';

const input = fs.readFileSync('input.txt', 'utf8').split('').slice(0, -1);
// console.log(input.length);

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
    return true;
  }

  // stone coll
  for (let i = piece.length - 1; i >= 0; i--) {
    const [x, y] = piece[i];
    // this right wall collision was the cause of all my problems :*(
    if (pos.x + x > 6) {
      return true;
    }

    if (cave[pos.y + y][pos.x + x] === '#') {
      return true;
    }
  }

  return false;
};

// get cycle length
// simulate 1 mod floor of 1_000_000_000_000
// then simulate last bit to get to total

// const out = [['index', 'height']];
const out = [];

let i = 0;
for (let j = 0; j < 52; j++) {
  // for (let j = 0; j < 2; j++) {

  out.push(topStack);

  piecePos.x = 2;
  piecePos.y = topStack + 3;
  // console.log(piecePos);

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

    i = (i + 1) % input.length;

    piecePos.y--;
    if (collision(piecePos, pieces[pieceIndex])) {
      // set piece
      piecePos.y++;

      const piece = pieces[pieceIndex];

      // console.log('set at', piecePos);
      for (let i = 0; i < piece.length; i++) {
        const [x, y] = piece[i];
        cave[piecePos.y + y][piecePos.x + x] = '#';
      }

      // very ineficcient but okey
      // topStack = cave.filter((row) => row.includes('#')).length;

      topStack = Math.max(
        topStack,
        piecePos.y +
          +pieces[pieceIndex].reduce(
            (prev, curr) => Math.max(prev, curr[1] + 1),
            0
          )
      );

      pieceIndex = (pieceIndex + 1) % pieces.length;
      break;
    }
  }

  if ((j - 38) % 1735 == 0) {
    console.log(topStack, j);
  }
}

console.log(topStack);

// console.log(
//   cave.map(
//     (x, i) =>
//       `|y=${i.toString().padStart(4, '0')}|${x.join(
//         ''
//       )}| some filler to wrap text`
//   )
// );

// fs.writeFileSync(
//   'tmp.txt',
//   cave
//     .map((x, i) => `|y=${i.toString().padStart(4, '0')}|${x.join('')}|`)
//     .join('\n')
// );

// const res = out.reduce((prev, curr) => prev + Number(curr[1]), 0);
// console.log(topStack / 2_000_000);

// const sectionSum = (part) => {
//   return part.reduce((), 0)
// }

// after plotting the first million itterations the data looked linear
// so a cycle must be present

// console.log(out);

// find repeating
// range size
// for (let i = 1; i < 10000; i++) {
//   let patern = false;
//   // start offset
//   for (let j = 0; j < i - 1; j++) {
//     const sums = [];
//     // start test range
//     for (let k = 0; k < 20; k++) {
//       const start = i * k + j;
//       const end = start + i;

//       sums.push(out[end] - out[start]);
//     }

//     // console.log(sums);
//     if (sums.filter((val) => val == sums[0]).length == 20) {
//       // console.log(start, end, out.slice(start, end));
//       console.log('pattern at', i, j, sums, out[j], out[i + j]);
//       patern = true;
//       break;
//       // return;
//     }

//     // console.log('end');

//     // get 5 sections of length and check value
//   }

//   if (patern) {
//     break;
//   }
// }

// for (let i = 1; i < 10000; i++) {
//   let br = false;
//  for (let j = 0; j < 100000; j++) {

//  }

//  if (br) return
// }

// 2695

// let prev = 0;
// for (let i = 0; i < 5; i++) {
//   console.log(out[i * 1697 + 3], out[i * 1697 + 3] - prev);
//   prev = out[i * 1697 + 3];
// }

// height before pattern (i 52)
// cycle length/repeat length 1735
// missing bit 52 + 102 > 242
// 242

// Math.floor((1000000000000 - 38) / 1735) = 576368876
// (1000000000000 - 38) % 1735 = 102
// 242 - 76 = 166
// 576368876 * 2695 + 242

// console.log(out.reduce((prev, curr) => prev + curr, 0) / 1_000_000);

// fs.writeFileSync('tmp.txt', cave.map((x) => x.join('')).join('\n'));
// fs.writeFileSync('tmp.txt', topStack.toString());
// fs.writeFileSync('tmp.csv', out.map((x) => x.join(',')).join('\n'));

// 1553324500000 // high
// 1553314121062 // high
// 1553314121019 < winner I semi forgot how I got here

console.log('done');
// console.log(cave.filter((row) => row.includes('#')).length, topStack);
