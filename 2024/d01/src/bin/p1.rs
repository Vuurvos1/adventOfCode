use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");

    let mut sum: u32 = 0;

    let mut c1 = Vec::new();
    let mut c2 = Vec::new();

    for line in contents.lines() {
        let mut split = line.split_whitespace().map(|x| x.parse::<u32>().unwrap());
        c1.push(split.next());
        c2.push(split.next());
    }

    c1.sort();
    c2.sort();

    for (a, b) in c1.iter().zip(c2.iter()) {
        let diff = a.unwrap() as i32 - b.unwrap() as i32;
        sum += diff.abs() as u32;
    }

    println!("Hello, world! {}", sum);
}
