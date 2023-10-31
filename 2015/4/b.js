import { createHash } from 'node:crypto';

const key = 'yzbqklnj';

let i = 282749; // I know there are no hits before this because of p1

while (true) {
  const hasher = createHash('md5');
  const hash = hasher.update(key + String(i)).digest('hex');

  if (hash.startsWith('000000')) {
    console.log(hash, i);
    break;
  }

  i++;
}
