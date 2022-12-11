import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

const monkeys = [];

class Monkey {
  constructor(items, operation, test, trueMonkey, falseMonkey) {
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;
    this.inspections = 0;
  }

  evaluate() {
    const tmpItems = [...this.items];
    for (let i = 0; i < tmpItems.length; i++) {
      let item = this.items.shift();
      item = this.operation(item);
      item = Math.floor(item / 3);
      this.inspections++;
      if (item % this.test === 0) {
        monkeys[this.trueMonkey].addItem(item);
      } else {
        monkeys[this.falseMonkey].addItem(item);
      }
    }
  }

  addItem(item) {
    this.items.push(item);
  }

  get getInspections() {
    return this.inspections;
  }
}

// maybe write an actual parser
monkeys.push(
  new Monkey(
    [93, 54, 69, 66, 71],
    (old) => {
      return old * 3;
    },
    7,
    7,
    1
  ),
  new Monkey(
    [89, 51, 80, 66],
    (old) => {
      return old * 17;
    },
    19,
    5,
    7
  ),
  new Monkey(
    [90, 92, 63, 91, 96, 63, 64],
    (old) => {
      return old + 1;
    },
    13,
    4,
    3
  ),
  new Monkey(
    [65, 77],
    (old) => {
      return old + 2;
    },
    3,
    4,
    6
  ),
  new Monkey(
    [76, 68, 94],
    (old) => {
      return old * old;
    },
    2,
    0,
    6
  ),
  new Monkey(
    [86, 65, 66, 97, 73, 83],
    (old) => {
      return old + 8;
    },
    11,
    2,
    3
  ),
  new Monkey(
    [78],
    (old) => {
      return old + 6;
    },
    17,
    0,
    1
  ),
  new Monkey(
    [89, 57, 59, 61, 87, 55, 55, 88],
    (old) => {
      return old + 7;
    },
    5,
    2,
    5
  )
);

for (let i = 0; i < 20; i++) {
  for (const monkey of monkeys) {
    monkey.evaluate();
  }
}

const sorted = monkeys.sort((a, b) => b.inspections - a.inspections);
console.log(sorted[0].inspections * sorted[1].inspections);
