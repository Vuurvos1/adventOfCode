import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

// % flip-flop
// & conjunction

const input = fs.readFileSync("./2023/20/input.txt", "utf8").trim().split("\n");

/** @typedef {{ type: '%' | '&', name: string, state: 'off' | 'on', connected: string[], inputs: Map<string, 'on' | 'off'> }} Module */

/** @type {Map<string, Module>} */
const modules = new Map();

for (const line of input) {
    const [key, value] = line.split(" -> ");

    const name = key.match(/(\w+)/g);

    /** @type {Module} */
    const module = {
        type: key[0],
        name: name[0],
        state: "off", // or on
        connected: value.split(", "),
        inputs: new Map(),
    };

    modules.set(name[0], module);
}

for (const line of input) {
    const [key, value] = line.split(" -> ");
    const name = key.match(/(\w+)/g);
    const values = value.split(" ");

    for (const v of values) {
        const m = modules.get(v);
        if (!m) continue;
        m.inputs.set(name[0], "off");
    }
}

let rxTime = 0;

// vr is the module connected to xr
const keys = modules.get("vr").inputs.keys();

const broadcaster = modules.get("broadcaster");

// TODO: name should probably renamed to "to"
/** @typedef {{ name: string, pulse: 'low' | 'high': from: string  }} QueueItem */

const lcms = [];

for (const x of keys)
    g: for (let i = 1; i < Infinity; i++) {
        if (rxTime > 0) break;

        // "first button press"
        /** @type {QueueItem[]} */
        let queue = [
            ...broadcaster.connected.map((name) => ({
                name,
                pulse: "low",
                from: "broadcaster",
            })),
        ];

        // if (i % 1_000_000 === 0) {
        //     console.log("i", i, modules.get("vr"));
        // }

        while (true) {
            if (queue.length === 0) break;
            let tmpQueue = [];

            const filtered = queue.filter((el) => el.name === x);
            if (
                filtered.length > 0 &&
                filtered.every((f) => f.pulse === "low")
            ) {
                console.log(x, "found", queue, filtered);
                lcms.push(i);
                break g;
            }

            // TODO: rename module to queueItem
            for (const module of queue) {
                // if (module.name === x && module.pulse === "low") {
                //     if (c > 0) {

                //     }
                //     c++;
                // }

                // if (module.name === "rx" && module.pulse === "low") {
                //     rxTime = i;
                // }

                /** @type {Module} */
                const m = modules.get(module.name);

                if (!m) continue;

                if (m.type === "%") {
                    if (module.pulse === "high") continue;

                    // low pulse
                    if (m.state === "off") {
                        m.state = "on";
                        // send high pulse
                        tmpQueue.push(
                            ...m.connected.map((name) => ({
                                name,
                                pulse: "high",
                                from: m.name,
                            }))
                        );
                    } else {
                        m.state = "off";

                        // send low pulse
                        tmpQueue.push(
                            ...m.connected.map((name) => ({
                                name,
                                pulse: "low",
                                from: m.name,
                            }))
                        );
                    }
                }

                if (m.type === "&") {
                    // off === low, on === high
                    // udpate memory
                    m.inputs.set(
                        module.from,
                        module.pulse === "low" ? "off" : "on"
                    );

                    const areAllOn = Array.from(m.inputs.values()).every(
                        (value) => {
                            return value === "on";
                        }
                    );

                    if (areAllOn) {
                        tmpQueue.push(
                            ...m.connected.map((name) => ({
                                name,
                                pulse: "low",
                                from: m.name,
                            }))
                        );
                    } else {
                        // otherwise send high pulse
                        tmpQueue.push(
                            ...m.connected.map((name) => ({
                                name,
                                pulse: "high",
                                from: m.name,
                            }))
                        );
                    }
                }
            }
            queue = tmpQueue;
        }
    }

// 11507884051950 low <
// 23015768103900
// 238920142622879
// [ 4001, 3929, 3793, 4007 ]
// const output = lowPulses * highPulses;
const l = lib.lcm(...lcms);

console.info("time", l, rxTime, lcms);
// console.info(output, lowPulses, highPulses);
// clipboard.writeSync(String(output));
