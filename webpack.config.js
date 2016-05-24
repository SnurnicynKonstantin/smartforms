'use strict';

const webpack = require('webpack');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'frontend'),

  entry: {
    smartforms: './index'
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/static',
    filename: 'js/[name].js',
    library: '[name]',
    libraryTarget: 'var'
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: (NODE_ENV === 'development') ? 'cheap-inline-module-source-map' : null,

  plugins: [
    new ExtractTextPlugin('css/styles.css'),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ].concat(NODE_ENV === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ] : []),

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'eslint'
        ],
        include: [
          path.join(__dirname, 'frontend')
        ]
      }
    ],

    loaders: [{
      test: /\.js$/,
      include: [path.join(__dirname, 'frontend')],
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: 'es2015'
      }
    }, {
      test: /\.jade/,
      include: [path.join(__dirname, './frontend/blocks')],
      loader: 'jade-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000'
    }, {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      loader: 'file'
    }, {
      // expose jQuery to window for convenience and for Bootstrap
      test: require.resolve('jquery'),
      loader: 'expose?$!expose?jQuery'
    }, {
      test: /node_modules\/jquery\.formstyler\/.+\.(jsx|js)$/,
      loader: 'imports?jQuery=jquery,$=jquery,this=>window'
    }],
    noParse: /\.min\.js/
  },

  // TODO Add host and port to configuration file
  devServer: {
    host: 'localhost',
    port: '8085'
  }
};
