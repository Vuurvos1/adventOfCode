import * as lib from 'lib';

const size = 3030;

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

// const codes = new Uint32Array(size * size);
// codes[0] = 20151125;
// for (let i = 1; i < codes.length - 1; i++) {
//   codes[i] = (codes[i - 1] * 252533) % 33554393;
// }
// there might be a way to directly lookup the value in the array

// TODO: further optimize?

console.time('e');
let last = 20151125;
let output;
for (let i = 0; i < size * size; i++) {
  for (let row = 0; row < i + 1; row++) {
    if (row === 3029 - 1 && i - row === 2947 - 1) {
      output = last;
      break;
    }

    last = (last * 252533) % 33554393;
  }

  if (output) break;
}
console.timeEnd('e');

// Enter the code at row 2947, column 3029.
// col - row
console.log('out', output); // paper is 1 indexed
// 19980801
