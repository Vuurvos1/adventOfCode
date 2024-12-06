use std::{cmp::Ordering, collections::HashMap, fs};

fn main() {
    println!("Hello, world!");
}

#[test]
fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let split_input = input.split("\n\n").collect::<Vec<&str>>();
    let rules_input = String::from(split_input[0]);

    let mut rules: HashMap<i32, Vec<i32>> = HashMap::new();
    for rule in rules_input.lines() {
        let split: Vec<i32> = rule.split("|").map(|x| x.parse::<i32>().unwrap()).collect();
        rules.entry(split[0]).or_insert(Vec::new()).push(split[1]);
    }

    let pages_input = split_input[1];
    let pages = pages_input
        .lines()
        .map(|x| x.split(",").map(|x| x.parse::<i32>().unwrap()).collect())
        .collect::<Vec<Vec<i32>>>();

    let mut sum = 0;

    for page in pages {
        let mut valid = true;

        // check if pages are valid
        for i in 1..page.len() {
            if !valid {
                break;
            }

            if !rules.contains_key(&page[i]) {
                continue;
            }

            let rule = rules.get(&page[i]).unwrap();

            // slice before
            let slice = &page[0..i];

            for r in rule {
                if slice.contains(r) {
                    valid = false;
                    break;
                }
            }
        }

        if valid {
            let middle_index = page.len() / 2; // seems to get rounded correctly
            sum += page[middle_index];
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

    let split_input = input.split("\n\n").collect::<Vec<&str>>();
    let rules_input = String::from(split_input[0]);

    let mut rules: HashMap<i32, Vec<i32>> = HashMap::new();
    for rule in rules_input.lines() {
        let split: Vec<i32> = rule.split("|").map(|x| x.parse::<i32>().unwrap()).collect();
        rules.entry(split[0]).or_insert(Vec::new()).push(split[1]);
    }

    let pages_input = split_input[1];
    let pages = pages_input
        .lines()
        .map(|x| x.split(",").map(|x| x.parse::<i32>().unwrap()).collect())
        .collect::<Vec<Vec<i32>>>();

    let mut invalid_pages: Vec<Vec<i32>> = Vec::new();

    for page in pages {
        let mut valid = true;

        // check if pages are valid
        for i in 1..page.len() {
            if !valid {
                break;
            }

            let p = page[i];
            let rule = rules.entry(p).or_insert(Vec::new());
            if rule.len() == 0 {
                continue;
            }

            // slice before
            let slice = &page[0..i];

            for r in rule {
                if slice.contains(r) {
                    valid = false;
                    invalid_pages.push(page.clone());
                    break;
                }
            }
        }
    }

    let sort_fn = |a: &i32, b: &i32| -> Ordering {
        if rules.contains_key(a) && rules.get(a).unwrap().contains(b) {
            return Ordering::Less;
        }

        if rules.contains_key(b) && rules.get(b).unwrap().contains(a) {
            return Ordering::Greater;
        }

        Ordering::Equal
    };

    for page in &mut invalid_pages {
        page.sort_by(sort_fn);
    }

    // take the sum of middle pages
    let sum = invalid_pages.iter().fold(0, |acc, page| {
        let middle_index = page.len() / 2; // seems to get rounded correctly
        acc + page[middle_index]
    });

    println!("Hello, world! {}", sum);
}
