use std::{fs, time::Instant};

use regex::Regex;

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

fn combo(operand: u64, register: &Vec<u64>) -> u64 {
    match operand {
        4 => register[0],
        5 => register[1],
        6 => register[2],
        _ => operand,
    }
}

fn run_program(a: u64, b: u64, c: u64, stack: &Vec<u64>) -> Vec<u64> {
    let mut out: Vec<u64> = Vec::new();
    let mut register: Vec<u64> = vec![a, b, c];
    let mut pointer = 0;

    while pointer < stack.len() {
        let opcode = stack[pointer];
        let operand = stack[pointer + 1];

        pointer += 2;
        match opcode {
            0 => {
                // adv - divide A by 2^value (implemented as right shift)
                register[0] >>= combo(operand, &register);
            }
            1 => {
                // bxl - XOR B with literal operand
                register[1] ^= operand;
            }
            2 => {
                // bst - set B to value mod 8
                register[1] = combo(operand, &register) % 8;
            }
            3 => {
                // jnz - jump if A is not zero
                if register[0] != 0 {
                    pointer = operand as usize;
                }
            }
            4 => {
                // bxc - XOR B with C
                register[1] ^= register[2];
            }
            5 => {
                // out - output value mod 8
                out.push(combo(operand, &register) % 8);
            }
            6 => {
                // bdv - divide A by 2^value, store in B
                register[1] = register[0] >> combo(operand, &register);
            }
            7 => {
                // cdv - divide A by 2^value, store in C
                register[2] = register[0] >> combo(operand, &register);
            }
            _ => unreachable!(),
        }
    }

    out
}

fn p1() {
    let file_content =
        fs::read_to_string("./src/input.txt").expect("Should have been able to read the file");
    let input: Vec<&str> = file_content.trim_end().split("\n\n").collect();

    let re = Regex::new(r"\d+").expect("Invalid regex");

    let register: Vec<u64> = re
        .find_iter(input[0])
        .filter_map(|mat| mat.as_str().parse::<u64>().ok())
        .collect();

    let stack: Vec<u64> = input[1]
        .replace("Program: ", "")
        .split(",")
        .map(|c| c.parse::<u64>().unwrap())
        .collect();

    let out = run_program(register[0], register[1], register[2], &stack);
    println!(
        "Out: {}",
        out.iter()
            .map(|c| c.to_string())
            .collect::<Vec<_>>()
            .join(",")
    );
}

fn p2() {
    let file_content =
        fs::read_to_string("./src/input.txt").expect("Should have been able to read the file");
    let input: Vec<&str> = file_content.trim_end().split("\n\n").collect();

    let stack: Vec<u64> = input[1]
        .replace("Program: ", "")
        .split(",")
        .map(|c| c.parse::<u64>().unwrap())
        .collect();

    let mut a: u64 = 0;
    for pos in (0..stack.len()).rev() {
        a <<= 3;
        while run_program(a, 0, 0, &stack) != &stack[pos..] {
            a += 1;
        }
    }

    println!("Done: {}", a);
}
