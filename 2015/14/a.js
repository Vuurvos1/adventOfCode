import fs from 'node:fs';

const input = fs.readFileSync('./2015/14/input.txt', 'utf8').trim().split('\n');

const reindeer = input.map((deer) => {
  // Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.
  const values = deer.match(/\d+/g).map(Number);

  return {
    name: deer.split(' ')[0],
    speed: values[0],
    duration: values[1],
    rest: values[2],
    cooldown: values[1] + values[2],
    distance: 0,
    score: 0,
  };
});

for (let i = 0; i < 2503; i++) {
  for (const deer of reindeer) {
    if (deer.cooldown > deer.rest) {
      deer.distance += deer.speed;
      deer.cooldown--;
      continue;
    }

    deer.cooldown--;

    if (deer.cooldown <= 0) {
      deer.cooldown = deer.rest + deer.duration;
    }
  }
}

// 2640 low
console.log(reindeer, reindeer.sort((a, b) => b.distance - a.distance)[0]);
