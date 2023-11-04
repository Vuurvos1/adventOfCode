function isNiceString(str) {
  let ok = false;
  for (let i = 0; i < str.length - 2; i++) {
    const subString = str.slice(i, i + 2);
    if (str.indexOf(subString, i + 2) > 0) {
      ok = true;
      break;
    }
  }

  if (!ok) return false;

  for (let i = 0; i < str.length - 2; i++) {
    if (str[i] === str[i + 2]) return true;
  }

  return false;
}

let niceCount = 0;

const parsedInput = document
  .querySelector('pre')
  .textContent.trim()
  .split('\n');

for (const value of parsedInput) {
  if (isNiceString(value)) niceCount++;
}

console.log(niceCount);
