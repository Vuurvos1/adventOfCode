use std::{fs, time::Instant};

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

fn p1() {
    let input = fs::read_to_string("./src/input.txt")
        .expect("Should have been able to read the file")
        .trim_end()
        .to_string();

    let mut disk: Vec<i64> = Vec::new();

    let mut file_index = 0;
    let mut digit_count: usize = 0;
    for (i, c) in input.chars().enumerate() {
        let size = c.to_digit(10).unwrap();
        if i % 2 == 0 {
            // file block
            for _ in 0..size {
                disk.push(file_index);
                digit_count += 1;
            }
            file_index += 1;
        } else {
            // padding block
            for _ in 0..size {
                disk.push(-1);
            }
        }
    }

    let mut skip_count = disk.len();
    for i in 0..digit_count {
        if disk[i] == -1 {
            // get last item from disk that is non empty
            let last_not_dot = disk[0..skip_count].iter().rposition(|x| *x != -1).unwrap();
            disk.swap(i, last_not_dot);
            skip_count = last_not_dot;
        }
    }

    let mut sum: i64 = 0;
    for (i, d) in disk.iter().enumerate() {
        if *d == -1 {
            break;
        }
        sum += i as i64 * *d;
    }

    println!("Hello, world! {}", sum);
}

#[derive(Debug, Clone, Copy)]
struct Space {
    id: u32,
    size: u32,
    file: bool,
    done: bool,
}

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
                size: size,
                file: true,
                done: false,
            });

            file_index += 1;
            continue;
        }

        // padding block
        file_disk.push(Space {
            id: 0,
            size: size,
            file: false,
            done: true,
        });
    }

    // when inserting into free space, if space left create a new free space at the start of the index
    let mut skip_count = file_disk.len();
    for _ in 0..file_index {
        // get last item from file_disk that is not free space
        let last_file_index_opt = file_disk[0..skip_count]
            .iter()
            .rposition(|x| x.file && !x.done);
        if last_file_index_opt.is_none() {
            continue;
        }
        let last_file_index = last_file_index_opt.unwrap();
        let last_file = file_disk[last_file_index];
        file_disk[last_file_index].done = true;
        skip_count = last_file_index;

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

    let mut sum: u64 = 0;
    let mut i: u64 = 0;
    for s in file_disk {
        for _ in 0..s.size {
            if s.file {
                sum += i * s.id as u64;
            }
            i += 1;
        }
    }

    println!("Hello, world! {}", sum);
}
