/**
 * Generate a 2d array of size x by y
 * @template T
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
 * @template T
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
 * @template T
 * @param {T[][]} array
 * @param {number} xStart
 * @param {number} xEnd
 * @param {number} yStart
 * @param {number} yEnd
 * @param {(value: T, x: number, y: number) => void} callback
 */
export function loop2dArrayPart(array, xStart, yStart, xEnd, yEnd, callback) {
    const minX = Math.min(xStart, xEnd);
    const maxX = Math.max(xStart, xEnd);
    const minY = Math.min(yStart, yEnd);
    const maxY = Math.max(yStart, yEnd);

    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            callback(array[x][y], x, y);
        }
    }
}

export function log2dArray(array) {
    return array.map((row) =>
        row
            .map((el) => (typeof el === "boolean" ? (el ? 1 : 0) : el))
            .join(typeof el === "boolean" ? "" : ",")
    );

    // for (let x = 0; x< array.length; x++ ) {
    //   for (let y= 0; y < array[0].length; y++) {

    //   }
    // }
}

/**
 * Parse a string containing numbers into an array of numbers
 * @param {string} input
 * @returns
 */
export function parseNumbers(input) {
    const numbers = input.match(/\d+/g);
    return numbers.map((el) => Number(el));
}

/**
 * test if a value is numeric
 * @param {string} value
 */
export function isValidIntegerString(value) {
    return /^-?\d+$/.test(value);
}

/**
 * @param {string} str
 * @param {number} index
 * @param {string} replacement
 * @returns
 */
export function replaceAt(str, index, replacement) {
    return (
        str.substring(0, index) +
        replacement +
        str.substring(index + replacement.length)
    );
}

/**
 * convert a number to a binary representation
 * @param {number} dec
 * @returns
 */
export function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}
