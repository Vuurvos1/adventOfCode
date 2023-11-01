function isNiceString(str) {
  if (
    str.includes('ab') ||
    str.includes('cd') ||
    str.includes('pq') ||
    str.includes('xy')
  ) {
    return false;
  }

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let vowelCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) vowelCount++;
  }

  if (vowelCount < 3) return false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) return true;
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
