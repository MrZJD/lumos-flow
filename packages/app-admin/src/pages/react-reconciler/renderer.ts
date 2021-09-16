import { ReactElement, useEffect } from 'react';
import ReactReconciler from 'react-reconciler';

function log(type: string, args: any) {
  console.log(`[${type}]`);
  console.log(args);
}

// reconciler配置
const reconciler = ReactReconciler({
  now: Date.now,
  getRootHostContext: () => ({}),
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => ({}),
  shouldSetTextContent: () => false,
  // 创建实例
  createInstance: (...args) => {
    const [type, props] = args;

    log('createInstance', args);

    const el = document.createElement(type as any, props as any);

    if ((props as any).onClick) {
      el.addEventListener('click', (props as any).onClick);
    }

    return el;
  },
  createTextInstance: (...args) => {
    log('createTextInstance', args);

    return document.createTextNode(args[0]);
  },
  appendInitialChild: (parent, child) => {
    log('appendInitialChild', [parent, child]);
    parent && child && (parent as any).appendChild(child);
  },
  appendChild: (parent, child) => {
    log('appendChild', [parent, child]);
    parent && child && (parent as any).appendChild(child);
  },
  finalizeInitialChildren: () => false,
  supportsMutation: true,
  appendChildToContainer: (container: Element, child: any, ...args) => {
    log("appendChildToContainer", [container, child, args]);
    container && child && container.appendChild(child);
  },
  prepareUpdate: (...args) => {
    log("prepareUpdate", args);

    return true;
  },
  commitUpdate: (...args) => {
    log('commitUpdate', args);

    const [instance, payload, type, oldProps, newProps, handler] = args as any;

    if (typeof oldProps.children === 'number' && oldProps.children !== newProps.children) {
      instance.innerText = newProps.children
    }

  },
  commitTextUpdate: () => {},
  removeChild: () => {},
  removeChildFromContainer: (container, child) => {
    log("removeChildFromContainer", [container, child]);
    (container as HTMLElement).removeChild(child as any);
  },
  getPublicInstance: () => {},
  shouldDeprioritizeSubtree: () => false,
  scheduleDeferredCallback: () => {},
  cancelDeferredCallback: () => {},
  setTimeout: () => {},
  clearTimeout: () => {},
  noTimeout: () => {},
  isPrimaryRenderer: false,
  supportsPersistence: false,
  supportsHydration: false,
  // @ts-ignore
  clearContainer() {
    return false;
  },
});

// 通过reconciler来监听store的变化
export const render = (element: ReactElement, selector: string) => {
  const container = reconciler.createContainer(document.querySelector(selector), false, false);
  return reconciler.updateContainer(element, container, null, null as any);
};

export default {
  render
};
