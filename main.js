import { createReadStream, createWriteStream } from 'fs';
import * as readline from 'readline';

await sort('sorted_text');

async function sort(outputFile) {
    const writeStream = createWriteStream(outputFile, { encoding: 'utf-8' });
    const linesCount = await countLines();
    let lastMaximum = await getMax();
    for (let i = 0; i < linesCount; i++) {
        writeStream.write(lastMaximum + '\n');
        lastMaximum = await getMax(lastMaximum);
    }
}

async function getMax(lessThan) {
    const rl = readline.createInterface({ input: createReadStream('text'), crlfDelay: Infinity })
    let currentMaximum = '';
    const task = new Promise((resolve) => {
        rl.on('line', (line) => {
            if ((line < lessThan || lessThan == undefined) && line > currentMaximum) currentMaximum = line;
        });
        rl.on('close', resolve)
    })
    await task;
    return currentMaximum;
}

async function countLines() {
    const rl = readline.createInterface({ input: createReadStream('text'), crlfDelay: Infinity })
    let linesCount = 0;
    const task = new Promise((resolve) => {
        rl.on('line', (line) => {
            linesCount++;
        });
        rl.on('close', resolve)
    })
    await task;
    return linesCount;
}