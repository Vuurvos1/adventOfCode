import fs from 'node:fs';

const inRange = (num, range) => {
  return num >= range[0] && num <= range[1];
};

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  let input = inputFile.split('\n').slice(0, -1);

  let out = 0;

  for (let i = 0; i < input.length; i++) {
    let [e1, e2] = input[i].split(',');
    e1 = e1.split('-').map((x) => Number(x));
    e2 = e2.split('-').map((x) => Number(x));

    if (inRange(e1[0], e2) && inRange(e1[1], e2)) {
      out++;
      continue;
    }

    if (inRange(e2[0], e1) && inRange(e2[1], e1)) {
      out++;
    }

    // if e1 1 >= e2 1 && <= e2 2
    // if e1 2 <= e2 2
  }

  return out;
}

console.log(await main());
