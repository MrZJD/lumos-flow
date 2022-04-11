
export class Wiget {
  private el: HTMLElement | undefined;
  private parentEle: HTMLElement | undefined;

  constructor(ele?: HTMLElement) {
    this.parentEle = ele;
  }

  createUI() {
    const el = document.createElement('div');

    this.el = el;

    this.parentEle?.appendChild(this.el);
  }

  updateUI() {
    
  }
}
