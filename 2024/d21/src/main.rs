use std::{
    collections::{HashMap, VecDeque},
    fs,
    time::Instant,
};

fn main() {
    let now = Instant::now();
    p1();
    let elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    let now = Instant::now();
    p2();
    let elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

// numeric keypad
// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+

// directional keypad
//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

fn get_command(keypad: &HashMap<char, (i32, i32)>, start: char, end: char) -> Vec<String> {
    if start == end {
        return vec![String::from("A")];
    }

    let start_pos = keypad.get(&start).unwrap();
    let end_pos = keypad.get(&end).unwrap();

    // I don't fully understand why this doesn't work,
    // probably something with the robots controlling robots
    // let dist = (
    //     end_pos.0 as i32 - start_pos.0 as i32,
    //     end_pos.1 as i32 - start_pos.1 as i32,
    // );

    // let mut moves: Vec<char> = Vec::new();
    // // move right -> up or down -> left to avoid empty spot
    // if dist.1 > 0 {
    //     // move right -> up
    //     moves.extend(std::iter::repeat('>').take(dist.1.abs() as usize));
    //     moves.extend(std::iter::repeat('^').take(dist.0.abs() as usize));
    // } else {
    //     // move down -> left
    //     moves.extend(std::iter::repeat('v').take(dist.0.abs() as usize));
    //     moves.extend(std::iter::repeat('<').take(dist.1.abs() as usize));
    // }

    let mut queue = VecDeque::from(vec![(*start_pos, String::new())]);
    let mut distances: HashMap<(i32, i32), u32> = HashMap::new();
    let mut all_paths: Vec<String> = Vec::new();
    let directions: Vec<(i32, i32, char)> =
        vec![(0, 1, 'v'), (1, 0, '>'), (0, -1, '^'), (-1, 0, '<')];

    while let Some((pos, path)) = queue.pop_front() {
        if pos == *end_pos {
            all_paths.push(path.clone() + "A");
        }

        for (dx, dy, dir) in &directions {
            let new_pos = (pos.0 as i32 + dx, pos.1 as i32 + dy);

            // don't allow traversal into the blank areas
            if keypad.get(&' ').unwrap() == &new_pos {
                continue;
            }

            // only move if the new position is within the keypad
            if keypad.clone().into_values().any(|v| v == new_pos) {
                let new_path = path.clone() + &dir.to_string();
                if distances.get(&new_pos).is_none()
                    || distances.get(&new_pos).unwrap() >= &(new_path.len() as u32)
                {
                    queue.push_back((new_pos, new_path.clone()));
                    distances.insert(new_pos, new_path.len() as u32);
                }
            }
        }
    }

    all_paths
}

fn get_key_presses(
    keypad: &HashMap<char, (i32, i32)>,
    code: String,
    robot: u32,
    cache: &mut HashMap<(String, i32), i64>,
) -> i64 {
    let key = (code.clone(), robot as i32);
    if cache.contains_key(&key) {
        return *cache.get(&key).unwrap() as i64;
    }

    let vec_keypad = vec![
        (' ', (0, 0)), // empty
        ('^', (1, 0)), // Up
        ('A', (2, 0)), // Action
        ('<', (0, 1)), // Left
        ('v', (1, 1)), // Down
        ('>', (2, 1)), // Right
    ];
    let direction_keypad: HashMap<char, (i32, i32)> = vec_keypad.into_iter().collect();

    let mut current = 'A';
    let mut length: i64 = 0;
    for i in 0..code.len() {
        let moves = get_command(&keypad, current, code.chars().nth(i).unwrap());

        if robot == 0 {
            length += moves[0].len() as i64;
        } else {
            // get min moves
            let min = moves
                .iter()
                .map(|m| get_key_presses(&direction_keypad, m.clone(), robot - 1, cache))
                .min()
                .unwrap();
            length += min;
        }

        current = code.chars().nth(i).unwrap();
    }

    cache.insert(key, length);
    length
}

fn p1() {
    let codes: Vec<String> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| line.to_string())
        .collect();

    let vec_keypad = vec![
        ('7', (0, 0)),
        ('8', (1, 0)),
        ('9', (2, 0)),
        ('4', (0, 1)),
        ('5', (1, 1)),
        ('6', (2, 1)),
        ('1', (0, 2)),
        ('2', (1, 2)),
        ('3', (2, 2)),
        (' ', (0, 3)),
        ('0', (1, 3)),
        ('A', (2, 3)),
    ];

    // Convert the Vec into a HashMap
    let numeric_keypad: HashMap<char, (i32, i32)> = vec_keypad.into_iter().collect();

    // let vec_keypad = vec![
    //     ('^', (1, 0)), // Up
    //     ('A', (2, 0)), // Action
    //     ('<', (0, 1)), // Left
    //     ('v', (1, 1)), // Down
    //     ('>', (2, 1)), // Right
    // ];
    // let direction_keypad: HashMap<char, (u32, u32)> = vec_keypad.into_iter().collect();

    let mut cache: HashMap<(String, i32), i64> = HashMap::new();

    let mut sum: i64 = 0;
    for code in codes {
        // part of code parsed WITHOUT last char
        let numberic_part = &code[..code.len() - 1].parse::<i64>().unwrap();
        let key_presses = get_key_presses(&numeric_keypad, code, 2, &mut cache);

        sum += numberic_part * key_presses as i64;
    }

    println!("p1: {}", sum);
}

fn p2() {
    let codes: Vec<String> = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .lines()
        .map(|line| line.to_string())
        .collect();

    let vec_keypad = vec![
        ('7', (0, 0)),
        ('8', (1, 0)),
        ('9', (2, 0)),
        ('4', (0, 1)),
        ('5', (1, 1)),
        ('6', (2, 1)),
        ('1', (0, 2)),
        ('2', (1, 2)),
        ('3', (2, 2)),
        (' ', (0, 3)),
        ('0', (1, 3)),
        ('A', (2, 3)),
    ];

    // Convert the Vec into a HashMap
    let numeric_keypad: HashMap<char, (i32, i32)> = vec_keypad.into_iter().collect();

    // let vec_keypad = vec![
    //     ('^', (1, 0)), // Up
    //     ('A', (2, 0)), // Action
    //     ('<', (0, 1)), // Left
    //     ('v', (1, 1)), // Down
    //     ('>', (2, 1)), // Right
    // ];
    // let direction_keypad: HashMap<char, (u32, u32)> = vec_keypad.into_iter().collect();

    let mut cache: HashMap<(String, i32), i64> = HashMap::new();

    let mut sum: i64 = 0;
    for code in codes {
        // part of code parsed WITHOUT last char
        let numberic_part = &code[..code.len() - 1].parse::<i64>().unwrap();
        let key_presses = get_key_presses(&numeric_keypad, code, 25, &mut cache);

        sum += numberic_part * key_presses as i64;
    }

    println!("p2: {}", sum);
}
