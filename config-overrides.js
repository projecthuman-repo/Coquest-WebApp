const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
  // do stuff with the webpack config...
  config.plugins.push(new NodePolyfillPlugin())
  return config
}