import fs from 'node:fs';
import * as lib from 'lib';
import clipboard from 'clipboardy';

const input = fs.readFileSync('./2023/12/input.txt', 'utf8').trim().split('\n');

let output = 0;



console.info(output)
clipboard.writeSync(String(output));
