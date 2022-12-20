import fs from 'node:fs';

const rawInput = fs.readFileSync('input.txt', 'utf8');
let input = rawInput
  .trim()
  .split('\n')
  .map((num) => {
    return {
      n: Number(num),
    };
  }); // creating an object from each entry makes it unique, instead of just keeping the index, very neat
// is +num faster or Number(num)?
// console.log(new Set(input).size, input.length);

const mix = (input) => {
  const mixed = [...input];

  for (const num of input) {
    const index = mixed.indexOf(num);
    mixed.splice(index, 1);
    const newIndex = (index + num.n) % mixed.length;
    mixed.splice(newIndex, 0, num);
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

// console.log(score([1, 2, -3, 4, 0, 3, -2]));
console.log(score(mixed));
console.log('end');
