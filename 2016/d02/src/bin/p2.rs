fn main() {
    use std::time::Instant;
    let now = Instant::now();

    println!("Hello, world!");

    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}
