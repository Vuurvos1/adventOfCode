import { createHash } from 'node:crypto';

const key = 'yzbqklnj';

let i = 0;
while (true) {
  const hasher = createHash('md5');
  const hash = hasher.update(key + String(i)).digest('hex');

  if (hash.slice(0, 5) === '00000') {
    console.log(hash, i);
    break;
  }

  i++;
}
