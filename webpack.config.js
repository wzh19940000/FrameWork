const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HappyPack = require("happypack");
const theme = require('./theme')

const url = str => path.join(__dirname, str)

module.exports = {
    entry: {
        main: "./src/index.jsx"
    },
    output: {
        path: url("app"),
        publicPath: "/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "happypack/loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: "url-loader",
                query: {
                    limit: 8192,
                    name: "public/img/[name].[ext]"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|eot)$/,
                loader: "url-loader",
                query: {
                    limit: 8192,
                    name: "public/font/[name].[ext]"
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@utils": url("src/components/index,js"),
            "@components": url("src/components/index.js"),
            "@redux": url("src/redux"),
            "@connect": url("src/redux/connect.js"),
            "@modules": url("src/modules")
        },
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: url("/src/index.html"),
            filename: "index.html",
            favicon: url('/public/favicon.ico')
        }),
        new CopyWebpackPlugin([
            {
                from: url("public"),
                to: "public"
            }
        ]),
        new HappyPack({
            loaders: ["babel-loader"]
        })
    ],
    performance: {
        hints: false
    }
};
