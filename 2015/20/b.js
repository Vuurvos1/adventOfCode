const input = 34000000;

const size = input / 11; // upper bound
const presents = new Int32Array(input / 11);

console.time('time');
for (let elf = 0; elf < size; elf++) {
  let visits = 0;
  // skip elf houses every itteration, elf 2 > 2, 4, 6... elf 11 > 11, 22, 33...
  for (let i = elf; i < size - 1 && visits < 50; i += elf) {
    presents[i] += 11 * elf;
    visits++;
  }
}

console.log(presents[0], presents[1]);
const output = presents.findIndex((num) => num >= input);
console.log(output);

console.timeEnd('time');

// 952920 high
// 831600
