document
  .querySelector('pre')
  .textContent.trim()
  .split('\n')
  .reduce((acc, line) => {
    const values = line.split('x').map((v) => Number(v));
    const [l, w, h] = values.sort((a, b) => a - b);

    const volume = l * w * h;
    const length = l * 2 + w * 2;

    return acc + volume + length;
  }, 0);
