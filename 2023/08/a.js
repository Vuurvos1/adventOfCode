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

let output = 0;
let destination = false;
let currentNode = nodeMap.get("AAA");
while (!destination) {
    for (const direction of directions) {
        if (currentNode.node === "ZZZ") {
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

console.info(output);
// clipboard.writeSync(String(output));
