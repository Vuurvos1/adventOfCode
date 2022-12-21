import fs from 'node:fs';

const rawInput = fs.readFileSync('input.txt', 'utf8');
let input = rawInput.trim().split('\n');

input = input.map((monkey) => {
  const split = monkey.split(' ');

  return {
    name: split[0].slice(0, -1),
    number: Number(split[1]),
    math: split[2],
    a: split[1],
    b: split[3],
  };
});

const numbers = {};

for (const monkey of input) {
  if (!monkey.math) numbers[monkey.name] = monkey.number;
}

const monkeyMath = (monkey) => {
  if (monkey.math === '*') return numbers[monkey.a] * numbers[monkey.b];
  else if (monkey.math === '/') return numbers[monkey.a] / numbers[monkey.b];
  else if (monkey.math === '+') return numbers[monkey.a] + numbers[monkey.b];
  else if (monkey.math === '-') return numbers[monkey.a] - numbers[monkey.b];
};

const mathMonkeys = input.filter((monkey) => !monkey.number);
console.log(mathMonkeys);

for (let i = 0; i < 1000; i++) {
  // arbitrarry number
  for (const monkey of mathMonkeys) {
    if (numbers[monkey.a] && numbers[monkey.b]) {
      monkey.number = monkeyMath(monkey);
      numbers[monkey.name] = monkey.number;
    }
  }
}

console.log(input);
console.log(numbers);

// 286698846151845

console.log('end', numbers?.root, input[0]);
