const pos = { x: 0, y: 0 };
const roboPos = { x: 0, y: 0 };
const visited = new Set(['0,0']);
const data = document.querySelector('pre').textContent.trim();

for (let i = 0; i < data.length; i++) {
  const char = data[i];

  if (i % 2 === 0) {
    if (char === '>') pos.x++;
    if (char === '<') pos.x--;
    if (char === '^') pos.y++;
    if (char === 'v') pos.y--;

    visited.add(pos.x + ',' + pos.y);
    continue;
  }

  if (char === '>') roboPos.x++;
  if (char === '<') roboPos.x--;
  if (char === '^') roboPos.y++;
  if (char === 'v') roboPos.y--;

  visited.add(roboPos.x + ',' + roboPos.y);
}

console.log(visited.size);
