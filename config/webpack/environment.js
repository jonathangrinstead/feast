const { environment } = require('@rails/webpacker');
const path = require('path');

environment.config.merge({
  entry: {
    application: path.resolve(__dirname, '..', '..', 'app', 'javascript', 'stylesheets', 'application.css')
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url")
    }
  }
});

module.exports = environment;
