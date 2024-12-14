use std::{fs, time::Instant};

use regex::Regex;

fn is_int(n: f64) -> bool {
    (n - n.round()).abs() < 0.0001
}

fn main() {
    println!("Hello, world!");

    let mut now = Instant::now();
    p1();
    let mut elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    now = Instant::now();
    p2();
    elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

fn move_claw(a_button: (f64, f64), b_button: (f64, f64), pos: (f64, f64), p1: bool) -> u64 {
    let (ax, ay) = a_button;
    let (bx, by) = b_button;
    let (px, py) = pos;

    let d = (ax * by) - (ay * bx);
    let dx = (px * by) - (py * bx);
    let dy = (ax * py) - (ay * px);

    // if (dx % d != 0.0) || (dy % d != 0.0) {
    //     return 0;
    // }

    let x = dx / d;
    let y = dy / d;

    if !is_int(x) || !is_int(y) {
        return 0;
    }

    if p1 && (x > 100.0 || y > 100.0) {
        return 0;
    }

    return 3 * x as u64 + y as u64;
}

fn p1() {
    let re = Regex::new(r"\d+").expect("Invalid regex");
    let input: Vec<Vec<f64>> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .split("\n\n")
        .map(|line| {
            let digits: Vec<f64> = re
                .find_iter(line) // Find all matches
                .filter_map(|mat| mat.as_str().parse::<f64>().ok()) // Attempt to parse to i32, filter out errors
                .collect();
            digits
        })
        .collect();

    let mut sum: u64 = 0;
    for inp in input {
        let [ax, ay, bx, by, x, y] = inp.try_into().unwrap();
        sum += move_claw((ax, ay), (bx, by), (x, y), true);
    }

    println!("Hello, world! {}", sum);
}

fn p2() {
    let re = Regex::new(r"\d+").expect("Invalid regex");
    let input: Vec<Vec<f64>> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .split("\n\n")
        .map(|line| {
            let digits: Vec<f64> = re
                .find_iter(line) // Find all matches
                .filter_map(|mat| mat.as_str().parse::<f64>().ok()) // Attempt to parse to i32, filter out errors
                .collect();
            digits
        })
        .collect();

    let mut sum: u64 = 0;
    for inp in input {
        let [ax, ay, bx, by, x, y] = inp.try_into().unwrap();
        let tokens = move_claw(
            (ax, ay),
            (bx, by),
            (x + 10000000000000.0, y + 10000000000000.0),
            false,
        );
        sum += tokens;
    }

    println!("Hello, world! {}", sum);
}
