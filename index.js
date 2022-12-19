import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = inputFile.split('\n').slice(0, -1);
// console.log(input.length);

// function dfs(or, cl, ob, ge, r1, r2, r3, r4, t) {}
function dfs(or, cl, ob, ge, r1, r2, r3, r4, t) {}

const solve = (co, cc, co1, co2, cg1, cg2, t) => {
  let max = 0;

  // [ore, clay, obsidian, geodes, r1, r2,r3, r4, t]

  let cache = new Set();

  const queue = [[0, 0, 0, 0, 1, 0, 0, 0, t]];

  while (queue.length > 1) {
    const state = queue.shift();

    max = Math.max(max, g);
    if (t === 0) continue;

    const [o, c, ob, g, r1, r2, r3, r4, t] = state;

    let cs = '' + state; // jank way to generate id
    if (cache.has(cs)) continue;
    cache.add(cs);

    queue.push(o + r1, c + r2, ob + r3, g + r4, t - 1);

    if (false) {
      // buy ore

      queue.push([
        o - Co + r1,
        c + r2,
        ob + r3,
        g + r4,
        r1 + 1,
        r2,
        r3,
        r4,
        t - 1,
      ]);
    }

    if (false) {
      queue.push([
        o - Cc + r1,
        c + r2,
        ob + r3,
        g + r4,
        r1,
        r2 + 1,
        r3,
        r4,
        t - 1,
      ]);
      // buy clay
    }

    if (false) {
      // buy obsidian
      queue.push([
        o - Co1 + r1,
        c - Co2 + r2,
        ob + r3,
        g + r4,
        r1,
        r2,
        r3 + 1,
        r4,
        t - 1,
      ]);
    }

    if (false) {
      // buy geode
      queue.push([
        o - Cg1 + r1,
        c + r2,
        ob - Cg2 + r3,
        g + r4,
        r1,
        r2,
        r3,
        r4 + 1,
        t - 1,
      ]);
    }
  }

  return max;
};

let out = 0;

for (let i = 0; i < input.length; i++) {
  let inp = input[i].split(' ');
  let id = i + 1;
  let oreCost = Number(inp[6]); // ore ore cost
  let clayCost = Number(inp[12]); // clay ore cost
  let obsidianCostOre = Number(inp[18]); // obisidian ore cost
  let obsidianCostClay = Number(inp[21]); // obsidian clay cost
  let geodeCostOre = Number(inp[27]); // geode ore cost
  let geodeCostObsidian = Number(inp[30]); // geode obsidian cost

  //   console.log(index, oc, cc, ooc, occ, goc, gobc);
  const quality = solve(
    oreCost,
    clayCost,
    obsidianCostOre,
    obsidianCostClay,
    geodeCostOre,
    geodeCostObsidian
  );
  out += quality * id;
}

console.log('end');
