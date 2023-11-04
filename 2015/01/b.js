document
  .querySelector('pre')
  .textContent.trim()
  .split('')
  .reduce((acc, char, i) => {
    if (char === '(') acc++;
    if (char === ')') acc--;

    if (acc === -1) console.log(i + 1); // first log

    return acc;
  }, 0);
