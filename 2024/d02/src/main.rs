use std::fs;

fn main() {
    println!("Hello, world!");
}

#[test]
fn p1() {
    let contents =
        fs::read_to_string("./src/input.txt").expect("Should have been able to read the file");

    let mut sum = 0;

    'outer: for line in contents.lines() {
        let mut split = line.split_whitespace().map(|x| x.parse::<i32>().unwrap());

        let mut asc = false;
        let mut desc = false;

        let mut s1 = split.clone();
        // check if items are ascending
        let mut prev = s1.next().unwrap();
        for item in s1 {
            if item < prev {
                // println!("Items are not ascending");
                asc = true;
                break;
            }
            prev = item;
        }

        let mut s2 = split.clone();
        prev = s2.next().unwrap();
        for item in s2 {
            if item > prev {
                // println!("Items are not descending");
                desc = true;
                break;
            }
            prev = item;
        }

        if !(asc || desc) || asc && desc {
            continue;
        }

        prev = split.next().unwrap();
        for item in split {
            let diff = (item - prev).abs();
            if diff > 3 || diff < 1 {
                // println!("Items are not in safe range");
                continue 'outer;
            }
            prev = item;
        }

        // println!("Line: {}", line);

        sum += 1;
    }

    println!("Hello, world! {}", sum);
}

fn isSafeReport(v: Vec<i32>) -> bool {
    let mut split = v.iter();

    let mut asc = false;
    let mut desc = false;

    let mut s1 = split.clone();
    // check if items are ascending
    let mut prev = s1.next().unwrap();
    for item in s1 {
        if item < prev {
            // println!("Items are not ascending");
            asc = true;
            break;
        }
        prev = item;
    }

    let mut s2 = split.clone();
    prev = s2.next().unwrap();
    for item in s2 {
        if item > prev {
            // println!("Items are not descending");
            desc = true;
            break;
        }
        prev = item;
    }

    if !(asc || desc) || asc && desc {
        return false;
    }

    prev = split.next().unwrap();
    for item in split {
        let diff = (item - prev).abs();
        if diff > 3 || diff < 1 {
            // println!("Items are not in safe range");
            return false;
        }
        prev = item;
    }

    // println!("Line: {}", line);

    return true;
}

#[test]
fn p2() {
    let contents =
        fs::read_to_string("./src/input.txt").expect("Should have been able to read the file");

    let mut sum = 0;

    for line in contents.lines() {
        let split = line.split_whitespace().map(|x| x.parse::<i32>().unwrap());
        let v: Vec<i32> = split.collect();
        let safe = isSafeReport(v.clone());

        if safe {
            sum += 1;
            continue;
        }

        for i in 0..v.len() {
            let mut c = v.clone();
            c.remove(i);
            let safe = isSafeReport(c);
            if safe {
                sum += 1;
                break;
            }
        }
    }

    println!("Hello, world! {}", sum);
}
