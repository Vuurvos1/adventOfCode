import * as lib from 'lib';
import data from './input.json' assert { type: 'json' };
// const data = [[[[3]], { a: 2, b: 4 }]];

function getNumbers(values) {
  if (typeof values === 'string') return 0;
  if (typeof values === 'number') return values;

  if (Array.isArray(values)) {
    return values.reduce((acc, curr) => {
      return acc + getNumbers(curr);
    }, 0);
  }

  if (typeof values === 'object') {
    return Object.values(values).reduce(
      (acc, curr) => acc + getNumbers(curr),
      0
    );
  }
}

const result = data.reduce((acc, curr) => {
  return acc + getNumbers(curr);
}, 0);
console.log(result);
