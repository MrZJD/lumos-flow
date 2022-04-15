import bfs from './bfs';

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

console.log(bfs(tree, (node) => node.value === 'name-package.a'));
console.log(bfs(tree, (node) => node.value === 'name-package.go'));
console.log(bfs(tree, (node) => node.value === 'name-typescript'));
