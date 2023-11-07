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
    distance: 0,
  };
});

const time = 2503;
for (const deer of reindeer) {
  var cooldown = deer.duration + deer.rest;
  var distance = Math.floor(time / cooldown) * deer.speed * deer.duration;
  var remaining = time % cooldown;
  deer.distance = distance + Math.min(remaining, deer.duration) * deer.speed;
}

console.log(reindeer.sort((a, b) => b.distance - a.distance)[0]);
