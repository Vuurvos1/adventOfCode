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
  let inputLines = inputFile.split('\n').slice(0, -1);

  const input = [];
  while (inputLines.length > 0) input.push(inputLines.splice(0, 3));

  let out = 0;

  for (const inp of input) {
    let s = 0;
    for (let x = 0; x < inp[0].length; x++) {
      for (let y = 0; y < inp[1].length; y++) {
        for (let z = 0; z < inp[2].length; z++) {
          if (inp[0][x] === inp[1][y] && inp[0][x] === inp[2][z]) {
            const t = scoreChar(inp[0][x]);
            if (t > s) s = t;
          }
        }
      }
    }
    out += s;
  }
  return out;
}

console.log(await main());
