document
  .querySelector('pre')
  .textContent.trim()
  .split('\n')
  .reduce((acc, line) => {
    const values = line.split('x').map((v) => Number(v));
    const [l, w, h] = values;

    const sides = [l * w, w * h, h * l];
    const min = Math.min(...sides);

    const area = sides.reduce((acc, side) => acc + 2 * side, 0);

    return acc + area + min;
  }, 0);
