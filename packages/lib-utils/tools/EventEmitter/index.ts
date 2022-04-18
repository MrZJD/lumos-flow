/**
 * 更好的方式是直接引用node:events模块
 * -----
 * 这里简单实现供参考
 */

type Handler = (payload: any) => any;

class EventEmitter {
  private handlers = new Map<string, Handler[]>();

  listen(evtName: string, handler: Handler) {
    const prev = this.handlers.get(evtName) || [];

    this.handlers.set(evtName, prev.concat([handler]));
  }

  remove(evtName: string, handler: Handler) {
    const prev = this.handlers.get(evtName) || [];

    this.handlers.set(evtName, prev.filter(item => item !== handler));
  }

  once(evtName: string, handler: Handler) {
    const proxy = (payload: any) => {
      handler(payload);

      this.remove(evtName, proxy);
    };

    this.listen(evtName, proxy);
  }

  fire(evtName: string, payload?: any) {
    const handlers = this.handlers.get(evtName) || [];

    handlers.forEach(dealer => {
      dealer(payload);
    });
  }

  destory() {
    this.handlers.clear();
  }
}

export default EventEmitter;
