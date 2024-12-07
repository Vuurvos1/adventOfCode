use std::fs;

fn main() {
    println!("Hello, world!");
}

// recursive function to try all combinations of operations on all digits
fn math_numbers(sum: i64, awnser: i64, digits: Vec<i64>, operations: &Vec<char>) -> (i64, bool) {
    if digits.len() == 0 {
        // bool to keep track if reached the bottom of the recursion
        return (sum, true);
    }

    // prune branches that are already too big
    if sum > awnser {
        return (0, false);
    }

    // TODO: maybe clone less, and instead pass an index to the digits vector
    let mut new_digits = digits.clone();
    let digit = new_digits.remove(0);

    for op in operations {
        let mut new_sum = sum;
        match op {
            '+' => new_sum += digit,
            '*' => new_sum *= digit,
            '|' => new_sum = format!("{}{}", sum, digit).parse::<i64>().unwrap(),
            _ => panic!("Unknown operation"),
        }

        let new_result = math_numbers(new_sum, awnser, new_digits.clone(), operations);

        if new_result.0 == awnser && new_result.1 == true {
            return new_result;
        }
    }

    return (0, false);
}

#[test]
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
        let result = math_numbers(digits[0], awnser, digits[1..].to_vec(), &operations);
        println!("{}: {}", awnser, result.0);
        if result.0 != 0 {
            sum += awnser;
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
        let result = math_numbers(digits[0], awnser, digits[1..].to_vec(), &operations);
        println!("{}: {}", awnser, result.0);
        if result.0 != 0 {
            sum += awnser;
        }
    }

    println!("Hello, world! {}", sum);
}
