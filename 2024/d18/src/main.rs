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

fn inbounds(x: i32, y: i32, size: u32) -> bool {
    x >= 0 && x < size as i32 && y >= 0 && y < size as i32
}

fn p1() {
    let grid: HashSet<(u32, u32)> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .take(1024)
        .map(|line| {
            let bits = line
                .split(',')
                .map(|x| x.parse().unwrap())
                .collect::<Vec<u32>>();
            (bits[0], bits[1])
        })
        .collect();

    let directions = [(0, 1), (1, 0), (0, -1), (-1, 0)];
    let start_pos = (0, 0);
    let finish_pos = (70, 70);

    let mut cache: HashMap<(i32, i32), u64> = HashMap::new();
    let mut stack: VecDeque<((i32, i32), u64)> = VecDeque::new();
    let mut min: u64 = u64::MAX;
    stack.push_back((start_pos, 0));

    while stack.len() > 0 {
        let (pos, score) = stack.pop_front().unwrap();

        if pos == finish_pos {
            min = min.min(score);
            break;
        }

        if let Some(&old_score) = cache.get(&pos) {
            if score >= old_score {
                continue;
            }
        }
        cache.insert((pos.0, pos.1), score);

        for &(dy, dx) in &directions {
            let new_pos = (pos.0 + dx, pos.1 + dy);
            if inbounds(new_pos.1, new_pos.0, 71)
                && !grid.contains(&(new_pos.0 as u32, new_pos.1 as u32))
            {
                stack.push_back((new_pos, score + 1));
            }
        }
    }

    println!("Hello, world! {}", min);
}

fn p2() {
    let input: Vec<(u32, u32)> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| {
            let bits = line
                .split(',')
                .map(|x| x.parse().unwrap())
                .collect::<Vec<u32>>();
            (bits[0], bits[1])
        })
        .collect();

    let directions = [(0, 1), (1, 0), (0, -1), (-1, 0)];
    let start_pos = (0, 0);
    let finish_pos = (70, 70);

    let mut cache: HashSet<(i32, i32)> = HashSet::new();
    let mut stack: VecDeque<(i32, i32)> = VecDeque::new();

    let mut blocked: (u32, u32) = (0, 0);
    let mut block_index = 0;

    let mut search_min = 1024;
    let mut search_max = input.len() as i32;

    loop {
        let mut found = false;
        cache.clear();
        stack.clear();
        stack.push_back(start_pos);

        let search_mid = (search_min + search_max) / 2 + 1;
        let map_bytes: HashSet<(u32, u32)> =
            input.iter().take(search_mid as usize).cloned().collect();

        while stack.len() > 0 && !found {
            let pos = stack.pop_front().unwrap();

            if pos.0 == finish_pos.0 && pos.1 == finish_pos.1 {
                found = true;
                break;
            }

            if cache.contains(&pos) {
                continue;
            }
            cache.insert(pos);

            for &(dy, dx) in &directions {
                let new_pos = (pos.0 + dx, pos.1 + dy);
                if inbounds(new_pos.1, new_pos.0, 71)
                    && !map_bytes.contains(&(new_pos.0 as u32, new_pos.1 as u32))
                {
                    stack.push_back(new_pos);
                }
            }
        }

        if found {
            search_min = search_mid;
        } else {
            search_max = search_mid;
        }

        if search_max - search_min <= 1 {
            blocked = input[search_min as usize];
            block_index = search_min;
            break;
        }
    }

    println!("Hello, world! {},{} {}", blocked.0, blocked.1, block_index);
}
