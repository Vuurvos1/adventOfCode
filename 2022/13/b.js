import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile
  .split('\n')
  .filter((el) => el != '')
  .map((x) => JSON.parse(x));

input.push([[2]], [[6]]);

// console.log(input);

const compare = (left, right) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    return left <= right;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let result = compare(left[i], right[i]);
      if (result != null) return result;
    }

    // empty arrays
    return left.length <= right.length;
  } else {
    return compare(
      Array.isArray(left) ? left : [left],
      Array.isArray(right) ? right : [right]
    );
  }
};

input = input.sort((left, right) => {
  const res = compare(left, right);
  return res ? -1 : 1;
});

console.log(input);

let first = -1;
let second = -1;
for (let i = 0; i < input.length; i++) {
  if (JSON.stringify(input[i]) == '[[2]]') first = i + 1;
  if (JSON.stringify(input[i]) == '[[6]]') second = i + 1;
}

// 25830 TO HIGH
console.log('out', first * second);
