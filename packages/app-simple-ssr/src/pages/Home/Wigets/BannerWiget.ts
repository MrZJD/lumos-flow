
export class BannerWiget {
  private el: HTMLElement | undefined;
  private parentEle: HTMLElement | undefined;

  value: any;

  private ejsTemplate = `
    <div>
      <div>测试节点</div>
    </div>
  `;

  constructor(ele?: HTMLElement, defaultValue?: any) {
    this.parentEle = ele;
    this.value = defaultValue;
  }

  createUI() {
    const el = document.createElement('div');

    el.innerHTML = this.ejsTemplate;

    this.el = el;

    this.parentEle?.appendChild(this.el);
  }

  /**
   * 更新UI逻辑
   */
  updateUI(value: any) {
    // call some dom modify api
  }

  toString() {
    return `<div>
      <div>123</div>
      <p>phrase</p>
    </div>`;
  }
}
