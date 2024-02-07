struct Vec2 {
  x: i32,
  y: i32
}


fn main() {
    use std::time::Instant;
    let now = Instant::now();

    let lines = include_str!("./input.txt").trim_end().split("\n").collect();
    // let split: Vec<&str> = raw_input.split(", ").collect();

    let mut pos = Vec2 {x: 1, y: 1};

    for line in lines {
        let moves: &str = line.split("").collect();

        for move in moves {
          match move {
            "U" => println!("u"),
            "D" => println!("d"),
            "L" => println!("l"),
            "R" => println!("r"),
            _ => println!("mismatch")
          }
        }

    }

    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}
