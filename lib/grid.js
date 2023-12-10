/** @typedef {{x: number, y: number}} Point */

/**
 * Class representing a grid
 * @template T
 */
export class Grid {
    /**
     * Create a grid
     * @param {T[][]} grid
     */
    constructor(grid) {
        this.grid = grid;
    }

    /**
     * Find the first element that matches the function
     * @param {(value, position, grid) => boolean} func
     * @returns {T | undefined}
     */
    find(func) {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                if (func(this.grid[y][x], { x, y }, this.grid)) {
                    return this.grid[y][x];
                }
            }
        }
    }

    /**
     * Find the index of the first element that matches the function
     * @param {(value, position, grid) => boolean} func
     * @returns {import('./').Point}
     */
    findIndex(func) {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                if (func(this.grid[y][x], { x, y }, this.grid)) {
                    return { x, y };
                }
            }
        }

        return { x: -1, y: -1 };
    }
}
