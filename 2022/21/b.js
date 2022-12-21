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

const rootMonkey = input.splice(
  input.findIndex((m) => m.name === 'root'),
  1
)[0];
console.log(rootMonkey);

let numbers = {};

const monkeyMath = (monkey) => {
  if (monkey.math === '*') return numbers[monkey.a] * numbers[monkey.b];
  else if (monkey.math === '/') return numbers[monkey.a] / numbers[monkey.b];
  else if (monkey.math === '+') return numbers[monkey.a] + numbers[monkey.b];
  else if (monkey.math === '-') return numbers[monkey.a] - numbers[monkey.b];
};

const mathMonkeys = input.filter((monkey) => !monkey.number);

// do this in 10s decending instead of one by one
for (let j = 3_759_566_890_000; j < 4_000_000_000_001; j++) {
  // tweaking numbers till it works tm
  numbers = {};
  let monkeys = structuredClone(input);
  for (const monkey of monkeys) {
    if (!monkey.math) numbers[monkey.name] = monkey.number;
  }
  numbers['humn'] = j;

  // could cache most of these calculations till the humn is reached
  for (let i = 0; i < 45; i++) {
    // arbitrarry number that solves the base input
    for (const monkey of mathMonkeys) {
      if (numbers[monkey.a] && numbers[monkey.b]) {
        monkey.number = monkeyMath(monkey);
        numbers[monkey.name] = monkey.number;
      }
    }
  }

  if (j % 10_000 === 0) {
    console.log(
      numbers[rootMonkey.a] > numbers[rootMonkey.b],
      numbers[rootMonkey.a],
      numbers[rootMonkey.b]
    );
  }
  // 80526799293735 = monkey B

  if (numbers[rootMonkey.a] == numbers[rootMonkey.b]) {
    console.log('final', j);
  }
}

// 286698846151845 high
// 3759566892641 < final output

console.log('end', numbers?.root);
