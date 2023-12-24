import fs from "node:fs";
import * as lib from "lib";
import { init } from "z3-solver";
import clipboard from "clipboardy";

const input = fs.readFileSync("./2023/24/input.txt", "utf8").trim().split("\n");

const hailstones = input.map((line) => {
    /** @type {number[]} */
    const numbers = line.match(/-?\d+/g)?.map(Number);

    return {
        x: numbers[0],
        y: numbers[1],
        z: numbers[2],
        vx: numbers[3],
        vy: numbers[4],
        vz: numbers[5],
    };
});

const { Context } = await init();
const { Solver, Real } = Context("main");
const solver = new Solver();

console.time("t");
const vars = {
    x: Real.const("x"),
    y: Real.const("y"),
    z: Real.const("z"),
    vx: Real.const("vx"),
    vy: Real.const("vy"),
    vz: Real.const("vz"),
};

for (let i = 0; i < 3; i++) {
    const h = hailstones[i];
    const tk = Real.const("tk" + i);
    solver.add(tk.mul(h.vx).add(h.x).eq(tk.mul(vars.vx).add(vars.x)));
    solver.add(tk.mul(h.vy).add(h.y).eq(tk.mul(vars.vy).add(vars.y)));
    solver.add(tk.mul(h.vz).add(h.z).eq(tk.mul(vars.vz).add(vars.z)));
}

const solved = await solver.check(); // Actually solves the thing
if (solved === "unsat") throw new Error("Unable to solve equation");
const model = solver.model();

function parseRatNum(expr) {
    const value = expr.value();
    const num = Number(value.numerator.toString().replace("n", ""));
    const denom = Number(value.denominator.toString().replace("n", ""));
    return num / denom;
}

const bean = parseRatNum(model.eval(vars.x.add(vars.y).add(vars.z)));

console.timeEnd("t");

console.log(bean);
