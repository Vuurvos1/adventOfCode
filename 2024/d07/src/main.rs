use std::{fs, time::Instant};

fn main() {
    let mut now = Instant::now();
    p1();
    let mut elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    now = Instant::now();
    p2();
    elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

// recursive function to try all combinations of operations on all digits
fn math_numbers(sum: i64, awnser: i64, digits: &Vec<i64>, operations: &Vec<char>) -> bool {
    if digits.len() == 0 {
        return sum == awnser;
    }

    // prune branches that are already too big
    if sum > awnser {
        return false;
    }

    let mut new_digits = digits.clone();
    let digit = new_digits.remove(0);

    for op in operations {
        let mut new_sum = sum;
        match op {
            '+' => new_sum += digit,
            '*' => new_sum *= digit,
            '|' => new_sum = sum * 10_i64.pow(digit.to_string().len() as u32) + digit,
            _ => panic!("Unknown operation"),
        }

        let new_result = math_numbers(new_sum, awnser, &new_digits, operations);
        if new_result {
            return new_result;
        }
    }

    return false;
}

fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let operations = vec!['+', '*'];

    let mut sum = 0;

    for line in input.lines() {
        // get all numbers in line
        let s = line.split(": ").collect::<Vec<&str>>();
        let awnser = s[0].parse::<i64>().unwrap();
        let digits = s[1]
            .split(" ")
            .map(|x| x.parse::<i64>().unwrap())
            .collect::<Vec<i64>>();

        // try all combinations of operations on all digits to see if one procudes the awnser
        let result = math_numbers(digits[0], awnser, &digits[1..].to_vec(), &operations);
        if result {
            sum += awnser;
        }
    }

    println!("Hello, world! {}", sum);
}

fn p2() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let operations = vec!['+', '*', '|'];

    let mut sum = 0;

    for line in input.lines() {
        // get all numbers in line
        let s = line.split(": ").collect::<Vec<&str>>();
        let awnser = s[0].parse::<i64>().unwrap();
        let digits = s[1]
            .split(" ")
            .map(|x| x.parse::<i64>().unwrap())
            .collect::<Vec<i64>>();

        // try all combinations of operations on all digits to see if one procudes the awnser
        let result = math_numbers(digits[0], awnser, &digits[1..].to_vec(), &operations);
        if result {
            sum += awnser;
        }
    }

    println!("Hello, world! {}", sum);
}
