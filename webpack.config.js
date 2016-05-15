'use strict';

const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        app: './entry'
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    output: {
        path: __dirname + '/public',
        publicPath: '/public/static',
        filename: 'js/[name].js',
        library: '[name]'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: (NODE_ENV === 'development') ? 'cheap-inline-module-source-map' : null,

    plugins: [
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
        preLoaders: [{
            test: /\.js$/,
            include: [__dirname + './frontend'],
            loader: 'jshint-loader'
        }],

        loaders: [{
            test: /\.js$/,
            include: [__dirname + '/frontend'],
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.jade/,
            include: [__dirname + './frontend/blocks'],
            loader: 'jade-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }],
        noParse: /\.min\.js/
    },

    jshint: {
        reporter: require('jshint-loader-reporter')('stylish')
    },

// TODO Add host and port to configuration file
    devServer: {
        host: 'localhost',
        port: '8085'
    }
};
