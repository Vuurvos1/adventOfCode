import fs from 'node:fs';

const inputFile = fs.readFileSync('input.txt', 'utf8');
let input = inputFile.split('\n').slice(0, -1);

let nodes = [];
let ptr = 0;

const createNode = (params) => {
  const id = nodes.length;
  nodes.push({ ...params, id: id }); // type, name, size, parentId
  return id;
};

const createNewNode = (name, parentId) => {
  const tmp = nodes.filter(
    (n) => n.name === name && n.parentId === parentId && n.type === 'dir'
  );
  if (tmp.length > 0) return tmp[0].id; // prevent double nodes
  return createNode({ type: 'dir', name, parentId });
};

const dirSize = (id) =>
  nodes
    .filter((n) => n.parentId == id)
    .reduce((size, n) => {
      if (n.type === 'file') return size + n.size;
      return size + dirSize(n.id);
    }, 0);

createNode({ type: 'dir', name: '' });

for (let i = 0; i < input.length; i++) {
  const cmd = input[i].split(' ');

  if (cmd[0] == '$') {
    if (cmd[1] == 'cd') {
      if (cmd[2] == '..') {
        // back up
        ptr = nodes[ptr].parentId; // prevent error?
      } else if (cmd[2] == '/') {
        ptr = 0; // back to root
      } else {
        // cd dir
        ptr = createNewNode(cmd[2], ptr);
      }
    } // else ls
  } else {
    if (cmd[0] == 'dir') {
      createNewNode(cmd[0], ptr);
    } else {
      createNode({
        type: 'file',
        name: cmd[1],
        size: Number(cmd[0]),
        parentId: ptr,
      });
    }
  }
}

// console.log(nodes);

let out = 0;
nodes.forEach((n) => {
  if (n.type == 'dir') {
    let size = dirSize(n.id);
    if (size <= 100000) {
      out += size;
    }
    nodes[n.id].size = size;
  }
});

console.log(out);

const freeSpace = 70000000 - nodes[0].size;
console.log(
  nodes
    .filter((n) => n.type == 'dir' && freeSpace + n.size >= 30000000)
    .sort((a, b) => a.size - b.size)[0].size
);
