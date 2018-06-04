# dongliweb

东力项目前端项目，主要是 react + redux 技术。运行前请自行安装好 node 和 npm。npm 可换为国内淘宝镜像源以提升安装速度，命令如下：
```bat
npm config set registry https://registry.npm.taobao.org
```
进入目录，安装依赖模块：
```bat
npm i
```
安装完毕后：
```bat
npm start
```
浏览器即可自动打开并运行。

# 路径说明

### /public

静态资源文件，打包时会将此目录复制到打包目录。一般存放字体、图片等

* public/antd-icon/
将 antd 里的字体图标存放到本地部署

* public/font/
存放自定义图标和字体，使用方法见附录

* public/image/
存放静态图片

* public/favicon.icon
网页头的图标，上线前换成当前项目的 UI 图标

### /src
项目主要代码文件

* src/components/
存放项目内模块间公共组件，比如现在放了一个代表加载中的组件，里面可以新建文件夹分类保存，但是一定要在index.js里导出。里面组件应该尽量是 dumb 组件（状态）

* src/modules/
项目内主要模块。业务确定后分为几个顶级模块，在这里加相应文件夹分别工作

* src/modules/index/Login.jsx
单页，登录页

* src/modules/index/ManagePage.jsx
登录成功后页面，顶级路由处理。需要修改整个页面布局请修改这里

* src/redux/
项目redux相关管理。Redux顶级store里面是由各个子 reducer计算而来。每个子reducer都将开辟新文件夹存放。每个文件夹有三个文件：action、reducer和相应的 type 常量文件

* src/utils
存放项目中各个公共方法或小工具，尽量写成纯函数。与 /components 一样需要统一到index.js里导出。与前面 /components 不同的是这里并不是存放组件的地方

### devServerIP.config
存放开发时连接的后端服务器IP地址。因为每个人开发服务器都不一样，因此放在`.gitignore`里。第一次运行时若没有此文件则会生成此文件并提醒设置，默认值是localhost:9999

### theme.js
存放antd自定义主题。参考 [antd文档](http://ant-design.gitee.io/docs/react/customize-theme-cn)，用的是第一种方式：[覆盖变量](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) 
已经有的一个变量是antd字体图标引用路径，将它定向到本地路径

### webpack.config.js
为了方便将一些常用文件url定义了别名，在`module.exports.resolve.alias`下，都写成了以 `@` 开头的形式，以便一眼区分

# 简单开发实例

### 如何增加一个顶级模块
顶级模块一般都要在 `src/modules` 新开辟文件夹。比如我们想新建一个名为`organization`的模块：
1. 在 modules 目录下新建文件夹 organization，新建`index.jsx`作为模块顶层入口

2. 在`index.jsx`里写 React 组件并导出，这样一个简单模块完成

3. 在`/modules/index/ManagePage.jsx`里导入：使用了按需加载，导入时要写成代码中已有示例形式：
```js
const Organization = Loadable({
    loader: () => import('@modules/organization'),
    loading: Loading
})
```
其中import里面路径使用了别名，而由于 organization 里的顶级模块是`index.jsx`，当只引用到目录时会自动寻找到`index.jsx`作为入口。

4. 添加路由链接：在 ManagePage 返回的 jsx 里 MenuWrapper 加入LinkItem 组件，接收三个属性：path（到跳转的url地址），type（左侧导航栏的图标样式），label（导航链接文字）

5. 添加渲染页面：在下面的`<Switch></Switch>`里加引用Organization的位置，如已有代码加入一条Route声明。注意的是path里的url路径必须与刚刚路由链接匹配。

6. 都加好后左边会出现链接，点击后右侧能正常渲染

### 如何新增 redux 状态
一般新建顶级模块后都会加相应的redux管理模块，如何为刚刚新增的organization模块做此操作？

1. 在/src/redux目录下新增一个 文件夹，并命名为organization，表明为控制organization模块。里面新建三个文件：`reducer.js`, `action.js`, `type.js`

2. 在三个文件中分别写对应角色的代码。注意：在reducer中只用返回更新后的部分就行，在最外层有个combinState函数，可以将更新后的部分和原来的state合并作为新state返回。

3. reducer 导出：在`/src/redux/reducers.js`文件中导入 organization的 reducer，并在此文件导出的`combineReudc`r里加入organization的reducer

4. action 导出：在`/src/redux/connect.js`文件中导入 organization 的 action，并在下面的声明actions字段中加入organization即可。

### 如何把组件和 redux 连接
以刚刚的organization为例：加import声明语句和装饰器 connect 即可
```js
// @connect 是 src/redux/connect.js 的别名
import connect from '@connect'

// 注意这一句
@connect('organization')
export default class Organization extends React.Component {
    // ...
}
```
考虑易用性这里 connect 是封装后的。接收多个参数表示当前组件连接的部分。这里我只想连接 organization 部分。连接到某一部分后此组件可以访问到 redux 对应部分的所有 action 和 state。

### 如何写 CSS

此项目中 CSS 方案就是 styled-components，可以通过声明一个组件达到 CSS 注入目的：
```js
import styled from 'styled-components'

const Root = styled.div`
    color: red
`
const RedText = () => (
    <Root>文字是红色</Root>
)
```
支持嵌套写法，更多用法参阅 [styled-components文档](https://www.styled-components.com/docs)
有时候 antd 的默认样式并不符合项目需求，这时就要在组件中用 styled-components 覆盖默认样式。
CSS-in-JS 方案编辑器提示会不友好，如果使用 VSCode 推荐使用 vscode-styled-components 插件。
另外提供`src/index.css`修改全局 CSS，非必要时不要使用。

### 如何与后台交互

项目使用 axios 来处理 ajax，相应的 redux 层使用 redux-thunk 来异步更新数据。获取数据前要想好：是不是该放入 redux 的 store 里，如果是需要则放入对应的 action 并写对应的 reducer，如果不需要就放入组件内即可。比如想在 organization 里加载用户列表（用户列表应单独开一个 redux 的 store 字段，因为可能到处都会用）：
```js
// action.js
import axios from 'axios'
import type from './type'

export default {
    loadUsers: () => async dispatch => {
        const data = await axios.get('/organization/hierarchy')
        dispatch({
            type: type.loadUsers,
            data
        })
    }
}
```
想加载列表时调用下这个 action 即可。
如果某个请求并不需要组件内共享，可使用如下方式：
```js
import { message } from 'antd'

class Organization extends React.Component {
    // 默认 state 设置，可少写 constructor
    state = {
        data: []
    }
    // 普通函数的 async 写法
    async componentDidMount() {
        const data = await axios.get('/organization/users')
        this.setState({
            data
        })
    }
    // 箭头函数的 async 写法，写成箭头函数可避免在 render 里手动 bind
    onSubmit = async () => {
        await axios.post('/organization/post')
        message.success('提交成功')
    }
    render() {
        return (
            <div onClick={this.onSubmit}>
                {this.state.data.map(user => (
                    <div key={user.uid}>
                        {user.name}
                    </div>
                ))}
            </div>
        )
    }
}

```
以上例子演示了组件内加载请求和提交的用法，推荐 ES7(ES2018) 的 async/await 语法，已配置好可直接使用。


# 注意点
1. 根据最佳实践，在写 Component 类时除了生命周期方法外的方法全部都使用箭头函数，可避免手动 bind
2. 数据管理是重中之重。想好哪些数据会被整个项目共用而该放入 store 顶层，不要滥用 redux
3. 尽量遵循最佳实践：组件分为 [dumb 和 smart 组件](https://juejin.im/entry/579ec0efc4c971005ade40ad)。dumb组件最好写 prop-type 类型注释，尽量复用
4. 不要使用 React 生命周期的 `componentWillMount`，将里面的 `state` 设置写在默认 state 里，ajax 方法写在 `componentDidMount` 里；设置默认 state 时像上面那个例子就行