document
  .querySelector('pre')
  .textContent.trim()
  .split('')
  .reduce((acc, char) => {
    if (char === '(') acc++;
    if (char === ')') acc--;
    return acc;
  }, 0);
