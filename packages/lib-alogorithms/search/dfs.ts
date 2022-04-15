
interface INode {
  value: string;
  children: INode[];
  [x: string]: any;
}

/**
 * DFS 深度优先搜索
 */
export function dfs(node: INode, matcher: (i: INode) => boolean) {
  if (matcher(node)) {
    return node;
  }

  for (let i = 0, len = node.children.length; i < len; i++) {
    const current = node.children[i];

    const result: any = dfs(current, matcher);

    if (result) {
      return result;
    }
  }

  return undefined;
}

// tail优化 - 尾递归优化
export function dfs2(node: INode[], index: number, matcher: (i: INode) => boolean): any {
  if (!node[index]) {
    return undefined;
  }

  if (matcher(node[index])) {
    return node[index];
  }

  return dfs2(node[index].children, 0, matcher) || dfs2(node, index + 1, matcher);
}

export default dfs;
