const { resolve } = require('path');

module.exports = {
  port: 9009,
  files: [
    resolve(__dirname, './mock.lumos.json')
  ]
};
