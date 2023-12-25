import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/25/input.txt", "utf8").trim().split("\n");

function generateGraph() {
    let graphString = "digraph G {\n\n";

    for (const line of input) {
        const [a, b] = line.split(": ");
        graphString += `    ${a} -> ${b.split(" ").join(", ")}\n`;
    }

    graphString += "\n}";

    fs.writeFileSync("./2023/25/output.gv", graphString);
}

function solve() {
    // bdj->vfh
    // ztc->ttv
    // bnv->rpd

    const bound = 25683.18 - 0.1; // most left elipse of right cluster

    const svg = fs.readFileSync("./2023/25/file.svg", "utf8");

    /* <g xmlns="http://www.w3.org/2000/svg" id="node872" class="node">
<title>zdj</title>
<ellipse fill="none" stroke="black" cx="25683.18" cy="-666" rx="27" ry="18"/>
<text text-anchor="middle" x="25683.18" y="-662.3" font-family="Times,serif" font-size="14.00">zdj</text>
</g> */

    // "<pre>(.*?)</pre>"

    /** @type {Set<string>} */
    const nodeNames = new Set();

    for (const line of input) {
        const matches = line.match(/(\w+)/g);
        for (const node of matches ?? []) {
            nodeNames.add(node);
        }
    }

    let count = 0;

    const elipses = svg.match(/<ellipse(.*?)\/>/g);
    console.log(elipses);
    for (const e of elipses ?? []) {
        const cxStr = e.match(/cx="(.*?)"/);
        if (!cxStr) continue;

        const cx = Number(cxStr[1]);
        if (cx < bound) count++;
    }

    return count * (nodeNames.size - count);
}

// generateGraph();

// run this after generating the gv file (needs graphviz)
// dot -Tsvg output.gv -o file.svg

// inspect the graph in something like your browser and look where the 2 clusters are connected, it can be quite a mess
// get the coordinates of the most left ellipse of the right cluster, set these coordinates as the bound
// bada bing, bada boom, computer go brrrrrrrr

const output = solve();
console.info(output);
clipboard.writeSync(String(output));
