import fs from 'node:fs';

async function main() {
  const inputFile = fs.readFileSync('input.txt', 'utf8');
  const input = inputFile.split('\r\n').slice(0, -1);

  let coords = input.map((x) =>
    x
      .replace(' -> ', ',')
      .split(',')
      .map((x) => Number(x))
  );
  // console.log(coords);

  // get max x
  // get max y
  let maxX = 0;
  let maxY = 0;
  for (const coord of coords) {
    if (coord[0] > maxX) {
      maxX = coord[0];
    }
    if (coord[1] > maxY) {
      maxY = coord[1];
    }
    if (coord[2] > maxX) {
      maxX = coord[2];
    }
    if (coord[3] > maxY) {
      maxY = coord[3];
    }
  }

  // console.log(maxX, maxY);

  let board = [];

  // generate 2d array
  for (let x = 0; x < maxX + 1; x++) {
    board.push(new Array(maxY + 1).fill(0));
  }

  // loop through coords and draw the lines (add one to the slots6)

  for (const coord of coords) {
    const startX = Math.min(coord[0], coord[2]);
    const startY = Math.min(coord[1], coord[3]);
    const dx = Math.abs(coord[2] - coord[0]);
    const dy = Math.abs(coord[1] - coord[3]);

    // diagonals
    if (dx > 0 && dy > 0) {
      // console.log(startX, startY);

      // extra bit for 2nd task
      let sx = coord[0];
      let sy = coord[1];

      let d = coord[1] - coord[3];
      if (coord[0] > coord[2]) {
        // swap coords
        sx = coord[2];
        sy = coord[3];

        d = coord[3] - coord[1];
      }

      // console.log(sx, sy);

      if (d < 0) {
        // down
        // console.log('down');
        for (let x = 0; x <= dx; x++) {
          board[sx + x][sy + x] += 1;
        }
      } else {
        // console.log('up');
        // up
        for (let x = 0; x <= dx; x++) {
          board[sx + x][sy - x] += 1;
        }
      }
      continue;
    }

    for (let x = 0; x <= dx; x++) {
      for (let y = 0; y <= dy; y++) {
        // console.log(startX + x, startY + y);
        // console.log(board[startX + x][startY + y]);
        board[startX + x][startY + y] += 1;
      }
    }
  }

  // count board
  let out = 0;
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y <= board[x].length; y++) {
      if (board[x][y] > 1) {
        out++;
      }
    }
  }

  console.log(board);

  return out;
  // toop trough grid and count
}

console.log(await main());
