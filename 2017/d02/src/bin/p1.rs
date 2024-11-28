use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");

    let mut sum: u32 = 0;

    for line in contents.lines() {
        let split = line.split_whitespace().map(|x| x.parse::<u32>().unwrap());
        let diff = split.clone().max().unwrap() - split.min().unwrap();
        sum += diff;
    }

    println!("Hello, world! {}", sum);
}
