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

let lowPulses = 0;
let highPulses = 0;

const broadcaster = modules.get("broadcaster");

// TODO: name should probably renamed to "to"
/** @typedef {{ name: string, pulse: 'low' | 'high': from: string  }} QueueItem */

for (let i = 0; i < 1000; i++) {
    // "first button press"
    /** @type {QueueItem[]} */
    let queue = [
        ...broadcaster.connected.map((name) => ({
            name,
            pulse: "low",
            from: "broadcaster",
        })),
    ];
    lowPulses += broadcaster.connected.length + 1; // 1 extra low pulse for the initial button press

    console.log("i", i);

    while (true) {
        if (queue.length === 0) break;
        let tmpQueue = [];
        // TODO: rename module to queueItem
        for (const module of queue) {
            /** @type {Module} */
            const m = modules.get(module.name);

            if (!m) continue;

            // console.log(module, m, lowPulses, highPulses);
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
                    highPulses += m.connected.length;
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
                    lowPulses += m.connected.length;
                }
            }

            if (m.type === "&") {
                // off === low, on === high
                // udpate memory
                m.state = module.pulse === "low" ? "off" : "on";
                m.inputs.set(
                    module.from,
                    module.pulse === "low" ? "off" : "on"
                );
                // const inp = m.inputs.get("");
                // if all inputs? are high, send low pulse
                // const connected = queue.filter((i) => i.name === m.name);
                // console.log("con", queue);

                const areAllOn = Array.from(m.inputs.values()).every(
                    (value) => {
                        return value === "on";
                    }
                );

                // m.connected.every(
                //     (name) => modules.get(name)?.state === "on"
                // )
                if (areAllOn) {
                    tmpQueue.push(
                        ...m.connected.map((name) => ({
                            name,
                            pulse: "low",
                            from: m.name,
                        }))
                    );
                    lowPulses += m.connected.length;
                } else {
                    // otherwise send high pulse
                    tmpQueue.push(
                        ...m.connected.map((name) => ({
                            name,
                            pulse: "high",
                            from: m.name,
                        }))
                    );
                    highPulses += m.connected.length;
                }
            }
        }
        queue = tmpQueue;
    }
}

const output = lowPulses * highPulses;

console.info(output, lowPulses, highPulses);
// clipboard.writeSync(String(output));
