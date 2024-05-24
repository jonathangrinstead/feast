const { environment } = require('@rails/webpacker');
const path = require('path');

// Ensure the entry point is correctly set
environment.config.merge({
  entry: {
    application: path.resolve(__dirname, '..', '..', 'app', 'javascript', 'application.js')
  }
});

module.exports = environment;
