import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // const input = inputFile.split('\r\n').slice(0, -1);

  return 0;
}

console.log(await main());
}
