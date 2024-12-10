use criterion::{black_box, criterion_group, criterion_main, Criterion};

// bench cast againgst to_digit
fn char_to_digit(c: char) -> u32 {
    c.to_digit(10).unwrap()
}

fn char_to_cast(c: char) -> u32 {
    c as u32 - 48
}

fn bench(c: &mut Criterion) {
    c.bench_function("to_digit", |b| b.iter(|| char_to_digit(black_box('0'))));
    c.bench_function("cast", |b| b.iter(|| char_to_cast(black_box('0'))));
}

criterion_group!(benches, bench);
criterion_main!(benches);
