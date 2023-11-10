const size = 3030;

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
