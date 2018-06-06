/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-06 14:22:57 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-06 14:23:21
 */

import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import connect from '@connect'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { Loading } from '@components'

const Login = Loadable({
    loader: () => import('@modules/index/Login'),
    loading: Loading
})

const ManagePage = Loadable({
    loader: () => import('@modules/index/ManagePage'),
    loading: Loading  
})

@hot(module)            //装饰器，热加载
@connect('user')             //connect装饰器连接store
export default class App extends React.Component {
    render() {
        return (
            <Router>
                { this.props.login ? (
                    <ManagePage />
                ) : (
                    <Switch>
                        <Route path='/login' exact component={Login}/>
                        <Redirect to='/login'/>
                    </Switch>
                ) }
            </Router>
        )
    }
}
