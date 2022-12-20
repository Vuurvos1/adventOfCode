import fs from 'node:fs';

const rawInput = fs.readFileSync('input.txt', 'utf8');
let input = rawInput
  .trim()
  .split('\n')
  .map((num) => {
    return {
      n: Number(num) * 811589153,
    };
  }); // creating an object from each entry makes it unique, instead of just keeping the index, very neat
// is +num faster or Number(num)?
// console.log(new Set(input).size, input.length);

// maybe it would be more efficient to create 2 arrays, one with indexes and 1 with values instead of having to do a lookup each time

const mix = (input) => {
  const mixed = [...input];

  for (let i = 0; i < 10; i++) {
    for (const num of input) {
      const index = mixed.indexOf(num);
      mixed.splice(index, 1);
      const newIndex = (index + num.n) % mixed.length;
      mixed.splice(newIndex, 0, num);
    }
  }

  return mixed;
};

const score = (arr) => {
  const zeroIndex = arr.findIndex((n) => n.n === 0);
  return (
    arr[(zeroIndex + 1000) % arr.length].n +
    arr[(zeroIndex + 2000) % arr.length].n +
    arr[(zeroIndex + 3000) % arr.length].n
  );
};

const mixed = mix(input);

console.log(score(mixed));
