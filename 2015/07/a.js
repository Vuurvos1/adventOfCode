import * as lib from 'lib';
import fs from 'node:fs';

const input = fs.readFileSync('./2015/7/input.txt', 'utf8').trim().split('\n');

/** @type Record<string, number> */
const values = {};

for (const line of input.sort((a, b) => a.length - b.length)) {
  const args = line.split(' ');

  let val = new Uint16Array(1);

  let v1 = [null];
  let v2 = [null];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    if (arg === '->') {
      break;
    }

    if (arg === 'NOT') {
      let tmp = lib.isNumeric(nextArg) ? Number(nextArg) : values[nextArg];
      if (typeof tmp === 'number') v1 = Uint16Array([tmp]);

      break;
    }

    if (i < 1) {
      v1[0] = lib.isNumeric(arg) ? Number(arg) : values[arg];
      val[0] = v1[0];
    } else {
      v2[0] = lib.isNumeric(arg) ? Number(arg) : values[arg];
    }
  }

  v1[0] = null;
  console.log(v1[0], v2[0]);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '->') {
      values[args[i + 1]] = val[0];
      break;
    }

    //
    if (v1[0] === null || v2[0] === null) break;

    if (arg === 'AND') {
      val[0] = v1[0] & v2[0];
    }

    if (arg === 'OR') {
      val[0] = v1[0] | v2[0];
    }

    if (arg === 'LSHIFT') {
      val[0] = v1[0] << v2[0];
    }

    if (arg === 'RSHIFT') {
      val[0] = v1[0] >> v2[0];
    }

    //
    if (v1[0] === null) break;

    if (arg === 'NOT') {
      val[0] = ~v1[0];
    }
  }

  console.log(values);
}

console.log(values['a']);

// 123 -> x
// 456 -> y
// x AND y -> d
// x OR y -> e
// x LSHIFT 2 -> f
// y RSHIFT 2 -> g
// NOT x -> h
// NOT y -> i
