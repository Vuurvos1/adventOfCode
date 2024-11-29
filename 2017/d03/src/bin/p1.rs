struct Point {
    x: i32,
    y: i32,
}

// based on https://stackoverflow.com/a/19287714
fn spiral(n: u32) -> i32 {
    if n == 0 {
        return 0;
        // return Point { x: 0, y: 0 };
    }
    let n = n - 1;

    // let n = n - 1;

    // Determine the layer (r) of the spiral.
    let r = (((n + 1) as f64).sqrt() - 1.0) as i32 / 2 + 1;

    // Total points in all inner layers.
    let p = (8 * r * (r - 1)) / 2;

    // Total points per face of the current layer.
    let en = r * 2;

    // Position of n on the current layer's perimeter.
    let a = (1 + n as i32 - p) % (r * 8);

    // let r = (((n + 1) as f64).sqrt() - 1.0) as i32 / 2 + 1;
    // // points in inner squares
    // let p = (8 * r * (r - 1)) / 2;
    // // points per face
    // let en = r * 2;
    // // position on current square
    // let a = (1 + n as i32 - p) % (r * 8);

    println!("{} {} {}", r, p, a);
    // println!("{}", a / (r * 2));

    // Calculate the offset within the current face.
    let offset = a % en;

    // Manhattan distance is the layer + distance to the middle of the current side.
    let distance_to_center_of_side = (offset - r).abs();
    r + distance_to_center_of_side - 1

    // some corners seem to be off by 2 like 17

    // match a / (r * 2) {
    //     0 => Point {
    //         x: r,
    //         y: r - (a % en),
    //     },
    //     1 => Point {
    //         x: r - (a % en),
    //         y: -r,
    //     },
    //     2 => Point {
    //         x: -r,
    //         y: (a % en) - r,
    //     },
    //     3 => Point {
    //         x: (a % en) - r,
    //         y: r,
    //     },
    //     _ => Point { x: 0, y: 0 },
    // }
}

fn main() {
    let input = 325489 - 1;

    let p = spiral(input);
    // println!("x: {} y: {}", p.x, p.y);
    // let output = p.x.abs() + p.y.abs() - 1;

    // 550, 551 low
    println!("Hello, world! {}", p);
}

#[test]
fn t1() {
    let p = spiral(1);
    assert_eq!(p, 0);
    // assert_eq!(p.x.abs() + p.y.abs() - 1, 0);
}

#[test]
fn t2() {
    let p = spiral(12);
    assert_eq!(p, 3);
    // assert_eq!(p.x.abs() + p.y.abs() - 1, 3);
}

// #[test]
// fn t3() {
//     let p = spiral(23);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 2);
// }

// #[test]
// fn t4() {
//     let p = spiral(2);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 1);
// }

// #[test]
// fn t5() {
//     let p = spiral(4);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 1);
// }

// #[test]
// fn t6() {
//     let p = spiral(6);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 1);
// }

// #[test]
// fn t7() {
//     let p = spiral(8);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 1);
// }

// #[test]
// fn t8() {
//     let p = spiral(11);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 2);
// }

// #[test]
// fn t9() {
//     let p = spiral(15);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 2);
// }

// #[test]
// fn t10() {
//     let p = spiral(16);
//     assert_eq!(p.x.abs() + p.y.abs() - 1, 3);
// }

#[test]
fn t11() {
    let p = spiral(17);
    assert_eq!(p, 4);
    // println!("x: {} y: {}", p.x, p.y);
    // assert_eq!(p.x.abs() + p.y.abs() - 1, 4);
}
