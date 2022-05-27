#!/usr/bin/env zx

// require node >= 16

await $`cat package.json | grep name`

await Promise.all([
  $`sleep 1; echo 1`,
  $`sleep 2; echo 2`,
  $`sleep 3; echo 3`,
]);

let name = 'foo bar';

await $`echo ${name}`;
