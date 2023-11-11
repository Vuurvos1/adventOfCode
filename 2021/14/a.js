import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // const input = inputFile.split('\r\n').slice(0, -1);

  const input = inputFile.split('\r\n\r\n');
  // let [polymer, pairs] = input;
  let [polymer, pairData] = input;
  polymer = polymer.split('\r\n')[0];
  // pairs = pairs
  //   .split('\r\n')
  //   .slice(0, -1)
  //   .map((x) => x.split(' -> '));

  const pairs = {};
  pairData
    .split('\r\n')
    .slice(0, -1)
    .forEach((x) => {
      const [pair, res] = x.split(' -> ');
      pairs[pair] = res;
    });

  console.log(pairs);

  // console.log(polymer, pairs);

  // for (let i = 0; i < 0; i++) {
  //   let tmp = `${polymer}`;
  //   let inserts = 0;
  //   // console.log(polymer.length, tmp.length);
  //   for (let j = 0; j < tmp.length - 1; j++) {
  //     const str = tmp.substring(j, j + 2);
  //     // console.log(j, str);
  //     const match = pairs.filter((el) => el[0] === str);
  //     // console.log(match);
  //     if (match.length > 0) {
  //       // console.log(match[0][1]);
  //       // console.log(polymer);
  //       polymer = addStr(polymer, j + 1 + inserts, match[0][1]);
  //       inserts++;
  //       // console.log(polymer);
  //     }
  //   }

  //   // polymer = tmp;
  // }

  const dict = {};
  for (let j = 0; j < polymer.length - 1; j++) {
    const str = polymer.substring(j, j + 2);
    if (dict[str]) {
      dict[str] += 1;
    } else {
      dict[str] = 1;
    }
  }

  for (let i = 0; i < 1; i++) {
    const tmp = dict;
    for (const [key, value] of Object.entries(tmp)) {
      // const match = pairs.filter((el) => el[0] === key);
      // // console.log(key, value, match);
      // if (match.length > 0) {
      //   const k = dict[key];
      //   dict[key] = 0;
      //   if (dict[key[0] + match[0][1]]) {
      //     dict[key[0] + match[0][1]] += value;
      //   } else {
      //     dict[key[0] + match[0][1]] = value;
      //   }
      //   if (dict[match[0][1] + key[1]]) {
      //     dict[match[0][1] + key[1]] += value;
      //   } else {
      //     dict[match[0][1] + key[1]] = value;
      //   }
      //   //   dict[str] += 1;
      //   // } else {
      //   //   dict[str] = 1;
      //   // }
      //   // console.log(match[0][1]);
      //   // console.log(polymer);
      //   // polymer = addStr(polymer, j + 1 + inserts, match[0][1]);
      //   // inserts++;
      //   // console.log(polymer);
      // }
      // // console.log(`${key}: ${value}`);
    }
  }

  console.log(dict);

  const freq = sortByFrequency(polymer.split(''));
  // console.log(freq);

  const max = polymer.split(freq[0]).length;
  const min = polymer.split(freq[freq.length - 1]).length;

  return max - min;
}

console.log(await main());

const addToMap = (map, key, value = 1) => {
  if (map[key]) {
    map[key] += value;
  } else {
    map[key] = value;
  }
};

function addStr(str, index, stringToAdd) {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  );
}

function sortByFrequency(arr) {
  const frequencyMap = arr.reduce((obj, item) => {
    obj[item] = (obj[item] || 0) + 1;
    return obj;
  }, {});

  return Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .flatMap((arr) => Array(arr[1]).fill(arr[0]));
}
