import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = inputFile.split('\n').slice(0, -1);
// console.log(input.length);

// function dfs(or, cl, ob, ge, r1, r2, r3, r4, t) {}

const solve = (
  oreCost,
  clayCost,
  obsidianCostOre,
  obsidianCostClay,
  geodeCostOre,
  geodeCostObsidian,
  t
) => {
  // [ore, clay, obsidian, geodes, r1, r2,r3, r4, time]

  let maxGeodes = 0;

  // don't build more bots than needed
  let maxOre = Math.max(oreCost, clayCost, obsidianCostOre, obsidianCostClay);
  let maxClay = Math.max(clayCost);

  let cache = new Set();

  // const queue = [[0, 0, 0, 0, 1, 0, 0, 0, t]];

  const search = (ore, clay, obsidian, geodes, r1, r2, r3, r4, t) => {
    if (t < 1) return;

    // prune branch if it can't beat the max geodes in the most ideal condition
    // this is when a geode bot can be build every round until the end
    if (geodes + (t * (t + 1)) / 2 < maxGeodes) return;

    if (geodes > maxGeodes) {
      console.log('mew Max', geodes, t);
    }
    maxGeodes = Math.max(maxGeodes, geodes);

    // if (queue.length % 1000 === 0) console.log('queue', queue.length);

    // let cs = state.join(','); // generating cache ids
    // if (cache.has(cs)) continue;
    // cache.add(cs);

    // geode robot
    if (r3 > 0) {
      let canBuild = obsidian >= geodeCostObsidian && ore >= geodeCostOre;
      let timeSkip =
        1 +
        (canBuild
          ? 0
          : Math.max(
              Math.ceil((geodeCostOre - ore) / r1),
              Math.ceil((geodeCostObsidian - obsidian) / r3)
            ));

      search(
        ore + r1 * timeSkip - geodeCostOre,
        clay + r2 * timeSkip,
        obsidian + r3 * timeSkip - geodeCostObsidian,
        geodes + r4 * timeSkip,
        r1,
        r2,
        r3,
        r4 + 1,
        t - timeSkip
      );

      // if (canBuild) return;
    }

    // obsidian robot
    if (r2 > 0) {
      let canBuild = ore >= obsidianCostOre && clay >= obsidianCostClay;
      let timeSkip =
        1 + canBuild
          ? 0
          : Math.max(
              Math.ceil((obsidianCostOre - ore) / r1),
              Math.ceil((obsidianCostClay - clay) / r2)
            );

      if (t - timeSkip > 2) {
        search(
          ore + r1 * timeSkip - obsidianCostOre,
          clay + r2 * timeSkip - obsidianCostClay,
          obsidian + r3 * timeSkip,
          geodes + r4 * timeSkip,
          r1,
          r2,
          r3 + 1,
          r4,
          t - timeSkip
        );
      }
    }

    // clay robot
    if (r2 < maxClay) {
      let canBuild = ore >= clayCost;
      let timeSkip = 1 + (canBuild ? 0 : Math.ceil((clayCost - ore) / r1));

      if (t - timeSkip > 3) {
        search(
          ore + timeSkip * r1 - clayCost,
          clay + timeSkip * r2,
          obsidian + timeSkip * r3,
          geodes + timeSkip * r4,
          r1,
          r2 + 1,
          r3,
          r4,
          t - timeSkip
        );
      }
    }

    // ore robot
    if (r1 < maxOre) {
      let canBuild = ore >= oreCost;
      let timeSkip = 1 + (canBuild ? 0 : Math.ceil((oreCost - ore) / r1));

      if (t - timeSkip > 4) {
        queue.push([
          ore + r1 * timeSkip - oreCost,
          clay + r2 * timeSkip,
          obsidian + r3 * timeSkip,
          geodes + r4 * timeSkip,
          r1 + 1,
          r2,
          r3,
          r4,
          t - timeSkip,
        ]);
      }
    }

    console.log('itter done', maxGeodes);
    return maxGeodes;
  };

  const res = search(0, 0, 0, 0, 1, 0, 0, 0, t);

  while (queue.length > 0) {
    let state = queue.shift();
    let [ore, clay, obsidian, geodes, r1, r2, r3, r4, t] = state;

    // if (t < 0) continue;

    // // prune branch if it can't beat the max geodes in the most ideal condition
    // // this is when a geode bot can be build every round until the end
    // if (geodes + (t * (t + 1)) / 2 < maxGeodes) continue;

    // if (geodes > maxGeodes) {
    //   console.log('mew Max', geodes, t);
    // }
    // maxGeodes = Math.max(maxGeodes, geodes);

    // // if (queue.length % 1000 === 0) console.log('queue', queue.length);

    // // let cs = state.join(','); // generating cache ids
    // // if (cache.has(cs)) continue;
    // // cache.add(cs);

    // // geode robot
    // if (r3 > 0) {
    //   let canBuild = obsidian >= geodeCostObsidian && ore >= geodeCostOre;
    //   let timeSkip =
    //     1 +
    //     (canBuild
    //       ? 0
    //       : Math.max(
    //           Math.ceil((geodeCostOre - ore) / r1),
    //           Math.ceil((geodeCostObsidian - obsidian) / r3)
    //         ));

    //   queue.push([
    //     ore + r1 * timeSkip - geodeCostOre,
    //     clay + r2 * timeSkip,
    //     obsidian + r3 * timeSkip - geodeCostObsidian,
    //     geodes + r4 * timeSkip,
    //     r1,
    //     r2,
    //     r3,
    //     r4 + 1,
    //     t - timeSkip,
    //   ]);

    //   // if (canBuild) continue;
    // }

    // // obsidian robot
    // if (r2 > 0) {
    //   let canBuild = ore >= obsidianCostOre && clay >= obsidianCostClay;
    //   let timeSkip =
    //     1 + canBuild
    //       ? 0
    //       : Math.max(
    //           Math.ceil((obsidianCostOre - ore) / r1),
    //           Math.ceil((obsidianCostClay - clay) / r2)
    //         );

    //   if (t - timeSkip > 2) {
    //     queue.push([
    //       ore + r1 * timeSkip - obsidianCostOre,
    //       clay + r2 * timeSkip - obsidianCostClay,
    //       obsidian + r3 * timeSkip,
    //       geodes + r4 * timeSkip,
    //       r1,
    //       r2,
    //       r3 + 1,
    //       r4,
    //       t - timeSkip,
    //     ]);
    //   }
    // }

    // // clay robot
    // if (r2 < maxClay) {
    //   let canBuild = ore >= clayCost;
    //   let timeSkip = 1 + (canBuild ? 0 : Math.ceil((clayCost - ore) / r1));

    //   if (t - timeSkip > 3) {
    //     queue.push([
    //       ore + timeSkip * r1 - clayCost,
    //       clay + timeSkip * r2,
    //       obsidian + timeSkip * r3,
    //       geodes + timeSkip * r4,
    //       r1,
    //       r2 + 1,
    //       r3,
    //       r4,
    //       t - timeSkip,
    //     ]);
    //   }
    // }

    // // ore robot
    // if (r1 < maxOre) {
    //   let canBuild = ore >= oreCost;
    //   let timeSkip = 1 + (canBuild ? 0 : Math.ceil((oreCost - ore) / r1));

    //   if (t - timeSkip > 4) {
    //     queue.push([
    //       ore + r1 * timeSkip - oreCost,
    //       clay + r2 * timeSkip,
    //       obsidian + r3 * timeSkip,
    //       geodes + r4 * timeSkip,
    //       r1 + 1,
    //       r2,
    //       r3,
    //       r4,
    //       t - timeSkip,
    //     ]);
    //   }
    // }

    // queue.push([
    //   ore + r1,
    //   clay + r2,
    //   obsidian + r3,
    //   geodes + r4,
    //   r1,
    //   r2,
    //   r3,
    //   r4,
    //   t - 1,
    // ]);

    // if (o >= co) {
    //   // buy ore
    //   queue.push([
    //     o - co + r1,
    //     c + r2,
    //     ob + r3,
    //     g + r4,
    //     r1 + 1,
    //     r2,
    //     r3,
    //     r4,
    //     t - 1,
    //   ]);
    // }

    // if (o >= cc) {
    //   // buy clay
    //   queue.push([
    //     o - cc + r1,
    //     c + r2,
    //     ob + r3,
    //     g + r4,
    //     r1,
    //     r2 + 1,
    //     r3,
    //     r4,
    //     t - 1,
    //   ]);
    // }

    // if (o >= co1 && c >= co2) {
    //   // buy obsidian
    //   queue.push([
    //     o - co1 + r1,
    //     c - co2 + r2,
    //     ob + r3,
    //     g + r4,
    //     r1,
    //     r2,
    //     r3 + 1,
    //     r4,
    //     t - 1,
    //   ]);
    // }

    // if (o >= cg1 && ob >= cg2) {
    //   // buy geode
    //   queue.push([
    //     o - cg1 + r1,
    //     c + r2,
    //     ob - cg2 + r3,
    //     g + r4,
    //     r1,
    //     r2,
    //     r3,
    //     r4 + 1,
    //     t - 1,
    //   ]);
    // }
  }

  console.log('Blueprint max: ' + maxGeodes);
  return maxGeodes;
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

  // console.log(index, oc, cc, ooc, occ, goc, gobc);
  const quality = solve(
    oreCost,
    clayCost,
    obsidianCostOre,
    obsidianCostClay,
    geodeCostOre,
    geodeCostObsidian,
    24
  );

  // console.log('itter done', i);

  out += quality * id;
}

console.log(out);
console.log('end');
