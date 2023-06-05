import { createReadStream, createWriteStream } from 'fs';
import * as readline from 'readline';

await sort('sorted_text');

async function sort(outputFile) {
    const writeStream = createWriteStream(outputFile, { encoding: 'utf-8' });
    const linesCount = await countLines();
    let ignoredLines = [];
    let lastMaximum = await getMax(ignoredLines);
    for (let i = 0; i < linesCount; i++) {
        writeStream.write(lastMaximum + '\n');
        lastMaximum = await getMax(ignoredLines, lastMaximum);
    }
}

async function getMax(ignoredLines, lessThan) {
    const rl = readline.createInterface({ input: createReadStream('text'), crlfDelay: Infinity });
    let currentMaximum = '';
    let currentLineNumber = 0;
    let lastMaximumLineNumber = currentLineNumber;
    await new Promise((resolve) => {
        rl.on('line', (line) => {
            currentLineNumber++;
            if ((line <= lessThan || lessThan == undefined) && line > currentMaximum && !ignoredLines.includes(currentLineNumber)) {
                currentMaximum = line;
                lastMaximumLineNumber = currentLineNumber;
            }
        });
        rl.on('close', resolve);
    });
    ignoredLines.push(lastMaximumLineNumber);
    return currentMaximum;
}

async function countLines() {
    const rl = readline.createInterface({ input: createReadStream('text'), crlfDelay: Infinity });
    let linesCount = 0;
    const task = new Promise((resolve) => {
        rl.on('line', () => { linesCount++; });
        rl.on('close', resolve);
    });
    await task;
    return linesCount;
}