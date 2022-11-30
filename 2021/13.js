import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // const input = inputFile.split('\r\n').slice(0, -1);

  const input = inputFile.split('\r\n\r\n');
  let [coords, folds] = input;
  coords = coords.split('\r\n').map((x) => x.split(',').map((y) => Number(y)));
  folds = folds.split('\r\n').slice(0, -1);
  // console.log(
  //   coords,
  //   folds,
  //   Math.max(...coords.map((x) => x[0])),
  //   Math.max(...coords.map((x) => x[1]))
  // );

  let arr = [];
  for (let y = 0; y < Math.max(...coords.map((x) => x[1])) + 1; y++) {
    let tmp = [];
    for (let x = 0; x < Math.max(...coords.map((x) => x[0])) + 1; x++) {
      tmp.push(0);
    }
    arr.push(tmp);
  }

  // console.log(arr.length, arr[0].length);
  // console.table(arr);

  // const arr = Array.from(Array(, () =>
  //   new Array() + 1).fill(0)
  // );

  for (let i = 0; i < coords.length; i++) {
    // console.log(coords[i][1], coords[i][0]);
    arr[coords[i][1]][coords[i][0]] = 1;
  }

  for (let i = 0; i < folds.length; i++) {
    const format = folds[i].replace('fold along ', '').split('=');
    const axis = format[0];
    const spot = Number(format[1]);

    // console.log(axis, spot);

    if (axis === 'y') {
      //  const l = ;
      for (let x = 0; x < arr[0].length; x++) {
        for (let y = spot + 1; y < spot + spot + 1; y++) {
          // console.log(y, spot - (y - spot));
          arr[spot - (y - spot)][x] += arr[y][x];
          arr[y][x] = 0;
        }
      }

      continue;
    }

    for (let x = spot + 1; x < spot + spot + 1; x++) {
      for (let y = 0; y < arr.length; y++) {
        arr[y][spot - (x - spot)] += arr[y][x];
        arr[y][x] = 0;
      }
    }
  }

  // console.table(arr);

  // let out = 0;
  // for (let y = 0; y < arr.length; y++) {
  //   for (let x = 0; x < arr[y].length; x++) {
  //     if (arr[y][x] >= 1) {
  //       out++;
  //     }
  //   }
  // }

  let out = [];
  for (let y = 0; y < 6; y++) {
    let tmp = [];
    for (let x = 0; x < 40; x++) {
      tmp.push(arr[y][x] > 1 ? '#' : '.');
    }

    out.push(tmp);
  }

  fs.writeFileSync('tmp.txt', out.join('\n'));
  return out;
}

console.log(await main());
