import fs from 'node:fs';

let d = 1;
const getDice = () => {
  let val = 0;
  for (let i = 0; i < 3; i++) {
    val += d;
    d++;

    if (d > 100) {
      d = 1;
    }
  }

  return val;
};

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  // const input = inputFile.split('\r\n').slice(0, -1);

  // Player 1 starting position: 5
  // Player 2 starting position: 6

  // let p1 = 5;
  // let p2 = 6;

  let p1 = { pos: 5, score: 0 };
  let p2 = { pos: 6, score: 0 };

  let rolls = 0;

  for (let i = 0; i < 100000; i++) {
    if (i % 2 == 0) {
      rolls += 3;
      movePlayer(p1, getDice());
    } else {
      rolls += 3;
      movePlayer(p2, getDice());
    }

    if (p1.score >= 1000) {
      return rolls * p2.score;
    }

    if (p2.score >= 1000) {
      return rolls * p1.score;
    }
  }

  console.log(p1, p2, rolls);

  return rolls * p2.score;
}

console.log(await main());

function movePlayer(p, dice) {
  const move = (p.pos + dice) % 10;
  p.pos = move == 0 ? 10 : move;
  p.score += p.pos;
}
