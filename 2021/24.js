import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  // const input = inputFile.split('\r\n');
  // // let [polymer, pairs] = input;
  // let [polymer, pairData] = input;
  // polymer = polymer.split('\r\n')[0];
  // pairs = pairs
  //   .split('\r\n')
  //   .slice(0, -1)
  //   .map((x) => x.split(' -> '));

  // console.log(input);

  const vars = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  for (const line of input) {
    // format line
    const [instruction, val1, val2] = line.split(' ');

    switch (instruction) {
      case 'inp':
        vars[val1] = 0;
        break;
      case 'add':
        vars[val1] = vars[val1] + parseInt(val2) ? parseInt(val2) : vars[val2];
        break;
      case 'mul':
        vars[val1] = vars[val1] * parseInt(val2) ? parseInt(val2) : vars[val2];

        break;
      case 'div':
        vars[val1] = Math.trunc(
          vars[val1] / parseInt(val2) ? parseInt(val2) : vars[val2]
        );

        break;
      case 'mod':
        vars[val1] = vars[val1] % parseInt(val2) ? parseInt(val2) : vars[val2];
        break;
      case 'eql':
        if (String(val1) === String(val2)) {
          vars[val1] = 1;
        } else {
          vars[val1] = 0;
        }

        break;
    }
  }

  console.log(vars);

  return 0;
}

console.log(await main());
