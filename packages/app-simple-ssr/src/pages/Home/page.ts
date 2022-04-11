import { mountVar } from './injection';
import { BannerWiget } from './Wigets/BannerWiget';

// notifier = new Notifier();

class Page {
  wigets = new Map();

  run(defaultValue: any) {
    // 初始化页面组件
    this.wigets.set('banner', new BannerWiget(document.body, defaultValue));
  }
}

(new Page()).run((window as any).__injection[mountVar]);
