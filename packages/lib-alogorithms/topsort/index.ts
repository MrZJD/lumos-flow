import { remove } from 'lib-utils/array';

// 图节点
export interface IGraphNode {
  key: string;
  parents: string[];
  children: string[];
}

interface IGraphMapNode extends IGraphNode {
  removeFlag?: boolean;
}

// 校验循环依赖
export function validateDependency(graph?: IGraphMapNode[]) {
  if (!graph) {
    return [true, null];
  }

  const nodeMap = graph.reduce((prev, curr) => {
    prev[curr.key] = curr;
    return prev;
  }, {} as Record<string, IGraphMapNode>)

  while (graph.length) {
    // 找到叶子节点
    const leaf = graph.find((item) => {
      return (
        nodeMap[item.key].children.length === 0 ||
        nodeMap[item.key].children.filter((ck) => !nodeMap[ck].removeFlag)
          .length === 0
      );
    });

    if (leaf) {
      // 如果有叶子节点，则移除掉，并标记为移除
      nodeMap[leaf.key].removeFlag = true; // 移除标记
      remove(graph, (item) => item === leaf);
    } else {
      // 如果没有叶子节点，证明有循环依赖
      return [false, Object.keys(graph)];
    }
  }

  // 全部移除，表示没有循环依赖
  return [true, null];
}
