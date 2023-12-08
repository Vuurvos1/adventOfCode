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
    return { node, left, right };
});

const nodeMap = new Map();
nodes.forEach((node) => nodeMap.set(node.node, node));

const currentNodes = nodes.filter((n) => n.node.slice(-1) === "A");
console.log(currentNodes);

let output = 0;
let destination = false;
// let currentNode = nodeMap.get("AAA");
while (!destination) {
    for (const direction of directions) {
        if (currentNodes.every((n) => n.node.slice(-1) === "Z")) {
            destination = true;
            break;
        }

        for (let i = 0; i < currentNodes.length; i++) {
            const node = currentNodes[i];

            if (direction === "L") {
                currentNodes[i] = nodeMap.get(node.left);
            }

            if (direction === "R") {
                currentNodes[i] = nodeMap.get(node.right);
            }
        }

        output++;
    }
}

console.info(output);
clipboard.writeSync(String(output));
