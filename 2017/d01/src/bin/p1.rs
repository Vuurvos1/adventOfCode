use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");

    let mut sum: u32 = 0;

    for i in 0..contents.len() - 1 {
        let curr = contents.chars().nth(i).unwrap();
        let next = contents.chars().nth(i + 1).unwrap();

        if curr == next {
            sum += curr.to_digit(10).unwrap();
        }
    }

    if contents.chars().nth(0) == contents.chars().nth(contents.len() - 1) {
        sum += contents.chars().nth(0).unwrap().to_digit(10).unwrap();
    }

    println!("Hello, world! {}", sum);
}
