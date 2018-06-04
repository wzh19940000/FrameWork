import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import axios from 'axios'
import reducer from '@redux/reducers'
import App from './App'
import './icon.less'
import './index.css'

axios.defaults.baseURL = '/api'
// 请求设置拦截
axios.interceptors.request.use(config => {})

// 响应拦截
axios.interceptors.response.use(res => {}, err => {})

if (process.env.NODE_ENV === 'development') {
    window.axios = axios
}

const store = (process.env.NODE_ENV === 'production' || (!window.devToolsExtension())) ? (            
// const store = (true) ? (                //这里拦截器会判断浏览器是否安装了 Redux devTool 扩展程序，如果安装了，一定要确保版本可用
    createStore(reducer, applyMiddleware(thunkMiddleware))
) : (
    createStore(reducer, compose(applyMiddleware(thunkMiddleware), window.devToolsExtension()))
)

render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <App />
        </LocaleProvider>
    </Provider>,
    document.getElementById('app-root')
)