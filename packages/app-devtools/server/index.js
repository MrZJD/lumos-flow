const http = require('http');
const { parse, format } = require('url');
const { WebSocketServer } = require('ws');
const cdpHandler = require('./handler');

const httpServer = http.createServer();

const wsServer = new WebSocketServer({
  noServer: true
});

wsServer.on('connection', (ws) => {
  cdpHandler.setWs(ws);
  ws.on('message', (data) => {
    let payload = {};

    try {
      payload = JSON.parse(data.toString());
    } catch {}

    cdpHandler.handle(payload.id, payload.method, payload.params);
  });
});
wsServer.on('error', () => {
  console.log('ws error')
});

const PORT = 9009;

httpServer.on('request', function (request, response) {
  const urlObj = parse(request.url);

  const [shost, sport] = request.headers.host.split(':');

  const targetUrl = format({
    protocol: 'http',
    hostname: shost,
    port: sport,
    pathname: '/inspector.html',
    search: ''
  });

  const targetWS = format({
    protocol: 'ws',
    hostname: shost,
    port: sport,
    pathname: '/devtools',
    search: '',
    slashes: true
  });

  switch (urlObj.pathname) {
    case '/json':
      response.end(JSON.stringify([
        {
          description: 'Devtools Server Demo',
          devtoolsFrontendUrl: targetUrl,
          title: 'Devtools Server Demo',
          type: 'page',
          url: 'custom view',
          webSocketDebuggerUrl: targetWS
        }
      ]));
      return;
    case '/json/version':
      response.end(JSON.stringify({
        "Browser": "Custom View",
        "Protocol-Version": "1.3",
        "User-Agent": "Custom View",
        "WebKit-Version": "537.36 (@181352)",
      }));
      return;
    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('hello chrome devtools');
      return;
  }

});

httpServer.on('upgrade', function (req, socket, head) {
  const { pathname } = parse(req.url);

  if (pathname === '/devtools') {
    wsServer.handleUpgrade(req, socket, head, (ws) => {
      wsServer.emit('connection', ws, req);
    });
    return;
  }
  socket.destroy();
  socket.end();
});

httpServer.listen(PORT, () => {
  console.log('listen', PORT)
});
