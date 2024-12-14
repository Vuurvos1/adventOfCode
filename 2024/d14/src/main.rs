use std::{
    fs::{self, OpenOptions},
    io::Write,
    time::Instant,
};

use regex::Regex;

fn main() {
    println!("Hello, world!");

    let mut now = Instant::now();
    p1();
    let mut elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    now = Instant::now();
    p2();
    elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

const WIDTH: i32 = 101;
const HEIGHT: i32 = 103;
// const WIDTH: i32 = 11;
// const HEIGHT: i32 = 7;

fn walk_robot(p: (i32, i32), v: (i32, i32), steps: i32) -> (i32, i32) {
    let x = (p.0 + (v.0 * steps) + steps * WIDTH) % WIDTH;
    let y = (p.1 + (v.1 * steps) + steps * HEIGHT) % HEIGHT;

    (x, y)
}

fn p1() {
    let re = Regex::new(r"-?\d+").expect("Invalid regex");
    let input: Vec<Vec<i32>> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| {
            let digits: Vec<i32> = re
                .find_iter(line) // Find all matches
                .filter_map(|mat| mat.as_str().parse::<i32>().ok()) // Attempt to parse to i32, filter out errors
                .collect();
            digits
        })
        .collect();

    let mut end_positions: Vec<(i32, i32)> = Vec::new();
    for robot in input {
        let [px, py, vx, vy] = robot.try_into().unwrap();
        let end_position = walk_robot((px, py), (vx, vy), 100);
        end_positions.push(end_position);
    }

    let mut quadrant_scores = vec![0, 0, 0, 0];
    for pos in end_positions {
        let x = pos.0;
        let y = pos.1;

        if x < WIDTH / 2 && y < HEIGHT / 2 {
            quadrant_scores[0] += 1;
        } else if x > WIDTH / 2 && y < HEIGHT / 2 {
            quadrant_scores[1] += 1;
        } else if x < WIDTH / 2 && y > HEIGHT / 2 {
            quadrant_scores[2] += 1;
        } else if x > WIDTH / 2 && y > HEIGHT / 2 {
            quadrant_scores[3] += 1;
        }
    }

    // multiply together
    let sum: u64 = quadrant_scores.iter().product();
    println!("Hello, world! {}", sum);
}

fn points_to_grid_string(points: &Vec<(i32, i32)>) -> String {
    let mut grid = vec![vec!['.'; WIDTH as usize]; HEIGHT as usize];

    for point in points {
        grid[point.1 as usize][point.0 as usize] = '#';
    }

    let mut grid_string = String::new();
    for row in grid {
        grid_string.push_str(&row.iter().collect::<String>());
        grid_string.push('\n');
    }

    grid_string
}

fn p2() {
    let re = Regex::new(r"-?\d+").expect("Invalid regex");
    let input: Vec<Vec<i32>> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| {
            let digits: Vec<i32> = re
                .find_iter(line) // Find all matches
                .filter_map(|mat| mat.as_str().parse::<i32>().ok()) // Attempt to parse to i32, filter out errors
                .collect();
            digits
        })
        .collect();

    let _file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open("./src/tmp.txt")
        .expect("Could not clear file");

    let mut out_file = OpenOptions::new()
        .append(true)
        .create(true)
        .open("./src/tmp.txt")
        .expect("Could not open file");

    // for this part I noticed when plotting a bunch of grids that the robots tended to group together horizontally or vertically
    // which seemed to happen at a certian interval for me this was
    // vertical:   y = 101x + 11
    // horizontal: y = 103x + 65
    // then I just plotted a bunch of grids with the intervals till I found the right one

    for i in (65..15000).step_by(103) {
        let mut end_positions: Vec<(i32, i32)> = Vec::new();
        for robot in input.clone() {
            let [px, py, vx, vy] = robot.try_into().unwrap();
            let end_position = walk_robot((px, py), (vx, vy), i);
            end_positions.push(end_position);
        }

        let grid_string = points_to_grid_string(&end_positions);

        out_file
            .write_all(format!("- {}\n", i).as_bytes())
            .expect("Could not write to file");

        out_file
            .write_all(grid_string.as_bytes())
            .expect("Could not write to file");

        // append 2 new lines
        out_file
            .write_all("\n\n".as_bytes())
            .expect("Could not write to file");
    }
}
