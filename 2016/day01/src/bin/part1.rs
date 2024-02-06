struct Vec2 {
  x: i32,
  y: i32,
}

fn main() {
  use std::time::Instant;
  let now = Instant::now();

  let raw_input = include_str!("./input.txt").trim_end();
  let s: Vec<&str> = raw_input.split(", ").collect();

  let mut pos = Vec2 { x: 0, y: 0 };
  let mut direction = Vec2 {x: 0, y: 1};

  for i in s {
    let (dir, raw_amount) = i.split_at(1);
    let amount = raw_amount.to_string().parse::<i32>().unwrap();

    if dir == "L" {
      let tmp = direction.x.clone();
      direction.x = -direction.y;
      direction.y = tmp;
    } else if dir == "R"  {
      let tmp = direction.x.clone();
      direction.x = direction.y;
      direction.y = -tmp;
    }

    // println!("dir: x {}, y {}", direction.x, direction.y);
    // println!("pos: x {}, y {}", pos.x, pos.y);

    pos.x += direction.x * amount;
    pos.y += direction.y * amount;
  }

  println!("Output: {}", pos.x.abs() + pos.y.abs());

  let elapsed = now.elapsed();
  println!("Elapsed: {:.2?}", elapsed);
}
