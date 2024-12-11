use std::{collections::HashMap, fs, time::Instant};

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

fn p1() {
    let mut stones: Vec<u64> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .split_whitespace()
        .map(|s| s.parse::<u64>().unwrap())
        .collect();

    for _ in 0..25 {
        let mut new_stones: Vec<u64> = Vec::new();
        for s in stones {
            if s == 0 {
                new_stones.push(1);
                continue;
            }

            let str = s.to_string();
            if str.len() % 2 == 0 {
                // push halfs to new stones
                let (first, last) = str.split_at(str.len() / 2);
                new_stones.push(first.parse::<u64>().unwrap());
                new_stones.push(last.parse::<u64>().unwrap());
                continue;
            }

            new_stones.push(s * 2024);
        }
        stones = new_stones;
    }

    println!("Hello, world! {}", stones.len());
}

fn step_stone(digit: u64, count: u64, step: u32, cache: &mut HashMap<String, u64>) -> u64 {
    if step == 0 {
        return count + 1;
    }

    let key = format!("{}-{}", digit, step);
    if cache.contains_key(&key) {
        return *cache.get(&key).unwrap();
    }

    if digit == 0 {
        let c = step_stone(1, count, step - 1, cache);
        cache.insert(key, c);
        return c;
    }

    let str = digit.to_string();
    if str.len() % 2 == 0 {
        // push halfs to new stones
        let (first, last) = str.split_at(str.len() / 2);
        let c = step_stone(first.parse::<u64>().unwrap(), count, step - 1, cache)
            + step_stone(last.parse::<u64>().unwrap(), count, step - 1, cache);
        cache.insert(key, c);
        return c;
    }

    let c = step_stone(digit * 2024, count, step - 1, cache);
    cache.insert(key, c);
    return c;
}

fn p2() {
    let stones: Vec<u64> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .split_whitespace()
        .map(|s| s.parse::<u64>().unwrap())
        .collect();

    let mut cache: HashMap<String, u64> = HashMap::new();
    let s: u64 = stones
        .iter()
        .map(|stone| step_stone(*stone, 0, 75, &mut cache))
        .sum();

    println!("Hello, world! {}", s);
}
