import fs from 'node:fs';
const rawInput = fs.readFileSync('input.txt', 'utf8');
const input = rawInput.trimEnd().split('\n');
const map = input.map((row) => row.split(''));

const width = map[0].length - 2;
const height = map.length - 2;

// blizzard = {
//   dir: '',
//   x: 0,
//   y: 0,
// }

const searchBliz = (set, x, y) => {
  for (const item of set) {
    if (item.x == x && item.y == y) {
      return true;
    }
  }
  return false;
};

const inRange = (x, min, max) => {
  return x >= min && x <= max;
};

const blizzards = [new Set()];

// initial blizzard
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '.' || map[y][x] === '#') continue;

    blizzards[0].add({
      dir: map[y][x],
      x: x,
      y: y,
    });
  }
}

// precompute all blizard positions, very slow
for (let i = 0; i < width * height - 1; i++) {
  const blizzard = new Set();

  for (const bliz of blizzards[blizzards.length - 1]) {
    if (bliz.dir == '^') {
      blizzard.add({
        ...bliz,
        y: bliz.y - 2 < 0 ? height : (bliz.y - 1) % height,
      });
    } else if (bliz.dir == '>') {
      blizzard.add({ ...bliz, x: (bliz.x % width) + 1 });
    } else if (bliz.dir == 'v') {
      blizzard.add({ ...bliz, y: (bliz.y % height) + 1 });
    } else if (bliz.dir == '<') {
      blizzard.add({
        ...bliz,
        x: bliz.x - 2 < 0 ? width : (bliz.x - 1) % width,
      });
    }
  }

  blizzards.push(blizzard);
}

console.log(blizzards.length);

const startPos = { x: map[0].indexOf('.'), y: 0 };
const endPos = { x: map[map.length - 1].indexOf('.'), y: map.length - 1 };

const dirs = [
  [0, 0],
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// you could probably simulate the map once and the dfs only the position
function bfs(start, end, time) {
  // x, y, time/moves
  const queue = [[start.x, start.y, time]];
  const cache = new Set();

  while (queue.length > 0) {
    const [x, y, t] = queue.shift();

    const bliz = blizzards[t % (width * height)];

    if (cache.has([x, y, t].join(','))) continue; // if in cache continue
    cache.add([x, y, t].join(',')); // add to cache

    if (x == end.x && y == end.y) {
      console.log('reached end in ', t - 1, 'moves');
      return t - 1;
    }

    for (const [dx, dy] of dirs) {
      // only push if not already at same position, willing to go in direction at x time
      // if not in blizzard or oob
      if (
        !searchBliz(bliz, x + dx, y + dy) &&
        inRange(x + dx, 0, width + 2) &&
        inRange(y + dy, 0, height + 2) &&
        map[y + dy]?.[x + dx] !== '#'
      ) {
        queue.push([x + dx, y + dy, t + 1]);
      }
    }
  }
}

let t = bfs(startPos, endPos, 0);
t = bfs(endPos, startPos, t);
t = bfs(startPos, endPos, t);

console.log('end', t);
