const fs = require('fs');
const { resolve } = require('path');

const imgBase64 = Buffer.from(fs.readFileSync(resolve(__dirname, './screen_0.jpg'))).toString('base64');

module.exports = (top) => ({
  sessionId: 1,
  metadata: {
    deviceHeight: 844,
    deviceWidth: 432,
    offsetTop: top || 0,
    pageScaleFactor: 1,
    scrollOffsetX: 0,
    scrollOffsetY: 0,
    timestamp: 0
  },
  data: imgBase64
});