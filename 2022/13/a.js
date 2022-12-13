import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n\n');

input = input.map((input) =>
  input
    .split('\n')
    .slice(0, 2)
    .map((x) => JSON.parse(x))
);

const compare = (left, right) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left > right) return false;
    if (left < right) return true;
    return null;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let result = compare(left[i], right[i]);
      if (result != null) return result;
    }

    // empty arrays
    if (left.length < right.length) return true;
    if (left.length > right.length) return false;
    return null;
  } else {
    return compare(
      Array.isArray(left) ? left : [left],
      Array.isArray(right) ? right : [right]
    );
  }
};

let out = 0;

for (let i = 0; i < input.length; i++) {
  const [left, right] = input[i];
  const order = compare(left, right);
  if (order) out += i + 1;
}

// 7854 TO HIGH
// 7397 TO HIGH
console.log('out', out);
