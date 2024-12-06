use std::{collections::HashSet, fs};

fn main() {
    println!("Hello, world!");
}

#[test]
fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    // y, x grid
    let grid = input
        .split("\n")
        .map(|line| line.chars().collect::<Vec<char>>())
        .collect::<Vec<Vec<char>>>();

    let mut pos: (i32, i32) = (0, 0);
    for row in 0..grid.len() {
        for col in 0..grid[row].len() {
            if grid[row][col] == '^' {
                pos = (row as i32, col as i32);
            }
        }
    }

    println!("{:?}", pos);

    let mut direction: (i32, i32) = (-1, 0); // up
    let mut visited: HashSet<(i32, i32)> = HashSet::new();

    loop {
        if pos.0 < 0
            || pos.0 >= grid.len() as i32 - 1
            || pos.1 < 0
            || pos.1 >= grid[0].len() as i32 - 1
        {
            break;
        }

        pos = (pos.0 + direction.0, pos.1 + direction.1);

        // turn right if # else to forward
        if grid[pos.0 as usize][pos.1 as usize] == '#' {
            pos = (pos.0 - direction.0, pos.1 - direction.1);
            direction = (direction.1, -direction.0);
        }

        visited.insert(pos);
    }

    println!("Hello, world! {}", visited.len());
}

#[test]
fn p2() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    // y, x grid
    let grid = input
        .split("\n")
        .map(|line| line.chars().collect::<Vec<char>>())
        .collect::<Vec<Vec<char>>>();

    let mut pos: (i32, i32) = (0, 0);
    for row in 0..grid.len() {
        for col in 0..grid[row].len() {
            if grid[row][col] == '^' {
                pos = (row as i32, col as i32);
            }
        }
    }

    let start_pos = pos.clone();
    let mut blockades = 0;

    for y in 0..grid.len() {
        for x in 0..grid[y].len() {
            if grid[y][x] != '.' {
                continue;
            }

            let mut i = 0;
            pos = start_pos.clone();
            let mut direction = (-1, 0);

            loop {
                i += 1;
                if i > 10000 {
                    // println!("stuck");
                    blockades += 1;
                    break;
                }

                let next_pos = (pos.0 + direction.0, pos.1 + direction.1);
                if next_pos.0 < 0
                    || next_pos.0 >= grid.len() as i32
                    || next_pos.1 < 0
                    || next_pos.1 >= grid[0].len() as i32
                {
                    // println!("Ouf of bounds");
                    break;
                }

                if grid[next_pos.0 as usize][next_pos.1 as usize] == '#'
                    || y == next_pos.0 as usize && x == next_pos.1 as usize
                {
                    // turn right
                    direction = (direction.1, -direction.0);
                } else {
                    // move forward
                    pos = next_pos;
                }
            }
        }
    }

    println!("Hello, world! {}", blockades);
}
