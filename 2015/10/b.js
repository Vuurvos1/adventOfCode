let input = '3113322113';

for (let i = 0; i < 50; i++) {
  const chars = input.split('');
  let output = '';
  let count = 1;

  for (let j = 0; j < chars.length; j++) {
    const char = chars[j];

    if (char === chars[j + 1]) {
      count++;
    } else {
      output += `${count}${char}`;
      count = 1;
    }
  }

  input = output;
}

console.log(input.length);
