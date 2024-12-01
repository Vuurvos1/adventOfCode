use std::{collections::HashMap, fs};

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");

    let mut sum: u32 = 0;

    let mut c1 = Vec::new();
    let mut c2 = Vec::new();

    for line in contents.lines() {
        let mut split = line.split_whitespace().map(|x| x.parse::<u32>().unwrap());
        c1.push(split.next().unwrap());
        c2.push(split.next().unwrap());
    }

    let mut occurances: HashMap<u32, u32> = HashMap::new();
    for b in c2 {
        let count = occurances.entry(b).or_insert(0);
        *count += 1;
    }

    for a in c1 {
        let count = occurances.entry(a).or_default();
        sum += *count * a;
    }

    println!("Hello, world! {}", sum);
}
