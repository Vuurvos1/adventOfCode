import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

// % flip-flop
// & conjunction

const input = fs.readFileSync("./2023/20/input.txt", "utf8").trim().split("\n");

/** @typedef {{ type: '%' | '&' | 'b', name: string, state: 'high' | 'low', connected: string[], inputs: Map<string, 'high' | 'low'> }} Module */

/** @type {Map<string, Module>} */
const modules = new Map();

for (const line of input) {
    const [key, value] = line.split(" -> ");

    const name = key.match(/(\w+)/g);
    if (!name) continue;

    /** @type {Module} */
    const module = {
        // @ts-ignore
        type: key[0],
        name: name[0],
        state: "low", // or on
        connected: value.split(", "),
        inputs: new Map(),
    };

    modules.set(name[0], module);
}

for (const line of input) {
    const [key, value] = line.split(" -> ");
    const name = key.match(/(\w+)/g);
    const values = value.split(" ");

    if (!name) continue;

    for (const v of values) {
        const m = modules.get(v);
        if (!m) continue;
        m.inputs.set(name[0], "low");
    }
}

// vr is the module connected to xr

/** @type {string[]} */
// @ts-ignore
const keys = modules.get("vr")?.inputs.keys();

let satisfyFromId = "";

/** @typedef {{ from: string, to: string, pulseType: 'low' | 'high'  }} StackItem */

/** @type {StackItem[]} */
let stack = [];

let satisfied = false;

/**
 * @param {StackItem} stackItem
 */
function sendSignal({ from, to, pulseType }) {
    if (from === satisfyFromId && pulseType === "high") {
        // console.log("found", from, to, pulseType);
        satisfied = true;
        return;
    }

    const module = modules.get(to);
    if (!module) return;

    if (module.type === "b") {
        module.connected.forEach((out) =>
            stack.push({
                from: module.name,
                to: out,
                pulseType: pulseType,
            })
        );

        return;
    }

    // flip flop
    if (module.type === "%") {
        if (pulseType === "low") {
            if (module.state === "low") {
                // send high pulse
                module.state = "high";

                module.connected.forEach((out) => {
                    stack.push({
                        from: module.name,
                        to: out,
                        pulseType: "high",
                    });
                });
            } else {
                // send low pulse
                module.state = "low";

                module.connected.forEach((out) => {
                    stack.push({
                        from: module.name,
                        to: out,
                        pulseType: "low",
                    });
                });
            }
        }

        return;
    }

    // conjunction
    if (module.type === "&") {
        const m = modules.get(from);
        if (!m) return;

        // off === low, on === high

        // udpate memory
        m.inputs.set(module.name, pulseType);

        const allAreOn = Array.from(m.inputs.values()).every(
            (value) => value === "high"
        );
        console.log(m.inputs, allAreOn);

        if (allAreOn) {
            module.connected.forEach((out) => {
                stack.push({
                    from: module.name,
                    to: out,
                    pulseType: "low",
                });
            });
        } else {
            module.connected.forEach((out) => {
                stack.push({
                    from: module.name,
                    to: out,
                    pulseType: "high",
                });
            });
        }
    }
}

const hits = [];

for (const x of keys) {
    console.log(x);
    satisfyFromId = x;
    satisfied = false;
    let i = 0;

    while (satisfied === false) {
        stack.push({
            to: "broadcaster",
            from: "button",
            pulseType: "low",
        });
        while (stack.length) {
            // @ts-ignore
            sendSignal(stack.shift());
        }
        i++;
    }

    hits.push(i);
}

// [ 4001, 3929, 3793, 4007 ]
console.log("hits", hits, lib.lcm(...hits));

// console.info(output);
// clipboard.writeSync(String(output));
