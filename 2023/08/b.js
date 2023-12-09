import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs
    .readFileSync("./2023/08/input.txt", "utf8")
    .trim()
    .split("\n\n");
const [directionInput, nodeInputs] = input;
const directions = directionInput.split("");

const nodes = nodeInputs.split("\n").map((n) => {
    const [node, left, right] = n.match(/\w+/g);
    return { node, left, right, moves: -1 };
});

const nodeMap = new Map();
nodes.forEach((node) => nodeMap.set(node.node, node));

const currentNodes = nodes.filter((n) => n.node.slice(-1) === "A");

for (const node of currentNodes) {
    let output = 0;
    let currentNode = node;
    let destination = false;

    while (!destination) {
        for (const direction of directions) {
            if (currentNode.node.slice(-1) === "Z") {
                destination = true;
                break;
            }

            if (direction === "L") {
                currentNode = nodeMap.get(currentNode.left);
            }

            if (direction === "R") {
                currentNode = nodeMap.get(currentNode.right);
            }

            output++;
        }
    }

    node.moves = output;
}

const moves = currentNodes.map((n) => n.moves);

// least common multiple of
console.log(moves);
// https://www.calculatorsoup.com/calculators/math/lcm.php (remove commas)

console.log(lib.lcm(...moves));

// console.info(output);
// clipboard.writeSync(String(output));
