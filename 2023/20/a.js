import fs from "node:fs";
import * as lib from "lib";
import clipboard from "clipboardy";

// % flip-flop
// & conjunction

const input = fs.readFileSync("./2023/20/input.txt", "utf8").trim().split("\n");

const modules = new Map();

for (const line of input) {
    const [key, value] = line.split(" -> ");

    const name = key.match(/(\w+)/g);

    const module = {
        type: key[0],
        state: "off", // or on
        connected: value.split(", "),
    };

    modules.set(name[0], module);
}

// console.log(modules);

let lowPulses = 0;
let highPulls = 0;

const broadcaster = modules.get("broadcaster");
let queue = [...broadcaster.connected.map((name) => ({ name, pulse: "low" }))];

for (let i = 0; i < 3; i++) {
    let tmpQueue = [];
    console.log(i);
    for (const module of queue) {
        const m = modules.get(module.name);
        console.log(module, m);
        if (m.type === "%") {
            if (module.pulse === "high") continue;

            // low pulse
            if (m.state === "off") {
                m.state = "on";
                // send high pulse
                tmpQueue.push(
                    ...m.connected.map((name) => ({ name, pulse: "low" }))
                );
            } else {
                m.state = "off";
                // send low pulse
                tmpQueue.push(
                    ...m.connected.map((name) => ({ name, pulse: "high" }))
                );
            }
        }

        if (m.type === "&") {
            // off === low, on === high
            // udpate memory
            m.state = module.pulse === "low" ? "off" : "on";
            // if all inputs are high, send low pulse
            if (m.connected.every((name) => modules.get(name).state === "on")) {
                tmpQueue.push(
                    ...m.connected.map((name) => ({ name, pulse: "low" }))
                );
            } else {
                // otherwise send high pulse
                tmpQueue.push(
                    ...m.connected.map((name) => ({ name, pulse: "high" }))
                );
            }
        }
    }
}

const output = lowPulses * highPulls;

console.info(output);
clipboard.writeSync(String(output));
