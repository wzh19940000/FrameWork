const webpackConfig = require("./webpack.config");
const webpack = require("webpack");
const config = require("./config.js");

webpackConfig.devServer = config.devServer
webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
];
webpackConfig.mode = 'development'
module.exports = webpackConfig;
