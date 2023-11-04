import * as lib from 'lib';

let input = 'hepxcrrq';

// i, 0, l could be skipped since they are not valid
const nextMap = {
  a: 'b',
  b: 'c',
  c: 'd',
  d: 'e',
  e: 'f',
  f: 'g',
  g: 'h',
  h: 'i',
  i: 'j',
  j: 'k',
  k: 'l',
  l: 'm',
  m: 'n',
  n: 'o',
  o: 'p',
  p: 'q',
  q: 'r',
  r: 's',
  s: 't',
  t: 'u',
  u: 'v',
  v: 'w',
  w: 'x',
  x: 'y',
  y: 'z',
  z: 'a',
};

/**
 * @param {string} str
 */
function validate(str) {
  // not include  i o l
  for (const char of str) {
    if (char === 'i' || char === 'o' || char === 'l') return false;
  }

  // console.log('no include');

  // double pair
  let double = false;
  let pair1;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      // found double
      if (!pair1) {
        pair1 = str[i];
        continue;
      }

      if (pair1 !== str[i]) {
        double = true;
        break;
      }
    }
  }

  // console.log('double', double);
  if (!double) return false;

  // straight
  let straight = false;
  for (let i = 0; i < str.length - 2; i++) {
    const char = str[i];

    if (nextMap[char] === str[i + 1] && nextMap[nextMap[char]] === str[i + 2]) {
      straight = true;
      break;
    }
  }

  // console.log('straight', straight);

  return straight;
}

function incrementString(str) {
  for (let i = input.length - 1; i >= 0; i--) {
    const char = str[i];
    str = lib.replaceAt(str, i, nextMap[char]);

    if (char !== 'z') {
      break;
    }
  }

  return str;
}

while (true) {
  input = incrementString(input);

  if (validate(input)) {
    break;
  }
}

console.log('end', input);
