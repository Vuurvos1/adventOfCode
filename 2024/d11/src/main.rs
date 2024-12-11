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

fn step_stone(digit: u64, count: u64, step: u16, cache: &mut HashMap<(u64, u16), u64>) -> u64 {
    if step == 0 {
        return count + 1;
    }

    if digit == 0 {
        // not caching the 0 - 1 seems to be faster
        return step_stone(1, count, step - 1, cache);
    }

    if let Some(c) = cache.get(&(digit, step)) {
        return *c;
    }

    let len = digit.ilog10() + 1;
    if len % 2 == 0 {
        // push halfs to new stones
        let divisor = 10_u64.pow(len / 2);
        let left = digit / divisor;
        let right = digit % divisor;

        let c =
            step_stone(left, count, step - 1, cache) + step_stone(right, count, step - 1, cache);
        cache.insert((digit, step), c);
        return c;
    }

    let c = step_stone(digit * 2024, count, step - 1, cache);
    cache.insert((digit, step), c);
    return c;
}

fn p1() {
    let stones: Vec<u64> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .split_whitespace()
        .map(|s| s.parse::<u64>().unwrap())
        .collect();

    let mut cache: HashMap<(u64, u16), u64> = HashMap::new();
    let s: u64 = stones
        .iter()
        .map(|stone| step_stone(*stone, 0, 25, &mut cache))
        .sum();

    println!("Hello, world! {}", s);
}

fn p2() {
    let stones: Vec<u64> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .split_whitespace()
        .map(|s| s.parse::<u64>().unwrap())
        .collect();

    let mut cache: HashMap<(u64, u16), u64> = HashMap::new();
    let s: u64 = stones
        .iter()
        .map(|stone| step_stone(*stone, 0, 75, &mut cache))
        .sum();

    println!("Hello, world! {}", s);
}
