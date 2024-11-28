use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");

    let mut sum: u32 = 0;

    for line in contents.lines() {
        let split = line.split_whitespace().map(|x| x.parse::<u32>().unwrap());
        for (i, num) in split.clone().enumerate() {
            for (j, num2) in split.clone().enumerate() {
                if i == j {
                    continue;
                }
                if num % num2 == 0 {
                    sum += num / num2
                }
            }
        }
    }

    println!("Hello, world! {}", sum);
}
