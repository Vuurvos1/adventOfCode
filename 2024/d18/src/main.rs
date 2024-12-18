use std::{
    collections::{HashMap, HashSet, VecDeque},
    fs,
    time::Instant,
};

fn main() {
    println!("Hello, world!");

    let now = Instant::now();
    p1();
    let elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    let now = Instant::now();
    p2();
    let elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

fn inbounds<T>(x: i32, y: i32, grid: &Vec<Vec<T>>) -> bool {
    let height = grid.len();
    let width = grid[0].len();
    x >= 0 && x < width as i32 && y >= 0 && y < height as i32
}

// butchered version of d16
fn p1() {
    let re = regex::Regex::new(r"(\d+),(\d+)").unwrap();
    let bytes: Vec<(u32, u32)> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| {
            let caps = re.captures(line).unwrap();
            (
                caps.get(1).unwrap().as_str().parse().unwrap(),
                caps.get(2).unwrap().as_str().parse().unwrap(),
            )
        })
        .collect();

    // 2d vec of 70 x 70
    let mut grid = vec![vec![' '; 71]; 71];

    for i in 0..1024 {
        grid[bytes[i].0 as usize][bytes[i].1 as usize] = '#';
    }

    let start_pos = (0, 0);
    let finish_pos = (70, 70);

    let mut cache: HashMap<(i32, i32, i32, i32), u64> = HashMap::new();
    let mut stack: VecDeque<((i32, i32), (i32, i32), u64)> = VecDeque::new();
    let mut min: u64 = u64::MAX;
    stack.push_back((start_pos, (0, 1), 0));

    while stack.len() > 0 {
        let (pos, dir, score) = stack.pop_front().unwrap();

        // update cache score if current score is lower
        if cache.contains_key(&(pos.0, pos.1, dir.0, dir.1)) {
            let old_score = cache.get(&(pos.0, pos.1, dir.0, dir.1)).unwrap();
            if score >= *old_score {
                continue;
            }
        }
        cache.insert((pos.0, pos.1, dir.0, dir.1), score);

        if score > min {
            continue;
        }

        if pos.0 == finish_pos.0 && pos.1 == finish_pos.1 {
            min = min.min(score);
            continue;
        }

        // move forward for 1 cost
        let new_pos = (pos.0 + dir.0, pos.1 + dir.1);
        if inbounds(new_pos.1, new_pos.0, &grid)
            && grid[new_pos.0 as usize][new_pos.1 as usize] != '#'
        {
            stack.push_back((new_pos, dir, score + 1));
        }

        // rotate clockwise or counterclockwise for 1000 cost
        let new_dir = (dir.1, -dir.0);
        stack.push_back((pos, new_dir, score));
        let new_dir = (-dir.1, dir.0);
        stack.push_back((pos, new_dir, score));
    }

    println!("Hello, world! {}", min);
}

fn print_grid(grid: &Vec<Vec<char>>) {
    for row in grid {
        for cell in row {
            print!("{}", cell);
        }
        println!();
    }
}

// even more butchered version of d16
fn p2() {
    let re = regex::Regex::new(r"(\d+),(\d+)").unwrap();
    let bytes: Vec<(u32, u32)> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| {
            let caps = re.captures(line).unwrap();
            (
                caps.get(1).unwrap().as_str().parse().unwrap(),
                caps.get(2).unwrap().as_str().parse().unwrap(),
            )
        })
        .collect();

    // 2d vec of 70 x 70
    let mut grid = vec![vec![' '; 71]; 71];

    for i in 0..1024 {
        grid[bytes[i].0 as usize][bytes[i].1 as usize] = '#';
    }

    let start_pos = (0, 0);
    let finish_pos = (70, 70);

    let mut cache: HashMap<(i32, i32, i32, i32), u64> = HashMap::new();
    let mut stack: VecDeque<((i32, i32), (i32, i32), u64)> = VecDeque::new();

    let mut blocked: (u32, u32) = (0, 0);
    let mut block_index = 0;
    for i in 1024..bytes.len() {
        grid[bytes[i].0 as usize][bytes[i].1 as usize] = '#';
        let mut found = false;
        let mut min = u64::MAX;
        cache.clear();
        stack.clear();
        stack.push_back((start_pos, (0, 1), 0));

        if i % 100 == 0 {
            println!("{}%", i);
        }

        while stack.len() > 0 && !found {
            let (pos, dir, score) = stack.pop_front().unwrap();

            // update cache score if current score is lower
            if cache.contains_key(&(pos.0, pos.1, dir.0, dir.1)) {
                let old_score = cache.get(&(pos.0, pos.1, dir.0, dir.1)).unwrap();
                if score >= *old_score {
                    continue;
                }
            }
            cache.insert((pos.0, pos.1, dir.0, dir.1), score);

            if score > min {
                continue;
            }

            if pos.0 == finish_pos.0 && pos.1 == finish_pos.1 {
                min = min.min(score);
                found = true;
                continue;
            }

            // move forward for 1 cost
            let new_pos = (pos.0 + dir.0, pos.1 + dir.1);
            if inbounds(new_pos.1, new_pos.0, &grid)
                && grid[new_pos.0 as usize][new_pos.1 as usize] != '#'
            {
                stack.push_back((new_pos, dir, score + 1));
            }

            // rotate clockwise or counterclockwise for 1000 cost
            let new_dir = (dir.1, -dir.0);
            stack.push_back((pos, new_dir, score));
            let new_dir = (-dir.1, dir.0);
            stack.push_back((pos, new_dir, score));
        }
        if !found {
            blocked = bytes[i];
            block_index = i;
            break;
        }
    }

    print_grid(&grid);

    println!("Hello, world! {:?} {}", blocked, block_index);
}
