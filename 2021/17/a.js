async function main() {
    let max = 0;

    const point = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    for (let y = -1000; y < 1000; y++) {
        for (let x = 0; x < 1000; x++) {
            velocity.x = x;
            velocity.y = y;

            point.x = 0;
            point.y = 0;

            // steps
            let tmpMax = 0;
            for (let i = 0; i < 1000; i++) {
                point.x += velocity.x;
                point.y += velocity.y;

                // update velocities
                if (velocity.x > 1) {
                    velocity.x--;
                } else if (velocity.x < 0) {
                    velocity.x++;
                }

                velocity.x = Math.max(
                    velocity.x > 0 ? velocity.x - 1 : velocity.x + 1,
                    0
                );

                velocity.y -= 1;

                // passed area
                // if (point.x > 30 || point.y < -10) {
                if (point.x > 278 || point.y < -100) {
                    // console.log("passed");
                    break;
                }

                // get max y
                if (point.y > max && point.y > tmpMax) {
                    // console.log(point.x, point.y, tmpMax);
                    tmpMax = point.y;
                }

                // update max if collided and creater
                if (tmpMax >= max && coll(point.x, point.y)) {
                    max = tmpMax;
                    // console.log("hit!", max);
                    break;
                }
            }
        }
    }

    return max;
}

// 4950
console.log(await main());

function coll(x, y) {
    // input: target area: x=144..178, y=-100..-76
    return x >= 144 && x <= 178 && y >= -100 && y <= -76;
    // return x >= 20 && x <= 30 && y >= -10 && y <= -5;
}
