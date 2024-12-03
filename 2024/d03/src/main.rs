use std::fs;

use regex::Regex;

fn main() {
    println!("Hello, world!");
}

#[test]
fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let re = Regex::new(r"mul\(([0-9]{1,3}),([0-9]{1,3})\)").expect("Invalid regex");

    let mut sum = 0;
    for line in input.lines() {
        for (_, [d1, d2]) in re.captures_iter(line).map(|c| c.extract()) {
            sum += d1.parse::<i32>().unwrap() * d2.parse::<i32>().unwrap()
        }
    }

    println!("Hello, world! {}", sum);
}

#[test]
fn p2() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let re = Regex::new(r"(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\))").expect("Invalid regex");
    let digit_re = Regex::new(r"(\d+),(\d+)").expect("Invalid digit regex");

    let mut sum = 0;
    let mut mult = true;
    for line in input.lines() {
        for (_, [token]) in re.captures_iter(line).map(|c| c.extract()) {
            match token {
                "do()" => mult = true,
                "don't()" => mult = false,
                _ => {
                    if !mult {
                        continue;
                    }

                    for (_, [d1, d2]) in digit_re.captures_iter(token).map(|c| c.extract()) {
                        sum += d1.parse::<i32>().unwrap() * d2.parse::<i32>().unwrap()
                    }
                }
            }
        }
    }

    println!("Hello, world! {}", sum);
}
