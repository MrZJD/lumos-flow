const { merge } = require('./merge.ts');

test('merge function', () => {
  expect(merge('a', 'b')).toBe('b');
  expect(merge(1, 2)).toBe(2);
  expect(merge({ a: '1' }, { a: '2' })).toEqual({ a: '2' });
  expect(merge({ a: '1' }, { a: '2', b: '2' })).toEqual({ a: '2', b: '2' });
  expect(merge([1, 2, 3], [])).toEqual([1, 2, 3]);
  expect(merge([1, 2, 3], [, , , 4])).toEqual([1, 2, 3, 4]);
  expect(merge([{ a: 1 }], [0, { b: 2 }])).toEqual([0, { b: 2 }]);
  expect(merge([{ a: 1 }], [{ a: 2 }, { b: 2 }])).toEqual([{ a: 2 }, { b: 2 }]);
  expect(merge([{ a: [1, 2, 3] }], [{ a: [3, 2, 1] }])).toEqual([{ a: [3, 2, 1] }]);
});

test('merge cornor case', () => {
  expect(merge()).toBe(undefined);
  expect(merge({}, undefined)).toEqual({});
  expect(merge({ a: '1' }, undefined)).toEqual({ a: '1' });
  expect(merge(undefined, { a: '1' })).toEqual({ a: '1' });
  expect(merge(0, 2)).toBe(2);
  expect(merge(2, 0)).toBe(0);
  expect(merge('', 0)).toBe(0);
  expect(merge(0, '')).toBe('');
});
