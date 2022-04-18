import createConcurrBox from './createConcurrBox';

const sleep = (time: number) => new Promise((resolve) => {
  setTimeout(() => resolve(undefined), time);
});

async function main () {
  const tasks = new Array(10).fill(0).map((_, idx) => async () => {
    console.log(`run task ${idx}`);
    await sleep(3000);
    console.log(`finished task ${idx}`);
  });

  // commonly
  // await Promise.all(tasks.map(fn => fn())); // => 同时并发10个任务

  // 1. 根据设置的并发量排队执行
  // 2. 等待中的利用Promise PENGDING状态表示loading
  // const runConcurr = createConcurrBox(1); // 一个一个排队执行
  const runConcurr = createConcurrBox(2); // 2个2个排队执行

  await Promise.all(tasks.map(fn => runConcurr(fn))); // => 同时并发10个任务，排队执行，等待中的Promise处于PENDING阶段
}

main();
