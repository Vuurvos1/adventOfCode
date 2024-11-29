use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");

    let mut sum: u32 = 0;

    for line in contents.lines() {}

    println!("Hello, world! {}", sum);
}
