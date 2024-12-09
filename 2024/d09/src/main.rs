use std::{fs, time::Instant};

fn main() {
    println!("Hello, world!");

    // p1
    let mut now = Instant::now();
    p1();
    let mut elapsed = now.elapsed();
    println!("p1: {:.2?}", elapsed);

    now = Instant::now();
    p2();
    elapsed = now.elapsed();
    println!("p2: {:.2?}", elapsed);
}

// #[test]
fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let mut disk: Vec<String> = Vec::new();

    let mut file_index = 0;
    for (i, c) in input.chars().enumerate() {
        let size = c.to_digit(10).unwrap();
        if i % 2 == 0 {
            // file block
            let index_char = file_index.to_string();
            for _j in 0..size {
                disk.push(index_char.clone());
            }
            file_index += 1;
        } else {
            // padding block
            for _j in 0..size {
                disk.push(String::from("."));
            }
        }
    }

    // println!("{:?} disk", disk);

    let mut non_dot_count = 0;
    for d in disk.iter() {
        if d.to_string() != "." {
            non_dot_count += 1;
        }
    }

    for i in 0..non_dot_count {
        // if dot
        if disk[i] == "." {
            // get last item from disk that is not '.'
            let last_not_dot = disk.iter().rposition(|x| x != ".").unwrap();
            disk.swap(i, last_not_dot);
            disk.pop();
        }
    }

    let mut sum: u64 = 0;
    for (i, d) in disk.iter().enumerate() {
        if d.to_string() == "." {
            break;
        }
        let digit = d.parse::<u64>().unwrap();
        sum += i as u64 * digit as u64;
    }

    println!("Hello, world! {}", sum);
}

#[derive(Debug, Clone, Copy)]
struct Space {
    id: u64,
    size: u64,
    file: bool,
    done: bool,
}

fn print_disk(file_disk: &Vec<Space>) {
    for s in file_disk {
        if s.file {
            for _i in 0..s.size {
                print!("{}", s.id);
            }
            continue;
        }

        // empty space
        if !s.file {
            for _i in 0..s.size {
                print!(".");
            }
        }
    }

    println!()
}

// #[test]
fn p2() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let mut file_disk: Vec<Space> = Vec::new();

    let mut file_index = 0;
    for (i, c) in input.chars().enumerate() {
        let size = c.to_digit(10).unwrap();
        if i % 2 == 0 {
            // file block
            file_disk.push(Space {
                id: file_index,
                size: size as u64,
                file: true,
                done: false,
            });

            file_index += 1;
            continue;
        }

        // padding block
        file_disk.push(Space {
            id: 0,
            size: size as u64,
            file: false,
            done: true,
        });
    }

    // when inserting into free space, if space left create a new free space at the start of the index
    let mut _last_file_id = file_disk.iter().max_by_key(|x| x.id).unwrap().id;
    for _i in 0..file_disk.len() {
        // get last item from file_disk that is not free space
        let last_file_index_opt = file_disk.iter().rposition(|x| x.file && !x.done);
        if last_file_index_opt.is_none() {
            continue;
        }
        let last_file_index = last_file_index_opt.unwrap();
        let last_file = file_disk[last_file_index];
        file_disk[last_file_index].done = true;
        // last_file.done = true;

        // get first free space that fits
        let space_index = file_disk
            .iter()
            .position(|x| x.size >= last_file.size && !x.file);

        if let Some(space_index) = space_index {
            let space = &mut file_disk[space_index];

            if space_index > last_file_index {
                continue;
            }

            let space_left = space.size - last_file.size;
            space.size = space_left;

            // move last_file in front of space
            let item = file_disk.remove(last_file_index);
            file_disk.insert(space_index, item);

            // if before or after is already empty space, merge
            // if space_index > 0 {
            //     let before = &mut file_disk[space_index - 1];
            //     if !before.file {
            //         before.size += last_file.size;
            //         continue;
            //     }
            // }

            // insert empty space from where moved
            file_disk.insert(
                last_file_index,
                Space {
                    id: 0,
                    file: false,
                    size: item.size,
                    done: true,
                },
            )
        }
    }

    let now = Instant::now();
    let mut sum: i64 = 0;
    let mut disk: Vec<i64> = Vec::new();
    for s in file_disk {
        if s.file {
            for _i in 0..s.size {
                disk.push(s.id as i64)
            }
            continue;
        }

        // empty space
        if !s.file {
            for _i in 0..s.size {
                disk.push(-1);
            }
        }
    }

    for (i, d) in disk.iter().enumerate() {
        if *d < 0 {
            continue;
        }

        sum += i as i64 * *d as i64
    }

    let elapsed = now.elapsed();
    println!("sum: {:.2?}", elapsed);

    println!("Hello, world! {}", sum);
}
