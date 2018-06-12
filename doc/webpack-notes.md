

```
//package.json
{
    "name": "web",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "webpack-dev-server --config webpack.dev.config.js",
        "dev": "npm start",
        "build": "webpack --config webpack.prod.config.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "antd": "^3.5.2",                   //使用ant-design
        "axios": "^0.18.0",                 //跨域
        "moment": "^2.22.1",                //日期管理
        "prop-types": "^15.6.1",            //对组件中的props中的变量进行类型检测
        "react": "^16.3.2",
        "react-dom": "^16.3.2",
        "react-loadable": "^5.4.0",         //代码分片
        "react-redux": "^5.0.7",            
        "react-router-dom": "^4.2.2",       
        "redux": "^4.0.0",                  
        "redux-thunk": "^2.2.0",            //redux异步处理中间件
        "styled-components": "^3.2.6"       //css in js 类库，便于样式管理
    },
    "devDependencies": {
        "babel-core": "^6.26.3",            //所有的转译都将使用本地配置文件( .babelrc 或者 package.json )
        "babel-loader": "^7.1.4",           //转义ES6
        "babel-plugin-import": "^1.7.0",    //组件库按需加载
        "babel-plugin-syntax-dynamic-import": "^6.18.0",       //按需加载(懒加载)
        "babel-plugin-transform-decorators-legacy": "^1.3.4",       //这是Babel 6的一个插件，旨在复制Babel 5中的旧装饰行为，以便让人们可以更轻松地转换到Babel 6，而无需在装修者提案更新时阻止或者Babel重新实施它
        "babel-plugin-transform-runtime": "^6.23.0",        //外部引用助手和内置函数，自动填充代码而不会污染全局变量。
        "babel-preset-env": "^1.7.0",                       //通过自动根据您的目标浏览器或运行时环境确定所需的Babel插件和填充，从而将ES2015 +编译为ES5的Babel预设。             
        "babel-preset-react": "^6.24.1",            //为所有React插件预设Babel
        "babel-preset-stage-0": "^6.24.1",          //为0阶段插件预设Babel
        "compression-webpack-plugin": "^1.1.11",    //压缩插件
        "copy-webpack-plugin": "^4.5.1",            //复制webpack插件
        "cross-env": "^5.1.5",                      //运行在平台上设置和使用环境变量的脚本
        "css-loader": "^0.28.11",                   //css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
        "extract-text-webpack-plugin": "^4.0.0-beta.0",         //该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
        "file-loader": "^1.1.11",               //稳定的文件加载器               
        "happypack": "^5.0.0",                  //HappyPack通过并行地转换文件，使初始的webpack构建更快。
        "html-webpack-plugin": "^3.2.0",        //插件简化了HTML文件的创建，以服务于您的捆绑包。它会自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。
        "less": "^3.0.4",                       
        "less-loader": "^4.1.0",    
        "react-hot-loader": "^4.2.0",               //react热加载，实时调整反应组件
        "style-loader": "^0.21.0",                  //通过注入<style>标签将CSS添加到DOM
        "url-loader": "^1.0.1",                     //将文件加载为`base64`编码的URL
        "webpack": "^4.8.3",
        "webpack-cli": "^2.1.3",                    //Webpack CLI封装了与CLI处理相关的所有代码。它捕获选项并将它们发送给webpack编译器。您还可以找到初始化项目和在不同版本之间迁移的功能。
        "webpack-dev-server": "^3.1.4",             //将webpack与提供实时重新加载的开发服务器一起使用。 这应该只用于开发。它使用webpack-dev-middleware，提供对webpack资产的快速内存访问。
        "webpack-monitor": "^1.0.14"                //Webpack Monitor是一个可配置的Webpack插件，它可以捕获关于生产构建的相关统计信息，以及一个交互式分析工具，帮助开发人员更好地理解捆绑包的组合，并识别和优化优化策略。
    }
}

```

>注意可共用的文件有：
*   .gitignore  (用于git操作忽视某些改动)
*   .babelrc (用于解析jsx)
*   devServerIP.config
*   package.json (根据需求改动)
*   webpack.config.js
*   config.js (配置端口等)
*   webpack.dev.config.js (热加载配置)