import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Menu, Icon } from 'antd'
import Loadable from 'react-loadable'
import { Loading } from '@components'
import FileView from './FileView'

const { Header, Footer, Sider, Content } = Layout
const MenuItem = Menu.Item

const Access = Loadable({
    loader: () => import('@modules/access'),
    loading: Loading
})
const Organization = Loadable({
    loader: () => import('@modules/organization'),
    loading: Loading
})

const Root = styled(Layout)`
    min-height: 100vh;
    .layout {
        position: relative;
    }
    .ant-menu-item {
        padding: 0!important;
        margin: 0!important;
        > div {
            > a {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    /* 当前活跃链接样式 */
    .active {
        background-color: #ccc;
    }
`

const LinkItem = ({ path, type, label }) => (
    <Route path={path}>
        {({ match }) => (
            <div className={match ? 'active' : ''}>
                <Link to={path}>
                    <Icon type={type} />
                    <span>{ label }</span>
                </Link>
            </div>
        )}
    </Route>
)
const MenuWrapper = ({ children }) => (
    <Menu>
        {React.Children.map(children, (element, i) => (
            <MenuItem key={i}>
                {element}
            </MenuItem>
        ))}
    </Menu>
)

export default class ManagePage extends React.Component {
    state = {
        collapsed: false
    }
    onCollapse = collapsed => this.setState({ collapsed })
    render() {
        return (
            <Root>
                <Sider collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                    <MenuWrapper>
                        <LinkItem path='/access' type='file' label='access'></LinkItem>
                        <LinkItem path='/organization' type='task' label='organization'></LinkItem>
                    </MenuWrapper>
                </Sider>
                <Layout>
                    <Header>header</Header>
                    <Content className='layout'>
                        <Switch>
                            <Route path='/access' component={Access}></Route>
                            <Route path='/organization' component={Organization}></Route>
                        </Switch>
                    </Content>
                    <Footer>
                        <span>
                            <a href="http://dyoon.cn/" target='_blank'>浙江第元信息技术有限公司</a>
                        </span>
                    </Footer>
                </Layout>
                <FileView />
            </Root>
        )
    }
}