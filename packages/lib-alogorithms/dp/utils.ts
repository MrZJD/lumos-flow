export function benchmark(label: string, fn: (...args: any[]) => any) {
  console.time(label);
  console.log(fn());
  console.timeEnd(label);
}