/**
 * @param {number} num
 * @returns {number[]}
 */
function getFactors(num) {
  const output = [1];
  for (let i = 2; i < num + 1; i++) {
    if (num % i === 0) {
      output.push(i);
    }
  }

  return output;
}

const input = 34000000;

console.time('time');
// TODO: speed up 10x or more?
for (let i = 1; i < input; i++) {
  const factors = getFactors(i);

  if (i % 100_000 === 0) console.log(i);

  if (
    factors.reduce((acc, curr) => {
      return acc + curr * 10;
    }, 0) >= input
  ) {
    console.log('house', i);
    break;
  }
}
console.timeEnd('time');

console.log('end');
