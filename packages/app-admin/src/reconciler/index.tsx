import ReactReconciler from 'react-reconciler'

const hostConfig = {
  // 定义一些东西怎样与 render 环境进行交互
  supportsMutation: true,
  /**
   * createInstance
   * @param type 字符串 eg: img, p, a (这里没有 App 因为 react 已经提前处理了)
   * @param props props eg: className, src
   * @param rootContainerInstance
   * @param hostContext
   * @param internalInstanceHandle
   * @return {Element}
   */
  createInstance (type: any, props: any) {
    const el = document.createElement(type);
    // if (props.className) el.className = props.className
    ['alt', 'className', 'href', 'rel', 'src', 'target'].forEach(item => {
      if (props[item]) {
        el[item] = props[item]
      }
    })
    return el // 这里 react 并没有规定返回的是什么，也就意味这里可以在这里返回一个你自定的 dom
  },
  /**
   * createTextInstance
   * @param text 文字信息，例如下面的 click
   * @param rootContainerInstance
   * @param hostContext
   * @param internalInstanceHandle
   * @returns {Text}
   */
  createTextInstance (text: string) {
    // <div>click</div>
    return document.createTextNode(text)
  },
  appendChildToContainer (container: any, child: any) {
    container.appendChild(child)
  },
  appendChild (parentInstance: any, child: any) {
    parentInstance.appendChild(child)
  },
  appendInitialChild (parentInstance: any, child: any) {
    parentInstance.appendChild(child)
  },
  prepareUpdate (instance: any, type: any, oldProps: any, newProps: any, rootContainerInstance: any, hostContext: any) {},
  commitUpdate (instance: any, updatePayload: any, type: any, oldProps: any, newProps: any, internalInstanceHandle: any) {},
  finalizeInitialChildren (parentInstance: any, type: any, props: any, rootContainerInstance: any, hostContext: any) {},
  getChildHostContext (parentHostContext: any, type: any, rootContainerInstance: any) {},
  getPublicInstance (instanc: any) {},
  getRootHostContext (rootContainerInstance: any) {},
  prepareForCommit (containerInfo: any) {},
  resetAfterCommit (containerInfo: any) {},
  shouldSetTextContent (type: any, props: any) {
    return false
  },
  clearContainer() {
    return false;
  },
};

const reconciler = ReactReconciler(hostConfig as any);

export default {
  render (whatToRender: any, div: any) {
    const container = reconciler.createContainer(div, false, false)
    reconciler.updateContainer(whatToRender, container, null, null as any)
  }
}