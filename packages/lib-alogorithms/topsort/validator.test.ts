import { validateDependency, IGraphNode } from './index';
import { union } from 'lib-utils/array';

// 把依赖表=>转为图
function depMap2treeMap(dependencies: Record<string, string[]>) {
  const nodeMap: Record<string, IGraphNode> = {};

  function setNode(name: string, parents: string[], children: string[]) {
    if (name in nodeMap) {
      const oldVal = nodeMap[name];
      const nodeParents = union(oldVal.parents, parents);
      const nodeChildren = union(oldVal.children, children);
      nodeMap[name] = {
        key: name,
        parents: nodeParents,
        children: nodeChildren,
      };

      return;
    }

    nodeMap[name] = {
      key: name,
      parents,
      children,
    };
  }

  Object.keys(dependencies).forEach((targetkey) => {
    setNode(
      targetkey,
      [],
      dependencies[targetkey]?.map((itemKey) => itemKey) || []
    );

    dependencies[targetkey]?.forEach((itemKey) => {
      setNode(itemKey, [targetkey], []);
    });
  });

  return Object.values(nodeMap);
}

// 没有循环依赖
const case1 = depMap2treeMap({
  'a1': [
    'b2'
  ],
  'a2': [
    'b2'
  ],
  'b3': [
    'a1',
    'a2'
  ]
});

const case2 = depMap2treeMap({
  'tce-a': [
    'tce-b'
  ],
  'tce-b': [
    'tce-c'
  ],
  'tce-c': [
    'tce-a'
  ],
});

// 单个依赖
const case3 = depMap2treeMap({
  'tce-a': [
    'tce-b'
  ],
  'tce-b': [
    'tce-c'
  ],
  'tce-c': [],
});

const case4 = depMap2treeMap({
  'tce-a': [
    'tce-b',
    'tce-c'
  ],
  'tce-b': [
    'tce-d'
  ],
  'tce-c': [
    'tce-d'
  ],
});

const case5 = depMap2treeMap({
  'tce-a': [
    'tce-b',
    'tce-c'
  ],
  'tce-b': [
    'tce-d'
  ],
  'tce-c': [
    'tce-d'
  ],
  'tce-d': [
    'tce-c'
  ],
});

// 没有循环依赖
const case6 = depMap2treeMap({
  'tce-a': [
    'tce-b',
    'tce-c'
  ],
  'tce-b': [
    'tce-c'
  ]
});

// 有循环依赖
const case7 = depMap2treeMap({
  'tce-a': [
    'tce-b'
  ],
  'tce-b': [
    'tce-c'
  ],
  'tce-c': [
    'tce-m'
  ],
  'tce-m': [
    'tce-b'
  ],
  'tce-f': [
    'tce-e'
  ]
});

const case8 = depMap2treeMap({
  'tce-b': [
    'tce-c'
  ],
  'tce-c': [
    'tce-b'
  ]
});

const case9 = depMap2treeMap({
  'tce-a': [
    'tce-b'
  ],
  'tce-c': [
    'tce-d'
  ]
});


export function main() {
  console.assert(validateDependency(case1)[0] === true);
  console.assert(validateDependency(case2)[0] === false);
  console.assert(validateDependency(case3)[0] === true);
  console.assert(validateDependency(case4)[0] === true);
  console.assert(validateDependency(case5)[0] === false);
  console.assert(validateDependency(case6)[0] === true);
  console.assert(validateDependency(case7)[0] === false);
  console.assert(validateDependency(case8)[0] === false);
  console.assert(validateDependency(case9)[0] === true);
}

main();
