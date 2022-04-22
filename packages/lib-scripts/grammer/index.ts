import peg from 'pegjs';
import fs from 'fs';
import path from 'path';

const model = fs.readFileSync(path.resolve(__dirname, './parser.pegjs')).toString();

const parser = peg.generate(model);

const result = parser.parse('2*(3+4)');

console.log(result);
