import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // let input = inputFile.split('\n').slice(0, -1);

  let [cratesIn, moves] = inputFile.split('\n\n');

  // console.log(input);
  cratesIn = cratesIn.split('\n').slice(0, -1);
  cratesIn = cratesIn.map((c) => c.match(/.{1,4}/g));

  // const crates = [];
  let crates = cratesIn[0].map((_, colIndex) =>
    cratesIn.map((row) => row[colIndex])
  );
  crates = crates.map((crate) => crate.reverse());

  crates = crates.map((row) => row.map((crate) => crate.trim()));
  crates = crates.map((row) => row.filter((crate) => crate !== ''));

  // for (let i = 0; i < cratesIn.length; i++) {
  //   crates.push();
  //   for (let j = 0; j < cratesIn[0].length; j++) {
  //     console.log(crates);
  //     // crates[i].unshift(cratesIn[i][j]);
  //     // crates[i]
  //   }
  // }

  console.log(cratesIn, crates, moves);

  for (const move of moves.split('\n')) {
    let [a, amount, b, from, c, to] = move.split(' ');
    amount = Number(amount);
    from = Number(from);
    to = Number(to);

    // console.log(amount, from, to);

    // for (let i = 0; i < amount; i++) {
    console.log(crates[from - 1]);
    let crate = crates[from - 1].slice(amount - 1, -1);
    crates[from - 1].splice(amount.length - amount - 1, amount.length - 1);
    console.log(crates[from - 1], crate, from);
    // console.log(crate);
    crates[to - 1].push(...crate);
    // }

    // console.log(crates);
  }

  let out = crates.reduce((prev, curr) => {
    return prev + curr[curr.length - 1].charAt(1);
  }, '');

  // return 0;
  return out;
}

console.log(await main());
