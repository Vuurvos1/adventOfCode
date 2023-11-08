import * as lib from 'lib';

// /**
//  * @param {number} row
//  * @param {number} column
//  */
// function getIndex(row, column) {
//   let index = 0;

//   for (let i = 0; i < column; i++) {
//     index += i;
//   }
//   index += column;

//   for (let i = 0; i < row + 1; i++) {
//     index += i;
//   }

//   return index;
// }

// console.log(getIndex(6, 1), getIndex(1, 6), getIndex(3, 3));

const size = 3030;

// const codes = new Uint32Array(size * size);
// codes[0] = 20151125;
// for (let i = 1; i < codes.length - 1; i++) {
//   codes[i] = (codes[i - 1] * 252533) % 33554393;
// }
// there might be a way to directly lookup the value in the array

// TODO: optimize
const paper = lib.generate2dArray(size, size);
paper[0][0] = 20151125;

let index = 0;
let last = 20151125;
for (let i = 0; i < size * size; i++) {
  for (let row = 0; row < i + 1; row++) {
    // if (index % 1_000_000 === 0) console.log(index);

    if (row < size && i - row < size) paper[row][i - row] = last;
    index++;
    last = (last * 252533) % 33554393;

    if (paper[3029 - 1][2947 - 1]) break; // break out early or this will take ages to fill the entire grid
  }
}

// Enter the code at row 2947, column 3029.

// col - row
console.log(paper[3029 - 1][2947 - 1]); // paper is 1 indexed
