import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.trim().split('\n');

// {
//   valve: string
//   rate: number
//   tunnels: string[]
// }
const nodes = input.map((inp) => {
  const [valveIn, tunnelIn] = inp.split('; ');
  const valveSplit = valveIn.split(' ');

  return {
    name: valveSplit[1],
    rate: Number(valveSplit[4].substring(5)),
    tunnels: tunnelIn
      .substring(22)
      .split(', ')
      .map((x) => x.trim()),
  };
});

// use the floyd warshall algorithem to generate shortest distances between valves/nodes
// dfs
//
// valves with 0 flow rate (appart from the starting node) could be simplified out
// and be added as extra travel time between valves/nodes,
// less nodes -> less complecity -> more speed

// https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
const createDistMap = (nodes) => {
  const distMap = {};

  for (const node of nodes) {
    distMap[node.name] = {};

    // min distance initialization
    for (const node2 of nodes) {
      distMap[node.name][node2.name] = +Infinity;
    }

    // edges
    for (const neighbour of node.tunnels) {
      distMap[node.name][neighbour] = 1;
    }

    // vertexes
    distMap[node.name][node.name] = 0; // distance to self
  }

  nodes.forEach((k) => {
    nodes.forEach((i) => {
      nodes.forEach((j) => {
        const ij = distMap[i.name][j.name];
        const ik = distMap[i.name][k.name];
        const kj = distMap[k.name][j.name];
        if (ij > ik + kj) {
          distMap[i.name][j.name] = ik + kj;
        }
      });
    });
  });

  return distMap;
};

const distMap = createDistMap(nodes);

// current
// time
// open
// total
// next

let totalTime = 30;
let flowValves = nodes.filter((n) => n.rate !== 0);
let startNode = nodes.find((n) => n.name === 'AA');

const totalRate = (valves) => {
  return valves.reduce((sum, curr) => sum + curr.rate, 0);
};

function dfs(curr, time, total, open, next) {
  let max = total + totalRate(open) * (totalTime - time);

  for (const n of next) {
    // skip open valves
    // console.log(!!open.find((o) => o.name === n.name));
    if (open.find((o) => o.name === n.name)) continue; // why did I think returns would work here??

    // skip if unreachable in remaining time
    const dist = distMap[curr.name][n.name] + 1;
    // console.log(time + dist >= totalTime, time, time + dist, totalTime);
    if (time + dist >= totalTime) continue;

    // move to valve and open
    const newTotal = total + dist * totalRate(open);
    open.push(n);
    const value = dfs(n, time + dist, newTotal, open, next);

    max = Math.max(value, max);
    const nextIndex = open.findIndex((o) => o.name === n.name);
    open.splice(nextIndex, 1);
  }

  // console.log(max);
  return max;
}

const out = dfs(startNode, 0, 0, [], flowValves);

console.log('end', out);
