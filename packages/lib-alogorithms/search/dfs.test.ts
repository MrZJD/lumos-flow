import { dfs, dfs2 } from './dfs';

const tree = {
  id: 1,
  value: 'name-javascript',
  children: [
    {
      id: 2,
      value: 'name-typescript',
      children: [
        {
          id: 4,
          value: 'name-package.a',
          children: []
        }
      ]
    },
    {
      id: 3,
      value: 'name-webass',
      children: [
        {
          id: 5,
          value: 'name-package.go',
          children: []
        }
      ]
    }
  ]
};

console.log(dfs(tree, (node) => node.value === 'name-package.a'));
console.log(dfs(tree, (node) => node.value === 'name-package.go'));
console.log(dfs(tree, (node) => node.value === 'name-typescript'));

console.log(dfs2([tree], 0, (node) => node.value === 'name-package.a'));
console.log(dfs2([tree], 0, (node) => node.value === 'name-package.go'));
console.log(dfs2([tree], 0, (node) => node.value === 'name-typescript'));
