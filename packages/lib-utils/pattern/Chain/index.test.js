const { calculator } = require('./index.ts');

test('calculator', () => {
  expect(calculator(0).value()).toBe(0);
  expect(calculator(0).add(1).value()).toBe(1);
  expect(calculator(0).add(1, 2, 3).value()).toBe(6);
  expect(calculator(10).minus(1).value()).toBe(9);
  expect(calculator(10).minus(1, 2, 3).value()).toBe(4);
  expect(calculator(0).add(10).minus(2).plus(4).divide(4).value()).toBe(8);
  expect(calculator(0).add(10).divide(0).value()).toBe(10);
});
