import { validateDependency, IGraphNode } from './index';
import { union } from 'lib-utils/array';

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

  return nodeMap;
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

const case2 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    }
  ],
  'psm.name.btce_service': [
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    {
      name: 'psm.name.a',
      type: 'tce_service'
    }
  ],
};

// 单个依赖
const case3 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    }
  ],
  'psm.name.btce_service': [
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    // {
    //   name: 'psm.name.a',
    //   type: 'tce_service'
    // }
  ],
};

const case4 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    },
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.btce_service': [
    {
      name: 'psm.name.d',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    {
      name: 'psm.name.d',
      type: 'tce_service'
    }
  ],
};

const case5 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    },
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.btce_service': [
    {
      name: 'psm.name.d',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    {
      name: 'psm.name.d',
      type: 'tce_service'
    }
  ],
  'psm.name.dtce_service': [
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
};

// 没有循环依赖
const case6 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    },
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.btce_service': [
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ]
};

// 有循环依赖
const case7 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    }
  ],
  'psm.name.btce_service': [
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    {
      name: 'psm.name.m',
      type: 'tce_service'
    }
  ],
  'psm.name.mtce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    }
  ],
  'psm.name.ftce_service': [
    {
      name: 'psm.name.e',
      type: 'tce_service'
    }
  ]
};

const case8 = {
  'psm.name.btce_service': [
    {
      name: 'psm.name.c',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    }
  ]
};

const case9 = {
  'psm.name.atce_service': [
    {
      name: 'psm.name.b',
      type: 'tce_service'
    }
  ],
  'psm.name.ctce_service': [
    {
      name: 'psm.name.d',
      type: 'tce_service'
    }
  ]
};


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
