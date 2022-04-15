
interface INode {
  value: string;
  children: INode[];
  [x: string]: any;
}

/**
 * BFS 广度优先搜索
 */
export function bfs(node: INode, matcher: (i: INode) => boolean) {
  if (matcher(node)) {
    return node;
  }

  const siblings: INode[] = [...node.children];
  while (1) {
    const current = siblings.shift();

    if (!current) {
      break;
    }

    if (matcher(current)) {
      return current;
    }

    siblings.push(...current.children);
  }

  return undefined;
}

export default bfs;
