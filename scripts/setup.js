import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

// const rawInput = fs.readFileSync('input.txt', 'utf8');
// const input = rawInput.trimEnd().split('\n');

// console.log('end', 0);

const date = new Date();

/** @type {Record<string, string>} */
const args = {};
process.argv.forEach((arg) => {
    if (!arg.includes("=")) return;

    const [key, value] = arg.split("="); // TODO: splits on all = signs but probably only split on the first one
    args[key] = value ?? true;
});

const day = Number(args?.day) || date.getDate();
const year = Number(args?.year) || date.getFullYear();

console.log(day, year);

if (day > 25 || year > new Date().getFullYear())
    throw new Error("Date out of range");

// TODO: check for propper date range

const fileBasePath = `./${year}/${day}`;

const baseTemplate = `import fs from 'node:fs';
import * as lib from 'lib';
import clipboard from 'clipboardy';

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\\n');

let output = 0;



console.info(output)
clipboard.writeSync(String(output));
`;

if (!fileExists(fileBasePath + "/a.js")) {
    writeFileRecursive(fileBasePath + "/a.js", baseTemplate);
} else {
    console.info("skip generating part a");
}

if (!fileExists(fileBasePath + "/b.js")) {
    writeFileRecursive(fileBasePath + "/b.js", baseTemplate);
} else {
    console.info("skip generating part b");
}

await fetchInput();

async function fetchInput() {
    if (!day || !year) {
        console.error("Day or year not set");
        return;
    }

    if (!process.env.SESSION) {
        console.error(`Can't fetch input date without session token`);
        return;
    }

    const filepath = `${fileBasePath}/input.txt`;

    // Already exists
    if (fileExists(filepath)) {
        console.error(`Input file already exists, skipping`);
        return;
    }

    const res = await fetch(
        `https://adventofcode.com/${year}/day/${day}/input`,
        {
            headers: {
                Cookie: `session=${process.env.SESSION}`,
                "User-Agent": "github.com/Vuurvos1/adventOfCode",
            },
        }
    );

    if (!res.ok) {
        console.error("There was a problem fetching the data");
        return;
    }

    fs.writeFileSync(filepath, await res.text());
}

/**
 * Check if a file path exists
 * @param {string} path
 */
function fileExists(path) {
    try {
        fs.accessSync(path);
        return true;
    } catch {
        return false;
    }
}

/**
 * Write file to disk, create file if needed
 * @param {string} file
 * @param {string} data
 */
function writeFileRecursive(file, data) {
    const dirname = path.dirname(file);
    if (!fileExists(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(file, data);
}
