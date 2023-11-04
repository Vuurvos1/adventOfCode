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
    Z: 2, // draw
  };

  let out = 0;

  for (let i = 0; i < input.length; i++) {
    const [p1, p2] = input[i].split(' ');

    out += d[p2] + 1;

    console.log(d[p2]);

    // (e.target.dataset.index - b + 2) % 3

    if (d[p1] === d[p2]) {
      out += 3;
      console.log('tie');
    } else if ((d[p1] - d[p2] - 2) % 3 == 0) {
      // win
      console.log('win');
      out += 6;
    } else {
      console.log('los');

      out += 0;
    }
  }

  return out;
}

console.log(await main());
