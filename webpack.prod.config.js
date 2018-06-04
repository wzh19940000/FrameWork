let webpackConfig = require("./webpack.config");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackMonitor = require("webpack-monitor");

webpackConfig.entry.vendor = [
    "react",
    "react-dom",
    "react-router-dom",
    "redux",
    "redux-thunk",
    "react-redux",
    "antd",
    "axios",
    "styled-components"
];
webpackConfig.optimization = {
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                priority: -20,
                chunks: "all"
            }
        }
    },
    runtimeChunk: {
        name: "manifest"
    },
    minimize: true
};
webpackConfig.plugins = [
    ...webpackConfig.plugins,

    new WebpackMonitor({
        capture: true,
        launch: true
    }),
    new CompressionWebpackPlugin({
        //gzip 压缩
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp(
            "\\.(js|css)$" //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
    }),
    //css单独打包
    new ExtractTextPlugin("[name].css")
];
webpack.mode = 'production'

module.exports = webpackConfig;
