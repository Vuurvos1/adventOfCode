/**
 * Generate a 2d array of size x by y
 *  @template T
 * @param {number} x
 * @param {number} y
 * @param {T} initial
 * @returns {T[][]}
 */
export function generate2dArray(x, y, initial = 0) {
  return Array.from(Array(x), () => new Array(y).fill(initial));
}

/**
 * Helper for looping through a 2d array
 * @param {T[][]} array
 * @param {(value: T, x: number, y: number) => void} callback
 */
export function loop2dArray(array, callback) {
  array.forEach((row, x) => {
    row.forEach((value, y) => {
      callback(value, x, y);
    });
  });
}

/**
 * Helper for looping through part of a 2d array
 * @param {T[][]} array
 * @param {number} xStart
 * @param {number} xEnd
 * @param {number} yStart
 * @param {number} yEnd
 * @param {(value: T, x: number, y: number) => void} callback
 */
export function loop2dArrayPart(array, xStart, xEnd, yStart, yEnd, callback) {
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      callback(array[x][y], x, y);
    }
  }
}
