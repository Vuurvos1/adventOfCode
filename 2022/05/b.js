import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // let input = inputFile.split('\n').slice(0, -1);

  let [cratesIn, moves] = inputFile.split('\n\n');

  cratesIn = cratesIn.split('\n').slice(0, -1);
  cratesIn = cratesIn.map((c) => c.match(/.{1,4}/g));

  let crates = cratesIn[0].map((_, colIndex) =>
    cratesIn.map((row) => row[colIndex])
  );
  crates = crates.map((crate) => crate.reverse());

  crates = crates.map((row) => row.map((crate) => crate.trim()));
  crates = crates.map((row) => row.filter((crate) => crate !== ''));

  moves = moves.split('\n').slice(0, -1);

  for (const move of moves) {
    let [a, amount, b, from, c, to] = move.split(' ');
    amount = Number(amount);
    from = Number(from);
    to = Number(to);

    let crate = crates[from - 1].splice(0 - amount, amount);

    crates[to - 1].push(...crate);
  }

  let out = crates.reduce((prev, curr) => {
    return prev + curr[curr.length - 1].charAt(1);
  }, '');

  return out;
}

console.log(await main());
