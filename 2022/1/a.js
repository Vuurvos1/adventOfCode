import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  let input = inputFile.split('\r\n\r\n').slice(0, -1);

  input = input.map((el) => el.split('\r\n').map((x) => Number(x)));

  const out = input.map((el) =>
    el.reduce((curr, prev) => prev + Number(curr), 0)
  );

  console.log(out);

  console.log(Math.max(...out));

  return 0;
}

console.log(await main());
