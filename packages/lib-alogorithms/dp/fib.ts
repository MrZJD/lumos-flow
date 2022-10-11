import { benchmark } from './utils';
// **fib数列**

// f(n) = 0, n = 0
// f(n) = 1, n = 1
// f(n) = f(n-1) + f(n-2), n > 1

// Time - O(2^n) // 递归
function fib(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}


// O(n)
function fib2(n: number) {
  const cache = [0, 1];
  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[n];
}

// Time - O(n) / Space - O(1)
function fib3(n: number) {
  if (n < 2) {
    return n;
  }

  const cache = [0, 1];
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result = cache[0] + cache[1];

    cache[0] = cache[1]
    cache[1] = result;
  }
  return result;
}

benchmark('fib', () => fib(40))
benchmark('fib2', () => fib2(40))
benchmark('fib3', () => fib3(40))
