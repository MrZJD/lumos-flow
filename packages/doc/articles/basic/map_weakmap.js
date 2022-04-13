
const runGC = () => {
  try {
    global.gc();
  } catch (err) {
    console.log('node --expose-gc index.js', err);
    process.exit();
  }
};

// const map = new Map();
const map = new WeakMap();
const ref = [];

const createObjInstance = () => ({
  title: `new reference`,
  payload: new Array(10000).fill(1),
});

for (let i = 0; i < 10000; i++) {
  const ins = createObjInstance();

  ref.push(ins);

  map.set(
    ins,
    i
  );
}

console.log('Memory:', process.memoryUsage());

for (let i = 0; i < 10000; i++) {
  delete ref[i];
}

runGC();

console.log('Memory:', process.memoryUsage());
