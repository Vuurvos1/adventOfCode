use std::fs;

fn main() {
    let contents =
        fs::read_to_string("./input.txt").expect("Should have been able to read the file");
    let offset = contents.len() / 2;

    let mut sum: u32 = 0;

    for i in 0..contents.len() - 1 {
        let curr = contents.chars().nth(i).unwrap();
        let next = contents.chars().nth((i + offset) % contents.len()).unwrap();

        if curr == next {
            sum += curr.to_digit(10).unwrap();
        }
    }

    if contents.chars().nth(contents.len() - 1) == contents.chars().nth(offset) {
        sum += contents
            .chars()
            .nth(contents.len() - 1)
            .unwrap()
            .to_digit(10)
            .unwrap();
    }

    println!("Hello, world! {}", sum);
}
