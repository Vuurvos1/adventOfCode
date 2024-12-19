use std::{collections::HashMap, fs, time::Instant};

fn main() {
    let now = Instant::now();
    p1();
    let elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    let now = Instant::now();
    p2();
    let elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

fn create_towel(towel: String, patterns: &Vec<String>) -> i32 {
    if towel == "" {
        return 1;
    }

    for pattern in patterns {
        // front to back
        if towel.starts_with(pattern.as_str()) {
            let new_towel = towel.replacen(pattern.as_str(), "", 1);
            let c = create_towel(new_towel, patterns);
            if c > 0 {
                return c;
            }
        }
    }

    0
}

fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();
    let split_input = input.split("\n\n").collect::<Vec<&str>>();

    let mut patterns = String::from(split_input[0])
        .split(", ")
        .map(|x| x.to_string())
        .collect::<Vec<String>>();
    patterns.sort_by(|a, b| a.len().cmp(&b.len()));
    let designs = String::from(split_input[1])
        .lines()
        .map(|x| x.to_string())
        .collect::<Vec<String>>();

    let mut count = 0;
    for design in designs {
        let c = create_towel(design, &patterns);
        if c != 0 {
            count += 1
        }
    }

    println!("Hello, world! {}", count);
}

fn towel_permutations(
    towel: String,
    patterns: &Vec<String>,
    cache: &mut HashMap<String, u64>,
) -> u64 {
    let mut count = 0;

    if towel == "" {
        return 1;
    }

    if let Some(c) = cache.get(&towel) {
        return *c;
    }

    for pattern in patterns {
        if towel.starts_with(pattern.as_str()) {
            let new_towel = towel.replacen(pattern.as_str(), "", 1);
            count += towel_permutations(new_towel, patterns, cache);
        }
    }

    cache.insert(towel, count);
    count
}

fn p2() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();
    let split_input = input.split("\n\n").collect::<Vec<&str>>();

    let patterns = String::from(split_input[0])
        .split(", ")
        .map(|x| x.to_string())
        .collect::<Vec<String>>();
    let designs = String::from(split_input[1])
        .lines()
        .map(|x| x.to_string())
        .collect::<Vec<String>>();

    let mut count: u64 = 0;
    let mut cache: HashMap<String, u64> = HashMap::with_capacity(10000);

    for design in designs {
        cache.clear();
        count += towel_permutations(design, &patterns, &mut cache);
    }

    println!("Hello, world! {}", count);
}
