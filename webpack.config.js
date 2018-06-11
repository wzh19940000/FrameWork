const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HappyPack = require("happypack");
const theme = require('./theme')

const url = str => path.join(__dirname, str)

module.exports = {
    entry: {             //入口文件是Webpack读取以构建bundle.js的文件
        main: "./src/index.jsx"
    },
    output: {
        path: url("app"),
        publicPath: "/",
        filename: "[name].js"
    },
    module: {      //设定装载机loader
        rules: [
            {
                test: /\.jsx?$/,
                // exclude排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: /node_modules/,            
                loader: "happypack/loader"              //babel loader，用于转义jsx和es6，这里指定了使用happpack的loader
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"             //css  loader，注意，你必须使用两个加载器来转换CSS文件。 首先是CSS加载器读取CSS文件，另一个是Style-loader将<style>标签插入HTML页面。
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
        new HtmlWebpackPlugin({         //该插件将为您生成一个HTML5文件，并使用script标签在body中引入你所使用的webpack包。
            template: url("/src/index.html"),
            filename: "index.html",
            favicon: url('/public/favicon.ico')
        }),
        new CopyWebpackPlugin([                     //将单个文件或整个目录复制到构建目录。
            {
                from: url("public"),
                to: "public"
            }
        ]),
        new HappyPack({                     //HappyPack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。让 Webpack 同一时刻处理多个任务，以提升构建速度
            loaders: ["babel-loader"]
        })
    ],
    performance: {
        hints: false
    }
};
