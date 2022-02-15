const doc = require('./data/document');

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

module.exports = cdpHandler;
