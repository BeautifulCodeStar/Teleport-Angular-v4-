"use strict";

const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

// const CompressionPlugin = require("compression-webpack-plugin");
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {

    context: __dirname + "/module",
    entry: "./index",
    output: {
        path: __dirname + "/bundle",
        filename: "module.umd.js",
        libraryTarget: "umd"
    },

    externals: /^[^.]/,

    resolve: {
        modules: [ 'node_modules' ],
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html']
    },
    module: {
        rules: [
            { test: /\.(jpg|jpeg|gif|png)$/,   loader : 'url-loader?limit=50000' },
            { test: /\.(eof|woff|woff2|svg)$/, loader : 'url-loader?limit=50000' },
            { test: /\.css$/,                  loader : 'raw-loader' },
            { test: /\.scss/,                  loaders: [ "raw-loader", "sass-loader" ] },
            { test: /\.html$/,                 loader : 'html-loader', query: { minimize: false } },
            { test: /\.ts$/,                   loaders: [ 'angular2-template-loader', 'awesome-typescript-loader' ] }
        ]
    },

    plugins: [
        new CheckerPlugin()
    //     new webpack.LoaderOptionsPlugin({
    //         minimize: true,
    //         debug: false
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         output: {
    //             comments: false
    //         },
    //         sourceMap: false
    //     }),
    //     // new CompressionPlugin({
    //     //     asset: "[path].gz[query]",
    //     //     algorithm: "gzip",
    //     //     test: /\.js$|\.html$/,
    //     //     threshold: 10240,
    //     //     minRatio: 0.8
    //     // })
    ],
    node: {
        __filename: true,
        setImmediate: false
    },
    devServer: {
        inline: true,
        port: 8080,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }

};
