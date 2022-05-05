import peg from 'pegjs';
import fs from 'fs';
import path from 'path';

const entry = {
  '0': 'examples/0_num',
  '1': 'examples/1_calculator',
  '2': {
    e: 'examples/2_proto_message/parser.pegjs',
    t: 'examples/2_proto_message/target.proto',
    r: 'examples/2_proto_message/result.d.ts',
  }
};

const eFile = path.resolve(__dirname, entry[2].e);
const tFile = path.resolve(__dirname, entry[2].t);
const rFile = path.resolve(__dirname, entry[2].r);

const expression = fs.readFileSync(eFile).toString();
const origin = fs.readFileSync(tFile).toString();

const parser = peg.generate(expression);

const result = parser.parse(origin);

console.log(result);

fs.writeFileSync(rFile, result);
