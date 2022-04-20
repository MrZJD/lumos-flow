import { Buffer, transcode } from 'buffer';

const json = {
  title: '测试title'
};

const jsonStr = JSON.stringify(json);

// 转二进制
const binaryStr = Buffer.from(jsonStr, 'utf8').toString('binary');
console.log('binaryStr', binaryStr);

// 二进制转字符串
const originStr = Buffer.from(binaryStr, 'binary').toString('utf8');
console.log('originStr', originStr);
