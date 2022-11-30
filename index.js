import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // const input = inputFile.split('\r\n').slice(0, -1);

  // Player 1 starting position: 5
  // Player 2 starting position: 6

  // let p1 = 5;
  // let p2 = 6;

  let p1 = { pos: 4, score: 0 };
  let p2 = { pos: 8, score: 0 };

  let rolls = 0;

  let dice = 1;

  for (let i = 0; i < 10000; i++) {
    if (i % 2 == 0) {
      p1.pos = (p1.pos + dice) % 10;
      p1.score += p1.pos;
      // p1 += dice;
    } else {
      p2.pos = (p2.pos + dice) % 10;
      p2.score += p2.pos;
      // p2 += dice;
    }

    if (p1.score >= 1000) {
      break;
    }

    rolls++;

    dice++;
    if (dice > 100) {
      dice = 1;
    }

    // dice++;
    // dice = dice > 100 ? 100 : 1;
  }

  console.log(p1, p2, rolls);

  return rolls * p2.score;
}

console.log(await main());
