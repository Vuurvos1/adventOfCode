import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\n').slice(0, -1);

  const d = {
    A: 0, // rock
    B: 1, // paper
    C: 2, // scissors
    Y: 1, // draw
    X: 0, // loss
    Z: 2, // win
  };

  let out = 0;

  for (let i = 0; i < input.length; i++) {
    const [p1, p2] = input[i].split(' ');

    if (d[p2] == 1) {
      out += 3;
      out += d[p1] + 1;
      // console.log('t');

      // console.log(d[p1] + 1);
    } else if (d[p2] == 2) {
      // console.log('w');

      out += 6;
      out += d[p1] + 1 === 3 ? 0 : d[p1] + 1;
      // console.log(d[p1], d[p1] + 1 === 3 ? 0 : d[p1] + 1);
      out++;
    } else {
      // loss
      // console.log('los');
      // out += 0;
      // console.log();
      // console.log(d[p1], d[p1] - 1 > -1 ? d[p1] - 1 : 2);
      out += d[p1] - 1 >= 0 ? d[p1] - 1 : 2;

      out++;
    }
  }

  return out;
}

console.log(await main());
