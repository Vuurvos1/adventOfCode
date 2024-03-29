async function main() {
    let max = 0;

    const hits = [];

    const point = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    for (let y = -1000; y < 1000; y++) {
        for (let x = 0; x < 1000; x++) {
            velocity.x = x;
            velocity.y = y;

            point.x = 0;
            point.y = 0;

            // steps
            for (let i = 0; i < 1000; i++) {
                point.x += velocity.x;
                point.y += velocity.y;

                if (velocity.x > 0) {
                    velocity.x--;
                } else if (velocity.x < 0) {
                    velocity.x++;
                }

                velocity.y -= 1;

                // passed area
                if (point.x > 178 || point.y < -100) {
                    break;
                }

                if (coll(point.x, point.y)) {
                    max++;
                    hits.push([x, y]);
                    break;
                }
            }
        }
    }

    console.table(hits);
    return max;
}

console.log(await main());

function coll(x, y) {
    // input: target area: x=144..178, y=-100..-76
    return x >= 144 && x <= 178 && y >= -100 && y <= -76;
    // return x >= 20 && x <= 30 && y >= -10 && y <= -5;
}
