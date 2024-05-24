const { environment } = require('@rails/webpacker')
const path = require('path');

environment.config.merge({
  entry: {
    application: path.resolve(__dirname, '..', '..', 'app', 'javascript', 'application.js')
  }
});

module.exports = environment;
