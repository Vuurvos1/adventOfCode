import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  const coords = input.map((row) => row.split(''));

  // const scores = {
  //   ')': 3,
  //   ']': 57,
  //   '}': 1197,
  //   '>': 25137,
  // };

  const scores = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  };

  const inverse = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  };

  let outScores = [];
  // let out = 0;

  for (let i = 0; i < coords.length; i++) {
    let out = 0;
    const stack = [];
    let err = false;
    for (let j = 0; j < coords[i].length; j++) {
      const c = coords[i][j];
      if (c == '(' || c == '[' || c == '{' || c == '<') {
        stack.push(c);
        continue;
      }

      if (stack[stack.length - 1] !== inverse[c]) {
        // console.log('WRONG', c, j, stack);
        // out += scores[c];

        // console.log(j);
        if (j < coords[i].length) {
          err = true;
        }
        break;
      } else {
        stack.pop();
      }
    }

    if (err) {
      continue;
    }

    // console.log(stack);
    for (let j = stack.length - 1; j >= 0; j--) {
      // console.log(j);
      out = out * 5 + scores[stack[j]];
    }

    outScores.push(out);
  }

  outScores.sort((a, b) => a - b);

  // console.log(outScores, outScores.length);

  // return out;
  return outScores[Math.floor(outScores.length / 2)];
}

console.log(await main());
