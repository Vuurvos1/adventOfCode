import fs from 'node:fs';

const scoreChar = (char) => {
  const code = char.charCodeAt() - 96;
  if (code < 0) {
    return char.toLowerCase().charCodeAt(0) - 96 + 26;
  }
  return code;
};

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  let input = inputFile.split('\n').slice(0, -1);

  input = input.map((str) => {
    const i = str.length / 2;
    return [str.slice(0, i), str.slice(i)];
  });

  let out = 0;

  for (let i = 0; i < input.length; i++) {
    // find common
    const inp = input[i];
    let s = 0;
    for (let x = 0; x < inp[0].length; x++) {
      for (let y = 0; y < inp[1].length; y++) {
        if (inp[0][x] === inp[1][y]) {
          const t = scoreChar(inp[0][x]);
          if (t > s) s = t;
        }
      }
    }
    console.log(s);
    out += s;
  }

  return out;
}

console.log(await main());
