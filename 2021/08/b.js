import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  const digits = input.map((digit) =>
    digit.split('|').map((str) => str.trim().split(' '))
  );

  // console.log(digits);

  // const crabs = input[0].split(',').map((num) => Number(num));
  // const digits = input[0].split(' ');

  let out = 0;
  for (let i = 0; i < digits.length; i++) {
    let lookup = {};
    let one, seven, four, eight;

    for (let j = 0; j < digits[i][0].length; j++) {
      // get known digits
      const l = digits[i][0][j].length;

      if (l === 2) {
        one = digits[i][0][j];
        lookup[digits[i][0][j]] = 1;
      } else if (l === 3) {
        seven = digits[i][0][j];
        lookup[digits[i][0][j]] = 7;
      } else if (l === 4) {
        four = digits[i][0][j];
        lookup[digits[i][0][j]] = 4;
      } else if (l === 7) {
        eight = digits[i][0][j];
        lookup[digits[i][0][j]] = 8;
      }
    }

    for (let j = 0; j < digits[i][0].length; j++) {
      // const l = digits[i][j].length;
      // if (l === 2 || l === 3 || l === 4 || l === 7) {
      //   // console.log('out', l, digits[i][j]);
      //   out++;
      // }

      // part 2
      const l = digits[i][0][j].length;
      const charArr = [...digits[i][0][j]];
      if (l === 5) {
        // if includes all off 7 > 3
        // if includes 3 of 4 > 5
        // else 2
        const c7 = contains(charArr, seven);
        if (c7 === 3) {
          lookup[digits[i][0][j]] = 3;
          continue;
        }

        // const c1 = contains(charArr, one);
        const c4 = contains(charArr, four);
        if (c4 === 3) {
          lookup[digits[i][0][j]] = 5;
          continue;
        }

        lookup[digits[i][0][j]] = 2;
      } else if (l === 6) {
        const c4 = contains(charArr, four);
        if (c4 === 4) {
          lookup[digits[i][0][j]] = 9;
          continue;
        }

        const c7 = contains(charArr, seven);
        if (c7 === 3) {
          lookup[digits[i][0][j]] = 0;
          continue;
        }

        lookup[digits[i][0][j]] = 6;

        // if not includes 1 > 9
        // if includes all of 7 > 0
        // else 6
      }
    }

    let converted = '';
    // this is so jank, why do the input values have to shuffled compared to the output digits
    for (let j = 0; j < digits[i][1].length; j++) {
      Object.keys(lookup).forEach((look) => {
        if (
          look.length === digits[i][1][j].length &&
          contains([...look], digits[i][1][j]) === digits[i][1][j].length
        ) {
          converted += String(lookup[look]);
        }
      });
    }
    out += Number(converted);
  }

  console.log('done');

  return out;
}

function contains(input, str) {
  const chars = [...str];

  let out = 0;
  for (const char of chars) {
    if (input.includes(char)) {
      out++;
    }
  }

  return out;
}

console.log(await main());
