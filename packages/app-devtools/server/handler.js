const doc = require('./data/document');
const screenshot = require('./data/screenshot');

class CDPHandler {
  _handler = {};

  _ws = null;

  setWs(wsInstance) {
    this._ws = wsInstance;
  }

  handle(id, method, params) {
    const p = method.slice('.');
    const h = this._handler[method];

    if (typeof h === 'function') {
      return h.call(this, id, params);
    } else {
      this._ws.send(JSON.stringify({
        id,
        error: 'can not find handler: ' + method
      }));
    }
  }

  register(domain, handler) {
    this._handler[domain] = handler;
  }
}

const cdpHandler = new CDPHandler();

cdpHandler.register('Network.enable', function (id, params) {
  this._ws.send(JSON.stringify({
    id,
    result: {}
  }));
});

cdpHandler.register('DOM.getDocument', function (id, params) {
  this._ws.send(JSON.stringify({
    id,
    result: {
      root: doc
    }
  }));
});

cdpHandler.register('Page.startScreencast', function (id, params) {
  this._ws.send(JSON.stringify({ id, result: {} }));

  this._ws.send(JSON.stringify({
    method: 'Page.screencastFrame',
    params: screenshot()
  }));
});

cdpHandler.register('Page.stopScreencast', function (id, params) {
  this._ws.send(JSON.stringify({ id, result: {} }));
});

let offsetY = 0;

cdpHandler.register('Input.emulateTouchFromMouseEvent', function (id, params) {
  this._ws.send(JSON.stringify({ id, result: {} }));

  offsetY = Math.min(offsetY + params.deltaY, 0);

  this._ws.send(JSON.stringify({
    method: 'Page.screencastFrame',
    params: screenshot(offsetY)
  }));
});

module.exports = cdpHandler;
