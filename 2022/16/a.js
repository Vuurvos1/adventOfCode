import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

// {
//   valve: string
//   rate: number
//   tunnels: string[]
// }
const nodes = input.map((inp) => {
  const [valveIn, tunnelIn] = inp.split('; ');
  const valveSplit = valveIn.split(' ');

  return {
    valve: valveSplit[1],
    rate: Number(valveSplit[4].substring(5)),
    tunnels: tunnelIn
      .substring(22)
      .split(', ')
      .map((x) => x.trim()),
  };
});

console.log(nodes);

for (let i = 0; i < input.length; i++) {
  //
}

console.log('end loop');
