import fs from 'node:fs';

const input = fs.readFileSync('./2021/03/input.txt', 'utf8').trim().split('\n');

let oxygenRatings = [...input];
let co2Ratings = [...input];

// oxygen rating
for (let i = 0; i < oxygenRatings[0].length; i++) {
  let zeroCount = 0;
  let oneCount = 0;
  for (const line of oxygenRatings) {
    if (line[i] === '0') zeroCount++;
    if (line[i] === '1') oneCount++;
  }

  oxygenRatings = oxygenRatings.filter(
    (rating) => rating[i] === (oneCount >= zeroCount ? '1' : '0')
  );

  if (oxygenRatings.length === 1) break;
}

// co2 rating
for (let i = 0; i < co2Ratings[0].length; i++) {
  let zeroCount = 0;
  let oneCount = 0;
  for (const line of co2Ratings) {
    if (line[i] === '0') zeroCount++;
    if (line[i] === '1') oneCount++;
  }

  co2Ratings = co2Ratings.filter(
    (rating) => rating[i] === (oneCount < zeroCount ? '1' : '0')
  );

  if (co2Ratings.length === 1) break;
}

console.log(oxygenRatings, co2Ratings);
console.log(eval('0b' + oxygenRatings[0]) * eval('0b' + co2Ratings[0]));
