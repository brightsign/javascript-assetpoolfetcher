const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './fetcher.js',
  output: {
    publicPath: './',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.')
  },

  target: 'node',

  resolve: {
    extensions: ['.html', '.js']
  },
  externals: {
    '@brightsign/assetpool': 'commonjs @brightsign/assetpool',
    '@brightsign/assetpoolfetcher': 'commonjs @brightsign/assetpoolfetcher'
  },
  module: {
    rules: [{
      loader: 'eslint-loader',
      options: {
        configFile: './eslint-config.json',
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './*.html',
      to: '.'
    }])
  ]
};
